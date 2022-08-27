// vim:sw=2
const PREC = {
  constructor: 11,
  unary: 11,
  application: 10,
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

// [-+*/^&|=<>!:~'.?]
const OPERATOR_PREC = [
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

function tokens() {
  const VARIABLE_NAME = /[a-z][-A-Za-z0-9]*/;
  const MODULE_NAME = /[A-Z][-A-Za-z0-9]*/;
  const TYPE_VARIABLE = /'[a-z][-A-Za-z0-9]*/;
  const ROW_VARIABLE = /'?[a-z][-A-Za-z0-9]*/;

  return {
    whitespace: /\s+/,
    cmd_name: /[A-Za-z][-A-Za-z0-9]*/,

    type_var: TYPE_VARIABLE,

    var_name: VARIABLE_NAME,
    type_name: VARIABLE_NAME,
    variant_name: MODULE_NAME,
    module_name: MODULE_NAME,
    label_name: VARIABLE_NAME,

    // row_variable のパターンは var_name を内包するため、var_name の後ろに置く
    row_var: ROW_VARIABLE,
  };
}

const tokenGrammar = Object.fromEntries(
  Object.entries(tokens()).map(([k, v]) => [k, (_) => v]),
);

module.exports = grammar({
  name: "satysfi",

  extras: ($) => [/\s/, $.comment],

  // word: ($) => $.var_name,

  supertype: ($) => [
    $._module,
    $._binding,
    $._signature,
    $._declaration,
    $._type,
    $._expr,
    $._pattern,
    $._bind_val_single,
    $._literal,
  ],

  conflicts: ($) => [[$._expr, $._expr_application_function]],

  externals: ($) => [
    $.literal_string,
    // {} の中に入っているインラインテキスト。
    $.inline_token,
    // {||} や {* } の中に入っているインラインテキスト。
    $._inline_token_compound,
    // #foo; のように、prefix として付く '#'。
    $._numbersign_after_nospace,
    // ModuleX.ModuleY.var_name のように、prefix として付く Module 名。
    $._module_prefix,
    // \SATySFi のようなコマンドの prefix として付く '\'。
    $._inline_cmd_prefix,
    // +section のようなコマンドの prefix として付く '+'。
    $._block_cmd_prefix,
    // 決してマッチしないダミーパターン。
    $._dummy,
  ],

  rules: {
    source_file: ($) => choice($.program_saty, $.program_satyh),

    program_satyh: ($) =>
      seq(
        optional($.headers),
        "module",
        $.module_name,
        optional(seq(":>", $._signature)),
        "=",
        $._module,
      ),

    program_saty: ($) =>
      seq(
        optional(field("stage", $.header_stage)),
        optional(field("headers", $.headers)),
        field("expr", $._expr),
      ),

    ...tokenGrammar,

    comment: (_) => token(seq("%", /.*/)),

    //$1 header
    headers: ($) => seq(repeat1($._header)),

    _header: ($) =>
      choice(
        seq(
          "@require:",
          optional($.whitespace),
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

    //$1 module expression
    _module: ($) =>
      choice(
        $.module_parened,
        $.module_path,
        $.module_functor_abstraction,
        $.module_functor_application,
        $.module_structure,
        $.module_coerction,
      ),

    module_parened: ($) => seq("(", $._module, ")"),

    module_path: ($) =>
      seq(
        repeat(seq(alias($._module_prefix, $.module_name), ".")),
        $.module_name,
      ),

    module_functor_abstraction: ($) =>
      seq("fun", "(", $.module_name, ":", $._signature, ")", "->", $._module),

    module_functor_application: ($) =>
      seq(field("functor", $.module_path), field("arg", $.module_path)),

    module_structure: ($) => seq("struct", repeat($._binding), "end"),

    module_coerction: ($) => seq($.module_path, ":>", $._signature),

    _binding: ($) =>
      choice(
        $.bind_val,
        $.bind_type,
        $.bind_module,
        $.bind_signature,
        $.bind_include,
      ),

    bind_val: ($) => seq("val", $._bind_val),
    bind_type: ($) => seq("type", $._bind_type),
    bind_module: ($) =>
      seq(
        "module",
        field("name", $.module_name),
        optional(seq(":>", field("signature", $._signature))),
        "=",
        field("body", $._module),
      ),
    bind_signature: ($) => seq("signature", $.module_name, "=", $._signature),
    bind_include: ($) => seq("include", $._module),

    _bind_val: ($) =>
      choice($._bind_val_single, seq("rec", sep($._bind_val_single, "and"))),

    _bind_val_single: ($) =>
      choice(
        $.bind_val_variable,
        $.bind_val_math_cmd,
        $.bind_val_inline_cmd,
        $.bind_val_block_cmd,
        $.bind_val_mutable,
      ),

    bind_val_variable: ($) =>
      seq(
        field("name", $.var_name),
        optional($.quant),
        repeat(field("param", $.bind_val_parameter)),
        "=",
        field("expr", $._expr),
      ),

    bind_val_math_cmd: ($) =>
      seq(
        "math",
        optional(field("context", $.var_name)),
        $.math_cmd_name,
        repeat(field("param", $.bind_val_parameter)),
        "=",
        field("expr", $._expr),
      ),

    bind_val_inline_cmd: ($) =>
      seq(
        "inline",
        optional(field("context", $.var_name)),
        $.inline_cmd_name,
        repeat(field("param", $.bind_val_parameter)),
        "=",
        field("expr", $._expr),
      ),

    bind_val_block_cmd: ($) =>
      seq(
        "block",
        optional(field("context", $.var_name)),
        $.block_cmd_name,
        repeat(field("param", $.bind_val_parameter)),
        "=",
        field("expr", $._expr),
      ),

    bind_val_mutable: ($) =>
      seq(
        "mutable",
        field("name", $.var_name),
        // optional($.quant),
        // repeat(field("param", $.bind_val_parameter)),
        "<-",
        field("expr", $._expr),
      ),

    bind_val_parameter: ($) =>
      seq(
        optional(seq("?(", ")")),
        optional(seq("?(", sep($.opt_parameter, ","), ")")),
        $.parameter,
      ),

    _bind_type: ($) => sep($.bind_type_single, "and"),
    bind_type_single: ($) =>
      choice(
        seq($.type_name, repeat($.type_var), "=", $._type),
        seq(
          $.type_name,
          repeat($.type_var),
          "=",
          "|",
          sep($.constructor_branch, "|"),
        ),
      ),

    constructor_branch: ($) => seq($.variant_name, "of", $._type),

    opt_parameter: ($) =>
      seq(
        $.label_name,
        "=",
        $._pattern,
        optional(seq(":", $._type)),
        optional(seq("=", $._expr)),
      ),
    parameter: ($) =>
      choice($._pattern, seq("(", $._pattern, ":", $._type, ")")),

    _signature: ($) =>
      choice(
        $.signature_parened,
        $.signature_path,
        $.signature_functor,
        $.signature_structure,
        $.signature_with_bind_type,
      ),

    signature_parened: ($) => seq("(", $._signature, ")"),

    signature_functor: ($) =>
      prec(
        PREC.signatureFunctor,
        seq("(", $.module_name, ":", $._signature, ")", "->", $._signature),
      ),
    signature_with_bind_type: ($) =>
      prec(
        PREC.signatureWithType,
        seq($._signature, seq("with", "type", $.bind_type)),
      ),
    signature_path: ($) => sep($.module_name, "."),
    signature_structure: ($) => seq("sig", repeat($._declaration), "end"),

    //$1 declaration
    _declaration: ($) =>
      choice(
        $.declaration_val,
        $.declaration_type_kind,
        $.declaration_type,
        $.declaration_module,
        $.declaration_signature,
        $.declaration_include,
      ),
    declaration_val: ($) =>
      seq(
        "val",
        $._declaration_val_name,
        optional($.quant),
        ":",
        field("type", $._type),
      ),
    _declaration_val_name: ($) =>
      choice(
        field("var", $.var_name),
        field("cmd", choice($.inline_cmd_name, $.block_cmd_name)),
      ),
    declaration_type_kind: ($) => seq("type", $.type_name, "::", $.type_kind),
    declaration_type: ($) => seq("type", $.bind_type),
    declaration_module: ($) => seq("module", $.module_name, ":", $._signature),
    declaration_signature: ($) =>
      seq("signature", $.module_name, "=", $._signature),
    declaration_include: ($) => seq("include", $._signature),

    type_kind: ($) => sep($.base_kind, "->"),
    base_kind: (_) => "o",

    row_kind: ($) => seq("(", "|", sep($.label_name, ","), "|", ")"),

    //$1 type
    _type: ($) =>
      choice(
        $.type_path,
        $.type_application,
        $.type_function,
        $.type_product,
        $.type_parened,
        $.type_record,
        $.type_var,
        $.type_math_cmd,
        $.type_inline_cmd,
        $.type_block_cmd,
      ),

    type_path: ($) => seq(repeat(seq($.module_name, ".")), $.type_name),

    type_application: ($) =>
      prec.right(PREC.typeApplication, seq($.type_path, repeat1($._type))),

    type_function: ($) =>
      prec.right(
        PREC.typeFunction,
        seq(
          optional($.type_opts),
          field("arg", $._type),
          "->",
          field("ret", $._type),
        ),
      ),

    type_product: ($) =>
      prec.left(PREC.typeProduct, seq($._type, "*", sep($._type, "*"))),

    type_parened: ($) => seq("(", $._type, ")"),

    type_record: ($) =>
      seq("(|", sep(seq($.label_name, ":", $._type), ","), "|)"),

    type_math_cmd: ($) => seq("math", $.cmd_parameter_types),
    type_inline_cmd: ($) => seq("inline", $.cmd_parameter_types),
    type_block_cmd: ($) => seq("block", $.cmd_parameter_types),

    cmd_parameter_types: ($) =>
      choice(seq("[", "]"), seq("[", sep($.cmd_parameter_type, ","), "]")),

    cmd_parameter_type: ($) =>
      seq(optional(seq($.type_opts_closed, ",")), $._type),

    type_opts: ($) =>
      choice(
        $.type_opts_closed,
        seq(
          "?(",
          sep(seq($.label_name, ":", $._type), ","),
          ",",
          $.row_var,
          ")",
        ),
      ),

    type_opts_closed: ($) =>
      seq("?(", sep(seq($.label_name, ":", $._type), ","), ")"),

    quant: ($) =>
      choice(
        seq(repeat1($.type_var), repeat(seq($.row_var, "::", $.row_kind))),
        repeat1(seq($.row_var, "::", $.row_kind)),
      ),

    //$1 expr
    _expr: ($) =>
      choice(
        $.expr_parened,
        $.expr_constructor,
        $.expr_application,
        $.expr_var_path,
        $.expr_lambda,
        $.expr_bind,
        $.expr_open,
        $.expr_match,
        $.expr_if,
        $.expr_assignment,
        $.expr_binary_operation,
        $.expr_binary_operator,
        $.expr_unary_operation,
        $.inline_text,
        $.block_text,
        $.math_text,
        $.expr_record,
        $.expr_list,
        $.expr_tuple,
        $.expr_record_member,
        $.expr_command,
        $._literal,
      ),

    expr_parened: ($) => seq("(", $._expr, ")"),

    expr_constructor: ($) =>
      prec.left(
        PREC.constructor,
        seq(
          choice(
            field("variant", $.variant_path),
            field("variant", $.variant_name),
          ),
          field("arg", optional($._expr)),
        ),
      ),
    variant_path: ($) => seq(repeat1(seq($.module_name, ".")), $.variant_name),

    expr_application: ($) =>
      prec.left(
        PREC.application,
        seq(
          field("function", $._expr_application_function),
          field("opt_arg", optional($.expr_opts)),
          field("arg", $._expr),
        ),
      ),

    _expr_application_function: ($) =>
      choice(
        $.expr_parened,
        // $.expr_constructor,
        $.expr_application,
        $.expr_var_path,
        // $.expr_lambda,
        // $.expr_bind,
        // $.expr_open,
        // $.expr_match,
        // $.expr_if,
        // $.expr_binary_operation,
        // $.expr_binary_operator,
        // $.expr_unary_operation,
        // $._literal,
        // $.inline_text,
        // $.block_text,
        // $.math_text,
        // $.expr_record,
        // $.expr_list,
        // $.expr_tuple,
        $.expr_record_member,
      ),

    expr_var_path: ($) => seq(repeat(seq($.module_name, ".")), $.var_name),

    expr_lambda: ($) => seq("fun", repeat($.bind_val_parameter), "->", $._expr),

    expr_bind: ($) =>
      seq("let", choice($._bind_val, $.bind_val_pattern), "in", $._expr),

    bind_val_pattern: ($) =>
      seq(field("pattern", $._non_var_pattern), "=", field("expr", $._expr)),

    expr_open: ($) => seq("let", "open", $.module_path, "in", $._expr),

    expr_match: ($) =>
      seq(
        "match",
        field("expr", $._expr),
        "with",
        optional("|"),
        sep($.match_arm, "|"),
        "end",
      ),

    match_arm: ($) =>
      seq(
        field("pattern", $.pattern_as),
        optional(field("guard", $.match_guard)),
        "->",
        field("expr", $._expr),
      ),
    match_guard: ($) => seq("when", $._expr),

    expr_if: ($) => seq("if", $._expr, "then", $._expr, "else", $._expr),

    expr_binary_operation: ($) => $._binary_expr,

    expr_binary_operator: ($) => seq("(", $.binary_operator, ")"),

    expr_unary_operation: ($) =>
      prec(
        PREC.unary,
        seq(field("operator", $.unary_operator), field("expr", $._expr)),
      ),

    expr_assignment: ($) =>
      prec.right(PREC.assign, seq($.var_name, "<-", $._expr)),

    _literal: ($) =>
      choice(seq($._matchable_const), seq($._non_matchable_const)),

    expr_record: ($) =>
      choice(
        seq("(|", $._expr, "with", $._record_inner, "|)"),
        seq("(|", optional($._record_inner), "|)"),
      ),

    _record_inner: ($) => seq(sep($.record_unit, ","), optional(",")),

    record_unit: ($) => seq($.label_name, "=", $._expr),

    expr_list: ($) =>
      choice(seq("[", "]"), seq("[", sep($._expr, ","), optional(","), "]")),

    expr_tuple: ($) => seq("(", $._expr, ",", sep($._expr, ","), ")"),

    binary_operator: (_) =>
      choice(...OPERATOR_PREC.map(([_prec, operator]) => operator)),

    _binary_expr: ($) =>
      choice(
        ...OPERATOR_PREC.map(([precedence, operator]) =>
          prec.left(
            precedence,
            seq(
              field("left", $._expr),
              field("operator", alias(operator, $.binary_operator)),
              field("right", $._expr),
            ),
          ),
        ),
      ),

    unary_operator: (_) => choice("-", "not", "!"),

    expr_opts: ($) => $._expr_opts,
    _expr_opts: ($) =>
      seq("?(", sep(seq($.label_name, "=", $._expr), ","), ")"),

    variant: ($) => prec.right(seq($.variant_path, optional($._pattern))),

    expr_record_member: ($) =>
      seq(
        choice($.expr_parened, $.expr_var_path, $.expr_record),
        "#",
        $.var_name,
      ),

    expr_command: ($) =>
      prec.left(PREC.application, seq("command", $.inline_cmd_name)),

    _matchable_const: ($) =>
      choice($.literal_unit, $.literal_bool, $.literal_int, $.literal_string),

    _non_matchable_const: ($) => choice($.literal_float, $.literal_length),

    //$1 pattern

    pattern_as: ($) =>
      prec.left(0, seq($._pattern_cons, optional(seq("as", $.var_name)))),

    _pattern_cons: ($) =>
      choice(seq($._pattern, "::", $.pattern_as), $._pattern),

    _pattern: ($) => choice($.var_name, $._non_var_pattern),

    _non_var_pattern: ($) =>
      choice(
        $.pattern_operator,
        $.pattern_parened,
        $.pattern_ignore,
        $.pattern_variant,
        $.pattern_tuple,
        $.pattern_const,
      ),

    pattern_parened: ($) => seq("(", $.pattern_as, ")"),

    pattern_operator: ($) =>
      seq("(", choice($.binary_operator, $.unary_operator), ")"),

    pattern_ignore: (_) => "_",

    pattern_variant: ($) =>
      prec.right(seq($.variant_name, optional($._pattern))),

    pattern_tuple: ($) => seq("(", $._pattern, ",", sep($._pattern, ","), ")"),

    pattern_const: ($) => $._matchable_const,

    //$1 mode

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
          "|",
          "}",
        ),
      ),

    inline_text_bullet_list: ($) =>
      seq("{", repeat1($.inline_text_bullet_item), "}"),

    horizontal: ($) =>
      repeat1(
        choice(
          $.inline_literal_escaped,
          $.inline_text_embedding,
          $.math_text,
          $.literal_string,
          $.inline_cmd,
          $.inline_token,
        ),
      ),

    _horizontal_compound: ($) =>
      repeat1(
        choice(
          $.inline_literal_escaped,
          $.inline_text_embedding,
          $.math_text,
          $.literal_string,
          $.inline_cmd,
          alias($._inline_token_compound, $.inline_token),
        ),
      ),

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
        '\\"',
        "\\<",
        "\\>",
        "\\_",
      ),

    inline_text_embedding: ($) =>
      seq(alias($._numbersign_after_nospace, "#"), $.var_name, ";"),

    block_text: ($) => seq("'<", optional($.vertical), ">"),

    vertical: ($) => repeat1(choice($.block_cmd, $.block_text_embedding)),

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

    _math_group: ($) => choice($.math_unary, seq("{", $.math, "}")),

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

    //$1 commands
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
        alias($._inline_cmd_prefix, "\\"),
        choice($._mod_cmd_name, $.cmd_name),
      ),
    _mod_cmd_name: ($) =>
      seq(
        repeat1(seq(alias($._module_prefix, $.module_name), ".")),
        $.cmd_name,
      ),

    block_cmd: ($) =>
      seq(
        field("name", $.block_cmd_name),
        repeat(
          choice(field("arg", $.cmd_expr_arg), field("opt", $.cmd_expr_option)),
        ),
        choice(repeat1(field("arg", $.cmd_text_arg)), ";"),
      ),

    block_cmd_name: ($) =>
      seq(
        alias($._block_cmd_prefix, "+"),
        choice($._mod_cmd_name, $.cmd_name, "a"),
      ),

    cmd_expr_arg: ($) => $._cmd_expr_arg_inner,
    cmd_expr_option: ($) => $._expr_opts,
    _cmd_expr_arg_inner: ($) =>
      choice(seq("(", $._expr, ")"), $.expr_list, $.expr_record),

    cmd_text_arg: ($) =>
      choice(
        $.inline_text,
        $.inline_text_list,
        $.inline_text_bullet_list,
        alias($._cmd_text_arg_block, $.block_text),
      ),
    _cmd_text_arg_block: ($) => seq("<", optional($.vertical), ">"),

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

    math_cmd_name: ($) =>
      seq(
        alias($._inline_cmd_prefix, "\\"),
        choice($._mod_cmd_name, $.cmd_name),
      ),

    math_cmd_expr_arg: ($) => seq($._math_cmd_expr_arg_inner),

    math_cmd_expr_option: ($) => seq("?:", $._math_cmd_expr_arg_inner),

    _math_cmd_expr_arg_inner: ($) =>
      choice(
        seq("{", $.math, "}"),
        seq("!", $.inline_text),
        seq("!", $.inline_text_list),
        seq("!", $.inline_text_bullet_list),
        seq("!", $._cmd_expr_arg_inner),
        seq("!", $._cmd_text_arg_block),
      ),

    //$1 const_rule
    literal_unit: (_) => seq("(", ")"),
    literal_bool: (_) => choice("true", "false"),

    literal_length: (_) => {
      const digits = /[0-9]+/;
      return token(
        choice(
          seq(optional("-"), digits, /[a-z]+/),
          seq(optional("-"), digits, ".", optional(digits), /[a-z]+/),
          seq(optional("-"), optional(digits), ".", digits, /[a-z]+/),
        ),
      );
    },

    literal_int: (_) =>
      token(
        choice(seq(choice("0x", "0X"), repeat1(/[A-F0-9]/)), repeat1(/[0-9]/)),
      ),

    literal_float: (_) => {
      const digits = repeat1(/[0-9]/);

      return token(
        choice(
          seq(digits, ".", optional(digits)),
          seq(optional(digits), ".", digits),
        ),
      );
    },
  },
});

function sep(rule, delimiter) {
  return seq(rule, repeat(seq(delimiter, rule)));
}

function optseq(rule) {
  return seq(rule, repeat(seq(delimiter, rule)));
}
