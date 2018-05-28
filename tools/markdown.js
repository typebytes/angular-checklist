"use strict";
exports.__esModule = true;
var MarkdownIt = require("markdown-it");
var highlight_js_1 = require("highlight.js");
exports.markdown = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
        if (lang && highlight_js_1.getLanguage(lang)) {
            try {
                return "<pre class=\"hljs\"><code>" + highlight_js_1.highlight(lang, str, true).value + "</code></pre>";
            }
            catch (_a) { }
        }
        return '';
    }
});
