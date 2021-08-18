[
  "let"
  "in"
] @keyword

(header_require
  "@require:" @keyword
  (pkgname)
  )

[
  (literal_int)
  (literal_float)
  (literal_length)
] @number

[
  (literal_string)
] @string

[
  (comment)
] @comment

(inline_literal_escaped) @escape

"{" @punctuation.bracket
"}" @punctuation.bracket

"(" @punctuation.bracket
")" @punctuation.bracket

(bind_stmt
  pattern: (identifier) @function
  )

(application
  function: (identifier) @function
  )

(inline_cmd_name) @function.macro
