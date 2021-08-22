// vim:sw=2

const PREC = {
  recordmember: 13,
  stage: 12,
  application: 11,
  constructor: 10,
  unary: 10,
  divisive: 9,
  multiplicative: 9,
  additive: 8,
  subtractive: 8,
  comparative: 7,
  concat: 6,
  and: 5,
  or: 4,
  assign: 3,
  lambda: 3,

  match: 1,

  typeapplication: 2,
  typefunc: 0,
  typeprod: 1,
};

const CMD_NAME = /[A-Za-z][-A-Za-z0-9]*/;

module.exports = grammar({
  name: "satysfi",

  extras: ($) => [/\s/, $.comment],

  word: ($) => $.identifier,

  supertype: ($) => [
    $._literal,
    $._expr,
  ],

  conflicts: ($) => [
    [$.binary_operator, $.unary_operator],
  ],

  externals: ($) => [
    $.literal_string,
    // {} の中に入っているインラインテキスト。
    $.inline_token,
    // {||} や {* } の中に入っているインラインテキスト。
    $._inline_token_compound,
    // 空白やコメントが入らないことを保証するが、 Lexer は進めない。
    $._numbersign_after_nospace,
    $.no_extras,
    // 決してマッチしないダミーパターン。
    $._dummy,
  ],

  rules: {
    // program {{{
    source_file: ($) => $.program_saty,

    comment: (_) => token(seq("%", /.*/)),

    program_saty: ($) =>
      seq(
        optional(field("stage", $.header_stage)),
        optional(field("headers", $.headers)),
        optional(seq(field("preamble", $.preamble), "in")),
        field("expr", $._expr),
      ),

    program_satyh: ($) =>
      seq(
        optional(field("stage", $.header_stage)),
        optional(field("headers", $.headers)),
        field("preamble", $.preamble),
      ),

    // }}}

    // header {{{
    headers: ($) => seq(repeat1($._header)),

    _header: ($) =>
      choice(
        seq(
          "@require:",
          repeat(/\s/),
          $.no_extras,
          field("require", $.pkgname),
          "\n",
        ),
        seq(
          "@import:",
          repeat(/\s/),
          $.no_extras,
          field("import", $.pkgname),
          "\n",
        ),
      ),

    header_stage: (_) =>
      seq(
        "@stage:",
        choice(
          field("0", "0"),
          field("1", "1"),
          field("persistent", "persistent"),
        ),
        "\n",
      ),

    pkgname: (_) => /[^\n\r]+/,

    // }}}

    // statement {{{

    preamble: ($) => repeat1($._statement),

    _statement: ($) =>
      prec.left(
        0,
        choice(
          $.let_stmt,
          $.let_rec_stmt,
          $.let_inline_stmt,
          $.let_block_stmt,
          $.let_math_stmt,
          $.let_mutable_stmt,
          $.type_stmt,
          $.module_stmt,
          $.open_stmt,
        ),
      ),

    let_stmt: ($) =>
      seq(
        "let",
        field("pattern", $._pattern),
        optional($._let_stmt_argument),
        "=",
        field("expr", $._expr),
      ),

    _let_stmt_argument: ($) =>
      choice(
        seq(":", field("signiture", $._type_expr), "|", repeat1($._arg)),
        seq(":", field("signiture", $._type_expr)),
        seq(optional("|"), repeat1($._arg)),
      ),

    let_rec_stmt: ($) =>
      seq(
        "let-rec",
        sep1("and", $.let_rec_inner),
      ),

    let_rec_inner: ($) =>
      choice(
        seq(
          field("pattern", $._pattern),
          optional($._let_rec_stmt_argument),
          "=",
          field("expr", $._expr),
        ),
        seq(
          field("pattern", $._pattern),
          repeat(seq("|", field("arm", $.let_rec_matcharm))),
        ),
      ),

    _let_rec_stmt_argument: ($) =>
      choice(
        seq(":", field("signiture", $._type_expr), "|", repeat1($._arg)),
        seq(":", field("signiture", $._type_expr)),
        repeat1($._arg),
      ),

    let_rec_matcharm: ($) => seq(repeat($._arg), "=", field("expr", $._expr)),

    let_inline_stmt: ($) =>
      choice(
        seq(
          "let-inline",
          field("ctx", $.identifier),
          field("name", $.inline_cmd_name),
          repeat($._arg),
          "=",
          field("expr", $._expr),
        ),
        seq(
          "let-inline",
          field("name", $.inline_cmd_name),
          repeat(field("arg", $._pattern)),
          "=",
          field("expr", $._expr),
        ),
      ),

    let_block_stmt: ($) =>
      choice(
        seq(
          "let-block",
          field("ctx", $.identifier),
          field("name", $.block_cmd_name),
          repeat($._arg),
          "=",
          field("expr", $._expr),
        ),
        seq(
          "let-block",
          field("name", $.block_cmd_name),
          repeat(field("arg", $._pattern)),
          "=",
          field("expr", $._expr),
        ),
      ),

    let_math_stmt: ($) =>
      seq(
        "let-math",
        field("name", $.math_cmd_name),
        repeat($._arg),
        "=",
        field("expr", $._expr),
      ),

    let_mutable_stmt: ($) =>
      seq(
        "let-mutable",
        field("name", $.identifier),
        "<-",
        field("expr", $._expr),
      ),

    type_stmt: ($) =>
      seq(
        "type",
        sep1("and", $.type_inner),
      ),

    type_inner: ($) =>
      choice(
        seq(
          repeat(field("param", $.type_param)),
          field("name", $.type_name),
          "=",
          repeat1(seq("|", field("variant", $.type_variant))),
          repeat(field("constraint", $.constraint)),
        ),
        seq(
          repeat(field("param", $.type_param)),
          field("name", $.type_name),
          "=",
          sep1("|", field("variant", $.type_variant)),
          repeat(field("constraint", $.constraint)),
        ),
        seq(
          repeat(field("param", $.type_param)),
          field("name", $.type_name),
          "=",
          field("expr", $._type_expr),
          repeat(field("constraint", $.constraint)),
        ),
      ),

    type_variant: ($) =>
      seq(
        field("name", $.variant_name),
        optional(seq("of", field("expr", $._type_expr))),
      ),

    open_stmt: ($) => seq("open", $.module_name),

    _arg: ($) =>
      choice(
        field("arg", $._pattern),
        seq("?:", field("optarg", $._pattern)),
      ),

    // }}}

    // module {{{
    module_stmt: ($) =>
      seq(
        "module",
        field("name", $.module_name),
        ":",
        field("sig", $.sig_stmt),
        "=",
        field("struct", $.struct_stmt),
      ),

    sig_stmt: ($) =>
      seq(
        "sig",
        repeat($._sig_inner),
        "end",
      ),

    struct_stmt: ($) =>
      seq(
        "struct",
        repeat($._statement),
        "end",
      ),

    _sig_inner: ($) =>
      choice(
        $.sig_type_stmt,
        $.sig_val_stmt,
        $.sig_direct_stmt,
      ),

    sig_type_stmt: ($) =>
      seq(
        "type",
        repeat(field("param", $.type_param)),
        field("name", $.identifier),
        repeat(field("constraint", $.constraint)),
      ),

    sig_val_stmt: ($) =>
      seq(
        "val",
        choice(
          field("name", $.identifier),
          seq("(", field("name", $.binary_operator), ")"),
          field("name", $.inline_cmd_name),
          field("name", $.block_cmd_name),
        ),
        ":",
        field("signature", $._type_expr),
        repeat(field("constraint", $.constraint)),
      ),

    sig_direct_stmt: ($) =>
      seq(
        "direct",
        choice(
          field("name", $.inline_cmd_name),
          field("name", $.block_cmd_name),
        ),
        ":",
        field("signature", $._type_expr),
        repeat(field("constraint", $.constraint)),
      ),

    // }}}

    // types {{{
    _type_expr: ($) =>
      choice(
        $.type_fun,
        $.type_inline_cmd,
        $.type_block_cmd,
        $.type_math_cmd,
        $.type_application,
        $.type_record,
        $.type_param,
        $.type_name,
        seq("(", $._type_expr, ")"),
      ),

    type_fun: ($) =>
      prec.right(
        PREC.typefunc,
        seq(
          choice(
            seq(field("optarg", $._type_expr), "?->"),
            seq(field("arg", $._type_expr), "->"),
          ),
          field("return", $._type_expr),
        ),
      ),

    type_prod: ($) =>
      prec.left(
        PREC.typeprod,
        seq(
          $._type_expr,
          "*",
          $._type_expr,
        ),
      ),

    type_inline_cmd: ($) => seq($.type_list, "inline-cmd"),

    type_block_cmd: ($) => seq($.type_list, "block-cmd"),

    type_math_cmd: ($) => seq($.type_list, "math-cmd"),

    type_list: ($) =>
      seq(
        "[",
        sep(
          ";",
          choice(
            seq(field("optarg", $._type_expr), "?"),
            seq(field("arg", $._type_expr)),
          ),
        ),
        optional(";"),
        "]",
      ),

    type_record: ($) =>
      seq("(|", sep(";", $.type_record_unit), optional(";"), "|)"),

    type_record_unit: ($) => seq($.identifier, ":", $._type_expr),

    type_application: ($) =>
      prec.left(PREC.typeapplication, seq($._type_expr, $._type_expr)),

    type_param: (_) => token.immediate(seq("'", /[a-z][-A-Za-z0-9]*/)),

    // type_name: ($) => choice($.identifier, $.modvar),
    type_name: ($) => $.identifier,

    constraint: ($) => seq("constraint", $.type_param, "::", $.type_record),

    // }}}

    // pattern {{{
    pat_as: ($) =>
      prec.left(0, seq($._pat_cons, optional(seq("as", $.identifier)))),

    _pat_cons: ($) =>
      choice(
        seq($._pattern, "::", $.pat_as),
        $.pat_variant,
        $._pattern,
      ),

    _pattern: ($) =>
      choice(
        $.pat_list,
        seq("(", $.binary_operator, ")"),
        seq("(", $.unary_operator, ")"),
        seq("(", $.pat_as, ")"),
        $.pat_tuple,
        "_",
        $.identifier,
        $._literal,
      ),

    pat_variant: ($) => seq($.variant_name, optional($._pattern)),

    pat_list: ($) => seq("[", sep(";", $.pat_as), optional(";"), "]"),

    pat_tuple: ($) => seq("(", sep2(",", $.pat_as), ")"),

    // }}}

    // expr {{{
    _expr: ($) =>
      choice(
        $.match_expr,
        $.bind_stmt,
        $.ctrl_while,
        $.ctrl_if,
        $.lambda,
        $.assignment,
        $.binary_expr,
        $.unary_operator_expr,
        $.application,
        $.command_application,
        $.variant_constructor,
        $._unary,
      ),

    match_expr: ($) =>
      prec.left(
        PREC.match,
        seq(
          "match",
          field("expr", $._expr),
          "with",
          optional("|"),
          sep1("|", $.match_arm),
        ),
      ),

    match_arm: ($) =>
      seq(
        $.pat_as,
        optional($.match_guard),
        "->",
        $._expr,
      ),

    match_guard: ($) => seq("when", $._expr),

    bind_stmt: ($) =>
      seq(
        choice(
          $.let_stmt,
          $.let_rec_stmt,
          $.let_math_stmt,
          $.let_mutable_stmt,
          $.open_stmt,
        ),
        "in",
        field("expr", $._expr),
      ),

    ctrl_while: ($) => seq("while", $._expr, "do", $._expr),

    ctrl_if: ($) => seq("if", $._expr, "then", $._expr, "else", $._expr),

    lambda: ($) =>
      prec.right(PREC.lambda, seq("fun", repeat1(field('arg', $._pattern)), "->", $._expr)),

    assignment: ($) =>
      prec.right(PREC.assign, seq($.identifier, "<-", $._expr)),

    binary_expr: ($) => {
      // [-+*/^&|=<>!:~'.?]
      const table = [
        [PREC.and, /&[-+*/^&|=<>!:~'.?]+/],
        [PREC.or, /\|[-+*/^&|=<>!:~'.?]+/],
        [PREC.comparative, /=[-+*/^&|=<>!:~'.?]+/],
        // <- は許されない
        [PREC.comparative, /<[+*/^&|=<>!:~'.?]?/],
        [PREC.comparative, /<[-+*/^&|=<>!:~'.?]{2,}/],
        [PREC.comparative, />[+*/^&|=<>!:~'.?]*/],
        [PREC.concat, /\^[-+*/^&|=<>!:~'.?]*/],
        [PREC.concat, "::"],
        [PREC.additive, /\+[-+*/^&|=<>!:~'.?]*/],
        // -> は許されない
        [PREC.subtractive, /-[+*/^&|=<!:~'.?]?/],
        [PREC.subtractive, /-[-+*/^&|=<>!:~'.?]{2,}/],
        [PREC.multiplicative, /\*[-+*/^&|=<>!:~'.?]*/],
        [PREC.divisive, /\/[-+*/^&|=<>!:~'.?]*/],
        [PREC.divisive, "mod"],
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

    unary_operator_expr: ($) =>
      choice(
        prec.right(PREC.unary, seq($.unary_operator, $._expr)),
        prec.right(PREC.stage, seq($.unary_prefix, $._expr)),
      ),

    unary_operator: (_) => choice("-", "not"),

    unary_prefix: (_) => /[&!~]/,

    application: ($) =>
      seq(
        field("function", $._unary),
        repeat1(choice(
          field("arg", $._application_args),
          field("opt", $._application_args_opt),
        )),
      ),

    // TODO: 本当は unary ではない
    _application_args: ($) => choice($.variant_constructor, $._unary),

    _application_args_opt: ($) => seq("?:", $._application_args),

    command_application: ($) =>
      prec.left(PREC.application, seq("command", $.inline_cmd_name)),

    variant_constructor: ($) =>
      prec.left(PREC.constructor, seq($.variant_name, optional($._unary))),

    // }}}

    // unary {{{
    _unary: ($) =>
      seq(
        choice(
          $.block_text,
          $.inline_text,
          $.inline_text_list,
          $.inline_text_bullet_list,
          $.math_text,
          $.math_list,
          $.record,
          $.list,
          $.tuple,
          seq("(", $.binary_operator, ")"),
          seq("(", $._expr, ")"),
          $.expr_with_mod,
          $.modvar,
          $._literal,
          $.identifier,
        ),
      ),

    record: ($) =>
      choice(
        seq("(|", $._unary, "with", $._record_inner, "|)"),
        seq("(|", optional($._record_inner), "|)"),
      ),

    _record_inner: ($) => seq(sep1(";", $.record_unit), optional(";")),

    record_unit: ($) => seq($.identifier, "=", $._expr),

    list: ($) =>
      choice(
        seq("[", sep(";", $._expr), optional(";"), "]"),
      ),

    tuple: ($) =>
      seq(
        "(",
        sep2(",", $._expr),
        ")",
      ),

    expr_with_mod: ($) => seq($.module_name, ".(", $._expr, ")"),

    modvar: ($) => seq($.module_name, ".", $.identifier),

    mod_cmd_name: ($) => seq($.module_name, ".", CMD_NAME),

    module_name: (_) => /[A-Z][-A-Za-z0-9]*/,

    variant_name: ($) => /[A-Z][-A-Za-z0-9]*/,

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

    inline_cmd: ($) =>
      seq(
        field("name", $.inline_cmd_name),
        repeat(
          choice(field("arg", $.cmd_expr_arg), field("opt", $.cmd_expr_option)),
        ),
        choice(repeat1(field("arg", $.cmd_text_arg)), ";"),
      ),

    inline_cmd_name: (_) =>
      token.immediate(
        seq(
          "\\",
          CMD_NAME,
        ),
      ),

    block_cmd: ($) =>
      seq(
        field("name", $.block_cmd_name),
        repeat(
          choice(field("arg", $.cmd_expr_arg), field("opt", $.cmd_expr_option)),
        ),
        choice(repeat1(field("arg", $.cmd_text_arg)), ";"),
      ),

    block_cmd_name: (_) => token.immediate(seq("+", CMD_NAME)),

    cmd_expr_arg: ($) => $._cmd_expr_arg_inner,
    cmd_expr_option: ($) => seq("?:", $._cmd_expr_arg_inner),
    cmd_text_arg: ($) =>
      choice(
        seq("{", optional($.horizontal), "}"),
        seq("<", optional($.vertical), ">"),
      ),
    _cmd_expr_arg_inner: ($) => seq("(", $._expr, ")"),

    math_cmd: ($) =>
      prec.left(
        1,
        seq(
          field("name", $.math_cmd_name),
          repeat(
            choice(
              field("arg", $.math_cmd_expr_arg),
              field("opt", $.math_cmd_expr_option),
            ),
          ),
        ),
      ),

    math_cmd_name: (_) =>
      token.immediate(
        seq(
          "\\",
          CMD_NAME,
        ),
      ),

    math_cmd_expr_arg: ($) => seq($._math_cmd_expr_arg_inner),

    math_cmd_expr_option: ($) => seq("?:", $._math_cmd_expr_arg_inner),

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
        $.math_text,
        $.literal_string,
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

    inline_text_embedding: ($) =>
      seq($._numbersign_after_nospace, $.identifier, ";"),

    // }}}

    // vertical mode {{{
    block_text: ($) => seq("'<", optional($.vertical), ">"),

    vertical: ($) =>
      repeat1(choice(
        $.block_cmd,
        $.block_text_embedding,
      )),

    block_text_embedding: ($) =>
      seq($._numbersign_after_nospace, $.identifier, ";"),

    // }}}

    // math mode {{{
    math_text: ($) => seq("${", optional($.math), "}"),

    math_list: ($) =>
      choice(
        seq("${", "|", "|", "}"),
        seq("${", "|", repeat(seq($.math, "|")), "}"),
      ),

    math: ($) => prec.left(0, repeat1(choice($.math_token, $.math_unary))),

    math_token: ($) =>
      prec.left(
        0,
        choice(
          seq(
            $.math_unary,
            field("sup", $._math_sup),
            field("sub", $._math_sub),
          ),
          seq(
            $.math_unary,
            field("sub", $._math_sub),
            field("sup", $._math_sup),
          ),
          seq($.math_unary, field("sup", $._math_sup)),
          seq($.math_unary, field("sub", $._math_sub)),
        ),
      ),

    _math_sup: ($) => seq("^", $._math_group),

    _math_sub: ($) => seq("_", $._math_group),
    _math_group: ($) =>
      choice(
        $.math_unary,
        seq("{", $.math, "}"),
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

    math_embedding: ($) => seq($._numbersign_after_nospace, $.identifier, ";"),
    // }}}
  },
});

function sep(delimiter, rule) {
  return optional(sep1(delimiter, rule));
}

function sep1(delimiter, rule) {
  return seq(rule, repeat(seq(delimiter, rule)));
}

function sep2(delimiter, rule) {
  return seq(rule, repeat1(seq(delimiter, rule)));
}
