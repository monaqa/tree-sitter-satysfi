// vim:sw=2

const PREC = {
  range: 15,
  call: 14,
  field: 13,
  unary: 11,
  multiplicative: 10,
  additive: 9,
  shift: 8,
  bitand: 7,
  bitxor: 6,
  bitor: 5,
  comparative: 4,
  and: 3,
  or: 2,
  assign: 0,
  closure: -1,
};

module.exports = grammar({
  name: "satysfi",

  extras: ($) => [/\s/, $.comment],

  word: ($) => $.identifier,

  supertype: ($) => [
    $._literal,
    $._expr,
  ],

  externals: ($) => [
    $.literal_string,
    // {} の中に入っているインラインテキスト。
    $.inline_token,
    // {||} や {* } の中に入っているインラインテキスト。
    $._inline_token_compound,
    // 空白やコメントが入らないことを保証するが、 Lexer は進めない。
    $._numbersign_after_nospace,
    // 決してマッチしないダミーパターン。
    $._dummy,
  ],

  rules: {
    // program {{{
    source_file: ($) => $.program_saty,

    comment: (_) => token(seq("%", /.*/)),

    program_saty: ($) =>
      seq(
        optional(field("headers", $.headers)),
        // field('preamble', $.preamble),
        field("expr", $._expr),
      ),

    program_satyh: ($) => $._dummy,

    // }}}

    // header {{{
    headers: ($) => repeat1($.header),

    header: ($) => $.header_require,

    header_stage: ($) => $._dummy,

    stage: ($) => $._dummy,

    header_require: ($) =>
      seq("@require:", repeat(/\s/), field("pkgname", $.pkgname), "\n"),

    header_import: ($) => $._dummy,

    pkgname: (_) => /[^\n\r]+/,

    // }}}

    // statement {{{

    preamble: ($) => $._dummy,

    statement: ($) => $._dummy,

    let_stmt: ($) => $._dummy,

    let_stmt_argument: ($) => $._dummy,

    let_rec_stmt: ($) => $._dummy,

    let_rec_inner: ($) => $._dummy,

    let_rec_stmt_argument: ($) => $._dummy,

    let_rec_matchargm: ($) => $._dummy,

    let_inline_stmt: ($) => $._dummy,

    let_block_stmt: ($) => $._dummy,

    let_math_stmt: ($) => $._dummy,

    let_mutable_stmt: ($) => $._dummy,

    type_stmt: ($) => $._dummy,

    type_variant: ($) => $._dummy,

    open_stmt: ($) => $._dummy,

    arg: ($) => $._dummy,

    // }}}

    // module {{{
    module_stmt: ($) => $._dummy,

    sig_stmt: ($) => $._dummy,

    struct_stmt: ($) => $._dummy,

    sig_type_stmt: ($) => $._dummy,

    sig_val_stmt: ($) => $._dummy,

    sig_direct_stmt: ($) => $._dummy,

    // }}}

    // types {{{
    type_expr: ($) => $._dummy,

    type_optional: ($) => $._dummy,

    type_prod: ($) => $._dummy,

    type_nary: ($) => $._dummy,

    type_inline_cmd: ($) => $._dummy,

    type_block_cmd: ($) => $._dummy,

    type_math_cmd: ($) => $._dummy,

    type_list: ($) => $._dummy,

    type_list_unit_optional: ($) => $._dummy,

    type_name: ($) => $._dummy,

    type_record: ($) => $._dummy,

    type_record_unit: ($) => $._dummy,

    type_param: ($) => $._dummy,

    constraint: ($) => $._dummy,

    // }}}

    // pattern {{{
    pat_as: ($) => $._dummy,

    pat_cons: ($) => $._dummy,

    pattern: ($) => $._dummy,

    pat_variant: ($) => $._dummy,

    pat_list: ($) => $._dummy,

    pat_tuple: ($) => $._dummy,

    // }}}

    // expr {{{
    _expr: ($) =>
      choice(
        $.bind_stmt,
        $.binary_expression,
        $.application,
        $._unary,
      ),
    match_expr: ($) => $._dummy,

    match_arm: ($) => $._dummy,

    match_guard: ($) => $._dummy,

    bind_stmt: ($) =>
      seq(
        "let",
        field("pattern", $.identifier),
        "=",
        field("definition", $._expr),
        "in",
        field("expr", $._expr),
      ),
    ctrl_while: ($) => $._dummy,

    ctrl_if: ($) => $._dummy,

    lambda: ($) => $._dummy,

    assignment: ($) => $._dummy,

    dyadic_expr: ($) => $._dummy,

    binary_expression: ($) => {
      const table = [
        [PREC.and, "&&"],
        [PREC.or, "||"],
        [PREC.bitand, "&"],
        [PREC.bitor, "|"],
        [PREC.bitxor, "^"],
        [PREC.comparative, choice("==", "!=", "<", "<=", ">", ">=")],
        [PREC.shift, choice("<<", ">>")],
        [PREC.additive, choice("+", "-")],
        [PREC.multiplicative, choice("*", "/", "%")],
      ];

      return choice(
        ...table.map(([precedence, operator]) =>
          prec.left(
            precedence,
            seq(
              field("left", $._expr),
              field("operator", alias(operator, $.binary_operator)),
              field("right", $._expr),
            ),
          )
        ),
      );
    },
    binary_operator: (_) => "-",

    unary_operator_expr: ($) => $._dummy,

    unary_operator: ($) => $._dummy,

    application: ($) =>
      seq(
        field("function", $._unary),
        repeat1(choice(
          field("arg", $.application_args),
          field("opt", $.application_args_opt),
        )),
      ),
    application_args: ($) => $._unary,
    application_args_opt: ($) => seq("?:", $.application_args),
    command_application: ($) => $._dummy,

    variant_constructor: ($) => $._dummy,

    // }}}

    // unary {{{
    _unary: ($) =>
      choice(
        $._literal,
        $.inline_text,
        $.inline_text_list,
        $.inline_text_bullet_list,
        $.block_text,
        $.identifier,
      ),
    unary_prefix: ($) => $._dummy,

    horizontal_text: ($) => $._dummy,

    record: ($) => $._dummy,

    record_unit: ($) => $._dummy,

    list: ($) => $._dummy,

    tuple: ($) => $._dummy,

    expr_with_mod: ($) => $._dummy,

    var: (_) => /[a-z][-A-Za-z0-9]*/,

    modvar: ($) => $._dummy,

    mod_cmd_name: ($) => $._dummy,

    module_name: ($) => $._dummy,

    variant_name: ($) => $._dummy,

    // }}}

    // literal {{{
    _literal: ($) =>
      choice(
        $.literal_unit,
        $.literal_bool,
        $.literal_length,
        $.literal_int,
        $.literal_string,
        $.literal_float,
        $.inline_text_embedding,
      ),

    identifier: (_) => /[a-z][-a-zA-Z0-9]*/,

    literal_unit: (_) => seq("(", ")"),

    literal_bool: (_) => choice("true", "false"),

    literal_length: (_) => {
      const digits = /[0-9]+/;
      return token(choice(
        seq(optional("-"), digits, /[a-z]+/),
        seq(optional("-"), digits, ".", optional(digits), /[a-z]+/),
        seq(optional("-"), optional(digits), ".", digits, /[a-z]+/),
      ));
    },

    literal_int: (_) =>
      token(choice(
        seq(
          choice("0x", "0X"),
          repeat1(/[A-F0-9]/),
        ),
        repeat1(/[0-9]/),
      )),

    literal_float: (_) => {
      const digits = repeat1(/[0-9]/);

      return token(
        choice(
          seq(digits, ".", optional(digits)),
          seq(optional(digits), ".", digits),
        ),
      );
    },
    // }}}

    // command {{{
    cmd_name_ptn: ($) => $._dummy,

    inline_cmd: ($) =>
      seq(
        field("name", $.inline_cmd_name),
        repeat(
          choice(field("arg", $.cmd_expr_arg), field("opt", $.cmd_expr_option)),
        ),
        choice(repeat1(field("arg", $.cmd_text_arg)), ";"),
      ),

    inline_cmd_name: ($) =>
      seq(
        "\\",
        /[-a-zA-Z0-9]+/,
      ),

    block_cmd: ($) =>
      seq(
        field("name", $.block_cmd_name),
        repeat(
          choice(field("arg", $.cmd_expr_arg), field("opt", $.cmd_expr_option)),
        ),
        choice(repeat1(field("arg", $.cmd_text_arg)), ";"),
      ),

    block_cmd_name: (_) => /\+[-a-zA-Z0-9]+/,

    cmd_expr_arg: ($) => $._cmd_expr_arg_inner,
    cmd_expr_option: ($) => seq("?:", $._cmd_expr_arg_inner),
    cmd_text_arg: ($) =>
      choice(
        seq("{", optional($.horizontal), "}"),
        seq("<", optional($.vertical), ">"),
      ),
    _cmd_expr_arg_inner: ($) => seq("(", $._expr, ")"),

    math_cmd: ($) =>
      seq(
        field("name", $.math_cmd_name),
        repeat(
          choice(
            field("arg", $.math_cmd_expr_arg),
            field("opt", $.math_cmd_expr_option),
          ),
        ),
      ),

    math_cmd_name: (_) =>
      seq(
        "\\",
        /[-a-zA-Z0-9]+/,
      ),

    math_cmd_expr_arg: ($) => seq("!", $._math_cmd_expr_arg_inner),

    math_cmd_expr_option: ($) => seq("?:", "!", $._math_cmd_expr_arg_inner),

    _math_cmd_expr_arg_inner: ($) =>
      choice(
        seq("{", $.math, "}"),
        seq("!", $.inline_text),
        seq("!", "<", $.vertical, ">"),
        seq("!", "(", $._expr, ")"),
        seq("!", $.list),
        seq("!", $.record),
      ),

    // }}}

    // horizontal mode {{{
    inline_text: ($) => seq("{", optional($.horizontal), "}"),

    inline_text_list: ($) =>
      choice(
        seq(
          "{",
          "|",
          optional(alias($._horizontal_compound, $.horizontal)),
          repeat(
            seq("|", optional(alias($._horizontal_compound, $.horizontal))),
          ),
          /\|\s*\}/,
        ),
      ),

    inline_text_bullet_list: ($) =>
      seq(
        "{",
        repeat1($.inline_text_bullet_item),
        "}",
      ),

    horizontal: ($) =>
      repeat1(choice(
        $.inline_literal_escaped,
        $.inline_text_embedding,
        $.inline_cmd,
        $.inline_token,
      )),

    _horizontal_compound: ($) =>
      repeat1(choice(
        $.inline_literal_escaped,
        $.inline_cmd,
        alias($._inline_token_compound, $.inline_token),
      )),

    inline_text_bullet_item: ($) =>
      seq(
        $.inline_text_bullet_star,
        optional(alias($._horizontal_compound, $.horizontal)),
      ),
    inline_text_bullet_star: (_) => /\*+/,

    inline_literal_escaped: (_) =>
      choice(
        "\\@",
        "\\`",
        "\\\\",
        "\\{",
        "\\}",
        "\\%",
        "\\|",
        "\\*",
        "\\$",
        "\\#",
        "\\;",
        "\\ ",
      ),

    inline_text_embedding: ($) => seq($._numbersign_after_nospace, $.var, ";"),

    // }}}

    // vertical mode {{{
    block_text: ($) => seq("'<", optional($.vertical), ">"),

    vertical: ($) =>
      repeat1(choice(
        $.block_cmd,
        $.block_text_embedding,
      )),

    block_text_embedding: ($) => seq($._numbersign_after_nospace, $.var, ";"),

    // }}}

    // math mode {{{
    math_text: ($) => seq("${", optional($.math), "}"),

    math_list: ($) =>
      choice(
        seq("${", "|", "|", "}"),
        seq("${", "|", repeat(seq($.math, "|")), "}"),
      ),

    math: ($) => repeat1($.math_token),

    math_token: ($) =>
      choice(
        seq($.math_unary, $.math_sup, $.math_sub),
        seq($.math_unary, $.math_sub, $.math_sup),
        seq($.math_unary, $.math_sup),
        seq($.math_unary, $.math_sub),
        seq($.math_unary),
      ),

    math_sup: ($) => seq("^", $._math_group),

    math_sub: ($) => seq("_", $._math_group),
    _math_group: ($) =>
      choice(
        $.math_unary,
        seq("{", $.math_unary, "}"),
      ),

    math_unary: ($) =>
      choice(
        /[A-Za-z0-9]/,
        /\\[!"#$%&'()*+,./0-9:;<=>?@^_`{|}~-]/,
        "\\\\",
        /[+*/:=<>~'.,?`-]/,
        $.math_cmd,
        $.math_embedding,
      ),

    math_embedding: ($) => seq($._numbersign_after_nospace, $.var, ";"),
    // }}}
  },
});
