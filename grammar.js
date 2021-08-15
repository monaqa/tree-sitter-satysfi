module.exports = grammar({
  name: 'satysfi',

  word: $ => $.identifier,

  extras: $ => [/\s/, $.comment],

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => $.program_saty,

    comment: _ => token(seq('%', /.*/)),

    program_saty: $ => seq(
      optional(field('headers', $.headers)),
      // field('preamble', $.preamble),
      field('expr', $.expr),
    ),

    headers: $ => repeat1($.header),

    header: $ => $._header_require,

    _header_require: $ => seq('@require:', field('pkgname', $.pkgname), "\n"),

    pkgname: _ => /[^\n\r]+/,

    expr: $ => choice($._unary, $.bind_stmt),

    bind_stmt: $ => seq(
      'let',
      field('pattern', $.identifier),
      '=',
      field('definition', $.expr),
      'in',
      field('expr', $.expr)
    ),

    _unary: $ => $.identifier,

    identifier: $ => /[a-z][-a-zA-Z0-9]*/,
  }
});
