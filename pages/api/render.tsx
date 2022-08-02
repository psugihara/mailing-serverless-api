// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
// import TextEmail from "../../emails/TextEmail";
// import Welcome from "../../emails/Welcome";
import { render } from "mailing-core";
import { resolve } from "path";

type Data = {
  error: string;
  html?: string;
  mjmlErrors?: string;
};

// const TEMPLATES = { TextEmail, Welcome };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { templateName, props } = req.query;
  if (typeof templateName !== "string") {
    res.status(403).json({ error: "templateName must be specified" });
    return;
  }
  let parsedProps = {};
  try {
    parsedProps = JSON.stringify(props);
  } catch {
    res
      .status(403)
      .json({ error: "props could not be parsed from querystring" });
    return;
  }

  const modulePath = resolve(process.cwd(), "emails", templateName);
  const Template = require(modulePath);

  if (!Template) {
    res.status(404).json({ error: "Template not found" });
    return;
  }
  const html = render(<Template {...parsedProps} />);
  res.status(200).json({ error: "John Doe" });
}
