#!/usr/bin/env node

var fs = require("fs");
var marked = require("marked");
var katex = require("katex");

function compile_expressions(text) {
  var res, reg = new RegExp(/\$\$(.+?)\$\$/m);
  while ((res = reg.exec(text)) !== null) {
    text = text.replace(res[0], katex.renderToString(res[1]));
  }
  return text;
}

var i, add_header = false;
if ((i = process.argv.indexOf("-h")) >= 0) {
  add_header = true; 
  process.argv.splice(i, 1);
}

if (process.argv[2] == undefined) {
  console.error("usage: kmark.js <input file>");
  process.exit(1);
}

var text = fs.readFileSync(process.argv[2], "utf-8");
var katex_html = marked(compile_expressions(text));

if (add_header) {
  katex_html =
    "<!DOCTYPE html><html><head><meta charset=utf-8><style>" +
    "#main { width: 30em; margin: auto; }</style><link rel=" +
    "\"stylesheet\" href=\"katex/katex.min.css\"></head>" +
    "<body><div id=\"main\">" + katex_html + "</body></html>";
}

console.log(katex_html);
