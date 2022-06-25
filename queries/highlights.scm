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
 "false"
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
 "true"
 "type"
 "val"
 "when"
 "while"
 "with"
 "|"
] @keyword

[
 "@stage:"
 "@require:"
 "@import:"
 ] @include

(module_name) @namespace

;; types

[
  (type_name)
  ] @type

(type_param) @parameter

(type_prod "*") @operator.special
(type_list "?") @operator.special

(type_record_unit
  (identifier) @field
  )

;; stmt
(let_stmt
  pattern: (identifier) @function
  [
  arg: (_) @parameter
  optarg: (_) @parameter
  ]
  )

(let_rec_inner
  pattern: (identifier) @function
  )

(let_inline_stmt
  [
  arg: (_) @parameter
  optarg: (_) @parameter
  ]
  )

(let_block_stmt
  [
  arg: (_) @parameter
  optarg: (_) @parameter
  ]
  )

;; expr

(lambda
  arg: (_) @parameter
  )

(application
  function: (identifier) @function
  )

(application
  function: (modvar (identifier) @function)
  )

(modvar "." @namespace)

(binary_operator) @operator

[
 "?:"
 "?->"
 "->"
 "<-"
 "="
 "!"
 "::"
 ]  @operator.special

(variant_name) @type

(record_unit
  . (identifier) @field
  )

; (inline_token) @embedded
(inline_text_list
  "|" @punctuation.delimiter
  )
(math_list
  "|" @punctuation.delimiter
  )

(math_token
  [
   "^"
   "_"
   ] @operator
  )


;; brackets/punctuations
[
"{"
"${"
"}"

"("
")"

"(|"
"|)"

"["
"]"
 ] @punctuation.bracket

(block_text
  ["<" "'<"] @punctuation.bracket
  ">"  @punctuation.bracket
  )

[
 ";"
 ":"
 ","
 (inline_text_bullet_star)
 "#"
 ]  @punctuation.delimiter

;; horizontal/vertical mode

(inline_cmd_name) @function.special
(block_cmd_name) @function.special
; inline_cmd_name と見分け付かないので一旦 parameter にしておく
(math_cmd_name) @parameter

(sig_val_stmt
 name: (inline_cmd_name) @parameter
 signature: (type_math_cmd)
 )

(sig_direct_stmt
 name: (inline_cmd_name) @parameter
 signature: (type_math_cmd)
 )

[
 (inline_text_embedding)
 (block_text_embedding)
 (math_embedding)
 ] @function.special

(block_cmd_name
  (module_name) @function.special
  )

(inline_literal_escaped) @string.escape

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
