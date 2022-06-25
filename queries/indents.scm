[
 (block_text)
 (inline_text)
 (inline_text_list)
 (inline_text_bullet_list)
 (inline_text_bullet_item)
 (parened_expr)
 (cmd_expr_arg)

 (list)
 (record)
 (tuple)

 (application)
 (binary_expr)

 (sig_stmt)
 (struct_stmt)

 (let_stmt)
 (let_inline_stmt)
 (let_block_stmt)
 (let_math_stmt)

 (match_arm)

 ] @indent

; (let_stmt expr:(_) @indent)
; (let_inline_stmt expr:(_) @indent)
; (let_block_stmt expr:(_) @indent)
; (let_math_stmt expr:(_) @indent)

(block_text ">" @indent_end)
(inline_text "}" @indent_end)
(parened_expr ")" @indent_end)
(cmd_expr_arg ")" @indent_end)

(list "]" @indent_end)
(record "|)" @indent_end)
(tuple ")" @indent_end)

[
  ")"
  "]"
  "}"
  "|)"
  "end"
] @branch
(block_text ">" @branch)


; (
;  (binary_expr
;    (binary_operator) @binop
;    ) @aligned_indent
;  (#set! "delimiter" "|")
;  (#matches! @binop "|>")
;  )
