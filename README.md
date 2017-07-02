# KMark

## Description

This is a simple node script that wraps marked and KaTeX
so that you can easily compile html with LaTeX math into static
html pages.

## Usage

Math equations are delimited by `$$`.

`kmark input.md > out.html`

Note: The output of this command won't work unless you include
the CSS file for KaTeX. Also don't forget to put `<meta charset=utf-8>`
in the head.

The `-h` flag will generate a complete file with a header and basic style,
that assumes the katex directory is in the same directory of the file.
