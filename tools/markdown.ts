import MarkdownIt = require('markdown-it');
import { getLanguage, highlight } from 'highlight.js';

export const markdown = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: (str, lang) => {
    if (lang && getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${highlight(lang, str, true).value}</code></pre>`;
      } catch {}
    }

    return '';
  }
});
