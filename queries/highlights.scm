[
 "and"
 "as"
 "block-cmd"
 "command"
 "constraint"
 "direct"
 "do"
 "else"
 "end"
 "fun"
 "if"
 "in"
 "inline-cmd"
 "let"
 "let-block"
 "let-inline"
 "let-math"
 "let-mutable"
 "let-rec"
 "match"
 "math-cmd"
 "module"
 "not"
 "of"
 "open"
 "sig"
 "struct"
 "then"
 "type"
 "val"
 "when"
 "while"
 "with"
 "@stage:"
 "@require:"
 "@import:"
] @keyword

[
 "true"
 "false"
] @constant.builtin

;; types

[
  (type_param)
  (type_name)
  ] @type

(type_record_unit
  (identifier) @property
  )

;; stmt
(let_stmt
  pattern: (_) @function
  arg: (_) @variable.parameter
  optarg: (_) @variable.parameter
  )

;; expr

(match_expr
  "|" @keyword
  )

(lambda
  arg: (_) @variable.parameter
  )

(application
  function: (identifier) @function
  )

(binary_operator) @operator

(inline_cmd_name) @function.special
(block_cmd_name) @function.special
(math_cmd_name) @math

(inline_token) @embedded

;; brackets

"{" @punctuation.bracket
"${" @punctuation.bracket
"}" @punctuation.bracket

"|" @punctuation.bracket

"(" @punctuation.bracket
")" @punctuation.bracket

"(|" @punctuation.bracket
"|)" @punctuation.bracket

"[" @punctuation.bracket
"]" @punctuation.bracket

(block_text
  "'<" @punctuation.bracket
  ">"  @punctuation.bracket
  )

(cmd_text_arg
  "<" @punctuation.bracket
  ">" @punctuation.bracket
  )

;; literal

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
