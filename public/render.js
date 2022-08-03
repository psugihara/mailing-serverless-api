import React from "react";
import { render } from "mailing-core";
import { resolve } from "path";
function renderTemplate(templateName, props) {
  var Template;
  try {
    var modulePath = resolve(process.cwd(), "emails", templateName);
    Template = require(modulePath).default;
  } catch (e) {
    console.error("error importing template ".concat(templateName), e);
    return {
      error: "error importing template ".concat(templateName),
    };
  }
  return render(React.createElement(Template, props));
}
export default function handler(req, res) {
  var _query = req.query,
    templateName = _query.templateName,
    props = _query.props;
  // validate template name
  if (typeof templateName !== "string") {
    return res.status(403).json({
      error: "templateName must be specified",
    });
  }
  // parse props
  var parsedProps = {};
  try {
    parsedProps = JSON.stringify(props);
  } catch (e) {
    return res.status(403).json({
      error: "props could not be parsed from querystring",
    });
  }
  var ref = renderTemplate(templateName, parsedProps),
    error = ref.error,
    mjmlErrors = ref.mjmlErrors,
    html = ref.html;
  if (error) {
    return res.status(404).json({
      error: error,
    });
  }
  res.status(200).json({
    html: html,
    mjmlErrors: mjmlErrors,
  });
}
