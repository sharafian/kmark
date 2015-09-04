#!/usr/bin/env node

function compile_expressions(text) {

  var reg = new RegExp(/\$\$(.*)\$\$/m);
  var in_reg = new RegExp(/\\\((.*)\\\)/m);
  var res, disp = true;

  while (true) {

    if ((res = reg.exec(text)) !== null) {
      disp = true; 
    } else if ((res = in_reg.exec(text)) !== null) {
      disp = false;
    } else {
      break;
    }
    
    var render = katex.renderToString(res[1])
    render = disp? ("<p>" + render + "</p>"):(render);

    text = text.replace(res[0], render);
  }

  return text;
}

var fs = require("fs");
var marked = require("marked");
var katex = require("katex");

if (process.argv[2] == undefined) {
  console.error("usage: kmark.js <input file>");
  process.exit(1);
}

var text = fs.readFileSync(process.argv[2], "utf-8");
var html = marked(text);
var katex_html = compile_expressions(html);

console.log(katex_html);
