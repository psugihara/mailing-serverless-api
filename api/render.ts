import React from "react";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { render } from "mailing-core";
import { resolve } from "path";
import { MjmlError } from "mjml-react";

type Data = {
  error?: string; // api error messages
  html?: string;
  mjmlErrors?: MjmlError[];
};

function renderTemplate(
  templateName: string,
  props: { [key: string]: any }
): { error?: string; mjmlErrors?: MjmlError[]; html?: string } {
  let Template;
  try {
    const modulePath = resolve(
      process.cwd(),
      "compiled_emails",
      templateName.replace(".tsx", ".js")
    );
    Template = require(modulePath).default;
  } catch (e) {
    console.error(`error importing template ${templateName}`, e);
    return { error: `error importing template ${templateName}` };
  }

  return render(React.createElement(Template, props));
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { templateName, props } = req.query;

  // validate template name
  if (typeof templateName !== "string") {
    return res
      .status(403)
      .json({ error: "templateName must be specified" } as Data);
  }

  // parse props
  let parsedProps = {};
  try {
    parsedProps = JSON.parse(decodeURIComponent(props as string));
  } catch {
    return res
      .status(403)
      .json({ error: "props could not be parsed from querystring" } as Data);
  }

  const { error, mjmlErrors, html } = renderTemplate(templateName, parsedProps);

  if (error) {
    return res.status(404).json({ error } as Data);
  }
  res.status(200).json({ html, mjmlErrors } as Data);
}
