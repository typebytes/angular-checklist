import MarkdownIt = require("markdown-it");
import { getLanguage, highlight } from "highlight.js";

export const convertHeadingsPlugin = (md, options) => {
  md.core.ruler.push("convert_headings", convertHeadings);
};

export const markdown = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: (str, lang) => {
    if (lang && getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${
          highlight(lang, str, true).value
        }</code></pre>`;
      } catch {}
    }

    return "";
  }
});

const convertHeadings = state => {
  state.tokens.forEach(function(token, i) {
    if (token.type === "heading_open" || token.type === "heading_close") {
      const rawToken = token.tag.split("");
      rawToken[1] = parseInt(rawToken[1], 10) + 2;
      token.tag = rawToken.join("");
    }
  });
};
