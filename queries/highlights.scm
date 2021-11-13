[
 "mod"
 "module"
 "fun"
 "struct"
 "end"
 "val"
 "type"
 "signature"
 "include"
 "rec"
 "and"
 "math"
 "inline"
 "block"
 "of"
 "with"
 "sig"
 "let"
 "in"
 "open"
 "match"
 "if"
 "then"
 "else"
 "not"
 "@stage:"
 "@require:"
 "@import:"
 ] @keyword

[
 "true"
 "false"
 ] @constant.boolean

[
  (comment)
] @comment

[
  (literal_int)
  (literal_float)
  (literal_length)
] @number

[
  (literal_string)
] @string

(module_name) @namespace
; (label_name) @field
(label_name) @variable.parameter
(variant_name) @constructor
(type_name) @type

;; module

(expr_application
  function: (_) @function
  )


(bind_val_single
  . (var_name) @function
  (bind_val_parameter)+
  )
