// vim:sw=2
module.exports = grammar({
  name: 'satysfi',

  extras: $ => [/\s/, $.comment],

  word: $ => $.identifier,

  supertype: $ => [
    $._literal,
    $._expr,
  ],

  externals: $ => [
    $.literal_string,
    $.inline_token,
  ],

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => $.program_saty,

    comment: _ => token(seq('%', /.*/)),

    program_saty: $ => seq(
      optional(field('headers', $.headers)),
      // field('preamble', $.preamble),
      field('expr', $._expr),
    ),

    headers: $ => repeat1($.header),

    header: $ => $.header_require,

    header_require: $ => seq('@require:', repeat(/\s/), field('pkgname', $.pkgname), "\n"),

    pkgname: _ => /[^\n\r]+/,

    _expr: $ => choice($._unary, $.bind_stmt),

    bind_stmt: $ => seq(
      'let',
      field('pattern', $.identifier),
      '=',
      field('definition', $._expr),
      'in',
      field('expr', $._expr)
    ),

    _unary: $ => choice(
      $._literal,
      $.inline_text,
      $.identifier
    ),

    _literal: $ => choice(
      $.literal_unit,
      $.literal_bool,
      $.literal_length,
      $.literal_int,
      $.literal_string,
      $.literal_float,
    ),

    identifier: _ => /[a-z][-a-zA-Z0-9]*/,

    literal_unit: _ => seq("(", ")"),

    literal_bool: _ => choice("true", "false"),

    // literal_length: _ => token.immediate(seq(
    //   optional("-"),
    //   choice(
    //     /[1-9][0-9]*/,
    //     "0",
    //     /.[0-9]+|[0-9]+.[0-9]*/
    //   ),
    //   /[a-z][-A-Za-z0-9]*/
    // )),
    literal_length: _ => {
      const digits = repeat1(/[0-9]+/);
      return token(choice(
        seq(optional("-"), digits, /[a-z]+/),
        seq(optional("-"), digits, '.', optional(digits), /[a-z]+/),
        seq(optional("-"), optional(digits), '.', digits, /[a-z]+/),
      ))},

    literal_int: _ => token(choice(
      seq(
        choice('0x', '0X'),
        repeat1(/[A-F0-9]+/),
      ),
      repeat1(/[0-9]+/),
    )),

    literal_float: _ => {
      const digits = repeat1(/[0-9]+/);

      return token(
        choice(
          seq(digits, '.', optional(digits)),
          seq(optional(digits), '.', digits),
        ),
      )
    },

    inline_text: $ => seq(
      "{",
      repeat(choice(
        $.inline_token,
        $.inline_literal_escaped,
      )),
      "}"
    ),

    inline_literal_escaped: _ => choice("\\\\", "\\*", "\\|", "\\{", "\\}")

  }
});

