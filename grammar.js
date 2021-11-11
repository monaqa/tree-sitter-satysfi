// vim:sw=2
const PREC = {
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

  typeApplication: 3,
  typeProduct: 2,
  typeFunction: 1,

  signatureFunctor: 2,
  signatureWithType: 1,

};

const INLINE_CMD_NAME = /\\([A-Z][-A-Za-z0-9]*\.)*[A-Za-z][-A-Za-z0-9]*/;
const BLOCK_CMD_NAME = /\+([A-Z][-A-Za-z0-9]*\.)*[A-Za-z][-A-Za-z0-9]*/;
const VARIABLE_NAME = /[a-z][-A-Za-z0-9]*/;
const MODULE_NAME = /[A-Z][-A-Za-z0-9]*/;
const TYPE_VARIABLE = /'[a-z][-A-Za-z0-9]*/;
const ROW_VARIABLE = /'?[a-z][-A-Za-z0-9]*/;

module.exports = grammar({
  name: "satysfi",

  // extras: ($) => [/\s/, $.comment],

  // word: ($) => $.var_name,

  supertype: ($) => [],

  conflicts: ($) => [],

  externals: ($) => [
    $.literal_string,
    // {} の中に入っているインラインテキスト。
    $.inline_token,
    // {||} や {* } の中に入っているインラインテキスト。
    $._inline_token_compound,
    // 決してマッチしないダミーパターン。
    $._dummy,
    // 空白やコメントが入らないことを保証するが、 Lexer は進めない。
    $._numbersign_after_nospace,
    // $.no_extras,
  ],

  rules: {
    source_file: ($) =>
      seq(
        optional($.headers),
        "module",
        $.module_name,
        optional(seq(":>", $.signature)),
        "=",
        $.module,
      ),

    //$1. header
    headers: ($) => seq(repeat1($._header)),

    _header: ($) =>
      choice(
        seq(
          "@require:",
          repeat(/\s/),
          // $.no_extras,
          field("require", $.pkgname),
          "\n",
        ),
        seq(
          "@import:",
          repeat(/\s/),
          // $.no_extras,
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

    //$1. module expression
    module: ($) =>
      choice(
        seq("(", $.module, ")"),
        repeat1_with_delim($.module_name, "."),
        seq("fun", "(", $.module_name, ":", $.signature, ")", "->", $.module),
        seq(
          repeat1_with_delim($.module_name, "."),
          repeat1_with_delim($.module_name, "."),
        ),
        seq("struct", repeat($.binding), "end"),
        seq(repeat1_with_delim($.module_name, "."), ":>", $.signature),
      ),

    module_name: (_) => MODULE_NAME,

    binding: ($) =>
      choice(
        seq("val", $.bind_val),
        seq("type", $.bind_type),
        seq(
          "module",
          $.module_name,
          optional(seq(":>", $.signature)),
          "=",
          $.module,
        ),
        seq("signature", $.module_name, "=", $.signature),
        seq("include", $.module),
      ),

    bind_val: ($) =>
      choice(
        $.bind_val_single,
        seq("rec", repeat1_with_delim($.bind_val_single, "and")),
      ),

    bind_val_single: ($) =>
      choice(
        seq(
          $.var_name,
          optional($.quant),
          repeat($.bind_val_parameter),
          "=",
          $.expr,
        ),
        seq(
          "math",
          $.var_name,
          $.math_cmd_name,
          repeat($.bind_val_parameter),
          "=",
          $.expr,
        ),
        seq(
          "inline",
          $.var_name,
          $.inline_cmd_name,
          repeat($.bind_val_parameter),
          "=",
          $.expr,
        ),
        seq(
          "block",
          $.var_name,
          $.block_cmd_name,
          repeat($.bind_val_parameter),
          "=",
          $.expr,
        ),
      ),

    bind_val_parameter: ($) =>
      seq(
        optional(seq("?(", repeat_with_delim($.opt_parameter, ","), ")")),
        $.parameter,
      ),

    bind_type: ($) => repeat1_with_delim($.bind_type_single, "and"),
    bind_type_single: ($) => seq($.type_name, repeat($.type_var), "=", $.type),

    constructor_branch: ($) => seq($.variant_name, "of", $.type),

    opt_parameter: ($) =>
      seq(
        $.label_name,
        "=",
        $.pattern,
        optional(seq(":", $.type)),
        optional(seq("=", $.expr)),
      ),
    parameter: ($) => choice($.pattern, seq("(", $.pattern, ":", $.type, ")")),

    signature: ($) =>
      choice(
        prec(PREC.signatureFunctor, seq("(", $.module_name, ":", $.signature, ")", "->", $.signature),),
        prec(PREC.signatureWithType, seq($.signature, seq("with", "type", $.bind_type))),
        seq("(", $.signature, ")"),
        repeat1_with_delim($.module_name, "."),
        seq("sig", repeat($.declaration), "end"),
      ),

    //$1. declaration
    declaration: ($) =>
      choice(
        seq("val", $.var_name, optional($.quant), ":", $.type),
        seq("type", $.type_name, "::", $.type_kind),
        seq("type", $.bind_type),
        seq("module", $.module_name, ":", $.signature),
        seq("signature", $.module_name, "=", $.signature),
        seq("include", $.signature),
      ),

    type_kind: ($) => repeat1_with_delim($.base_kind, "->"),
    base_kind: (_) => "o",

    row_kind: ($) =>
      seq("(", "|", repeat1_with_delim($.label_name, ","), "|", ")"),

    label_name: _ => VARIABLE_NAME,
    //$1. type
    type: ($) =>
      choice(
        prec.right(PREC.typeApplication, seq(repeat(seq($.module_name, ".")), $.type_name, repeat($.type)),),
        prec.right(PREC.typeFunction, seq(optional($.type_opts), $.type, "->", $.type),),
        prec(PREC.typeProduct, repeat2_with_delim($.type, "*"),),
        seq("(", $.type, ")"),
        $.type_var,
        seq(
          "(",
          "|",
          repeat1_with_delim(seq($.label_name, ":", $.type), ","),
          "|",
          ")",
        ),
        seq("math", $.cmd_parameter_types),
        seq("inline", $.cmd_parameter_types),
        seq("block", $.cmd_parameter_types),
      ),
    type_var: (_) => TYPE_VARIABLE,

    cmd_parameter_types: ($) =>
      seq("[", repeat_with_delim($.cmd_parameter_type, ","), "]"),

    cmd_parameter_type: ($) => seq(optional(seq($.type_opts_closed, ",")), $.type),

    type_opts: ($) =>
      choice(
        $.type_opts_closed,
        seq("?(", repeat1_with_delim(seq($.label_name, ":", $.type), ","), ",", $.row_var, ")"),
      ),

    type_opts_closed: ($) =>
      seq("?(", repeat1_with_delim(seq($.label_name, ":", $.type), ","), ")"),

    quant: ($) =>
      choice(
        seq(repeat1($.type_var), repeat(seq($.row_var, "::", $.row_kind))),
        repeat1(seq($.row_var, "::", $.row_kind)),
      ),

    row_var: (_) => ROW_VARIABLE,

    //$1. expr
    expr: ($) =>
      choice(
        prec.left(PREC.application, seq($.expr, optional($.expr_opts), $.expr),),
        prec.left(PREC.constructor, seq(repeat(seq($.module_name, ".")), $.variant_name, optional($.expr))),
        seq("(", $.expr, ")"),
        seq(repeat(seq($.module_name, ".")), $.var_name),
        seq("fun", repeat($.bind_val_parameter), "->", $.expr),
        seq("let", $.bind_val, "in", $.expr),
        seq("let", $.non_var_pattern, "=", $.expr, "in", $.expr),
        seq(
          "let",
          "open",
          repeat1_with_delim($.module_name, "."),
          "in",
          $.expr,
        ),
        seq(
          "match",
          $.expr,
          "with",
          optional("|"),
          repeat1_with_delim(seq($.pattern, "->", $.expr), "|"),
          "end",
        ),
        seq("if", $.expr, "then", $.expr, "else", $.expr),
        $._binary_expr,
        seq($.un_op, $.expr),
        seq($.matchable_const),
        seq($.non_matchable_const),
        seq("{", optional($.horizontal), "}"),
        seq("'<", optional($.vertical), ">"),
        seq("${", optional($.math), "}"),
      ),

    _binary_expr: ($) => {
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
              field("left", $.expr),
              field("operator", alias(operator, "bin_op")),
              field("right", $.expr),
            ),
          )
        ),
      );
    },

    un_op: _ => choice("-", "not"),

    expr_opts: ($) =>
      seq("?(", repeat1_with_delim(seq($.label_name, "=", $.expr), ","), ")"),

    matchable_const: ($) =>
      choice(
        seq("(", ")"),
        "true",
        "false",
        $.literal_int,
        $.literal_string,
      ),

    non_matchable_const: ($) =>
      choice(
        $.literal_float,
        $.literal_length,
      ),

    pattern: ($) =>
      choice(
        $.var_name,
        $.non_var_pattern,
      ),

    non_var_pattern: ($) =>
      choice(
        seq("(", $.non_var_pattern, ")"),
        "_",
        $.variant,
        seq("(", repeat2_with_delim($.pattern, ","), ")"),
        $.matchable_const,
      ),

    variant : $ => 
    prec.right(
        seq(
          repeat(seq($.module_name, ".")),
          $.variant_name,
          optional($.pattern),
        ),
    ),

    //$1. mode

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
      seq($._numbersign_after_nospace, $.var_name, ";"),

    block_text: ($) => seq("'<", optional($.vertical), ">"),

    vertical: ($) =>
      repeat1(choice(
        $.block_cmd,
        $.block_text_embedding,
      )),

    block_text_embedding: ($) =>
      seq($._numbersign_after_nospace, $.var_name, ";"),

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

    math_embedding: ($) => seq($._numbersign_after_nospace, $.var_name, ";"),

    //$1. commands
    inline_cmd: ($) =>
      seq(
        field("name", $.inline_cmd_name),
        repeat(
          choice(field("arg", $.cmd_expr_arg), field("opt", $.cmd_expr_option)),
        ),
        choice(repeat1(field("arg", $.cmd_text_arg)), ";"),
      ),

    block_cmd: ($) =>
      seq(
        field("name", $.block_cmd_name),
        repeat(
          choice(field("arg", $.cmd_expr_arg), field("opt", $.cmd_expr_option)),
        ),
        choice(repeat1(field("arg", $.cmd_text_arg)), ";"),
      ),

    cmd_expr_arg: ($) => $._cmd_expr_arg_inner,
    cmd_expr_option: ($) => seq("?:", $._cmd_expr_arg_inner),
    cmd_text_arg: ($) =>
      choice(
        seq("{", optional($.horizontal), "}"),
        seq("<", optional($.vertical), ">"),
      ),
    _cmd_expr_arg_inner: ($) => seq("(", $.expr, ")"),

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

    math_cmd_expr_arg: ($) => seq($._math_cmd_expr_arg_inner),

    math_cmd_expr_option: ($) => seq("?:", $._math_cmd_expr_arg_inner),

    _math_cmd_expr_arg_inner: ($) =>
      choice(
        seq("{", $.math, "}"),
        seq("!", $.inline_text),
        seq("!", "<", $.vertical, ">"),
        seq("!", "(", $.expr, ")"),
        // seq("!", $.list),
        // seq("!", $.record),
      ),

    //$1. const_rule

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

    var_name: (_) => VARIABLE_NAME,
    type_name: (_) => VARIABLE_NAME,
    variant_name: (_) => MODULE_NAME,

    inline_cmd_name: (_) => INLINE_CMD_NAME,
    math_cmd_name: (_) => INLINE_CMD_NAME,
    block_cmd_name: (_) => BLOCK_CMD_NAME,
  },
});

// TODO: trailing comma などを許すオプション
// (match 式の | などにも用いているので注意する)
function repeat_with_delim(rule, delimiter) {
  return optional(repeat1_with_delim(delimiter, rule));
}

function repeat1_with_delim(rule, delimiter) {
  return seq(rule, repeat(seq(delimiter, rule)));
}

function repeat2_with_delim(rule, delimiter) {
  return seq(rule, repeat1(seq(delimiter, rule)));
}
