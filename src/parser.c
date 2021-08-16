#include <tree_sitter/parser.h>

#if defined(__GNUC__) || defined(__clang__)
#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Wmissing-field-initializers"
#endif

#define LANGUAGE_VERSION 13
#define STATE_COUNT 32
#define LARGE_STATE_COUNT 2
#define SYMBOL_COUNT 42
#define ALIAS_COUNT 0
#define TOKEN_COUNT 26
#define EXTERNAL_TOKEN_COUNT 2
#define FIELD_COUNT 5
#define MAX_ALIAS_SEQUENCE_LENGTH 6
#define PRODUCTION_ID_COUNT 6

enum {
  sym_identifier = 1,
  sym_comment = 2,
  anon_sym_ATrequire_COLON = 3,
  aux_sym_header_require_token1 = 4,
  anon_sym_LF = 5,
  sym_pkgname = 6,
  anon_sym_let = 7,
  anon_sym_EQ = 8,
  anon_sym_in = 9,
  anon_sym_LPAREN = 10,
  anon_sym_RPAREN = 11,
  anon_sym_true = 12,
  anon_sym_false = 13,
  sym_literal_length = 14,
  sym_literal_int = 15,
  sym_literal_float = 16,
  anon_sym_LBRACE = 17,
  anon_sym_RBRACE = 18,
  anon_sym_BSLASH_BSLASH = 19,
  anon_sym_BSLASH_STAR = 20,
  anon_sym_BSLASH_PIPE = 21,
  anon_sym_BSLASH_LBRACE = 22,
  anon_sym_BSLASH_RBRACE = 23,
  sym_literal_string = 24,
  sym_inline_token = 25,
  sym_source_file = 26,
  sym_program_saty = 27,
  sym_headers = 28,
  sym_header = 29,
  sym_header_require = 30,
  sym__expr = 31,
  sym_bind_stmt = 32,
  sym__unary = 33,
  sym__literal = 34,
  sym_literal_unit = 35,
  sym_literal_bool = 36,
  sym_inline_text = 37,
  sym_inline_literal_escaped = 38,
  aux_sym_headers_repeat1 = 39,
  aux_sym_header_require_repeat1 = 40,
  aux_sym_inline_text_repeat1 = 41,
};

static const char * const ts_symbol_names[] = {
  [ts_builtin_sym_end] = "end",
  [sym_identifier] = "identifier",
  [sym_comment] = "comment",
  [anon_sym_ATrequire_COLON] = "@require:",
  [aux_sym_header_require_token1] = "header_require_token1",
  [anon_sym_LF] = "\n",
  [sym_pkgname] = "pkgname",
  [anon_sym_let] = "let",
  [anon_sym_EQ] = "=",
  [anon_sym_in] = "in",
  [anon_sym_LPAREN] = "(",
  [anon_sym_RPAREN] = ")",
  [anon_sym_true] = "true",
  [anon_sym_false] = "false",
  [sym_literal_length] = "literal_length",
  [sym_literal_int] = "literal_int",
  [sym_literal_float] = "literal_float",
  [anon_sym_LBRACE] = "{",
  [anon_sym_RBRACE] = "}",
  [anon_sym_BSLASH_BSLASH] = "\\\\",
  [anon_sym_BSLASH_STAR] = "\\*",
  [anon_sym_BSLASH_PIPE] = "\\|",
  [anon_sym_BSLASH_LBRACE] = "\\{",
  [anon_sym_BSLASH_RBRACE] = "\\}",
  [sym_literal_string] = "literal_string",
  [sym_inline_token] = "inline_token",
  [sym_source_file] = "source_file",
  [sym_program_saty] = "program_saty",
  [sym_headers] = "headers",
  [sym_header] = "header",
  [sym_header_require] = "header_require",
  [sym__expr] = "_expr",
  [sym_bind_stmt] = "bind_stmt",
  [sym__unary] = "_unary",
  [sym__literal] = "_literal",
  [sym_literal_unit] = "literal_unit",
  [sym_literal_bool] = "literal_bool",
  [sym_inline_text] = "inline_text",
  [sym_inline_literal_escaped] = "inline_literal_escaped",
  [aux_sym_headers_repeat1] = "headers_repeat1",
  [aux_sym_header_require_repeat1] = "header_require_repeat1",
  [aux_sym_inline_text_repeat1] = "inline_text_repeat1",
};

static const TSSymbol ts_symbol_map[] = {
  [ts_builtin_sym_end] = ts_builtin_sym_end,
  [sym_identifier] = sym_identifier,
  [sym_comment] = sym_comment,
  [anon_sym_ATrequire_COLON] = anon_sym_ATrequire_COLON,
  [aux_sym_header_require_token1] = aux_sym_header_require_token1,
  [anon_sym_LF] = anon_sym_LF,
  [sym_pkgname] = sym_pkgname,
  [anon_sym_let] = anon_sym_let,
  [anon_sym_EQ] = anon_sym_EQ,
  [anon_sym_in] = anon_sym_in,
  [anon_sym_LPAREN] = anon_sym_LPAREN,
  [anon_sym_RPAREN] = anon_sym_RPAREN,
  [anon_sym_true] = anon_sym_true,
  [anon_sym_false] = anon_sym_false,
  [sym_literal_length] = sym_literal_length,
  [sym_literal_int] = sym_literal_int,
  [sym_literal_float] = sym_literal_float,
  [anon_sym_LBRACE] = anon_sym_LBRACE,
  [anon_sym_RBRACE] = anon_sym_RBRACE,
  [anon_sym_BSLASH_BSLASH] = anon_sym_BSLASH_BSLASH,
  [anon_sym_BSLASH_STAR] = anon_sym_BSLASH_STAR,
  [anon_sym_BSLASH_PIPE] = anon_sym_BSLASH_PIPE,
  [anon_sym_BSLASH_LBRACE] = anon_sym_BSLASH_LBRACE,
  [anon_sym_BSLASH_RBRACE] = anon_sym_BSLASH_RBRACE,
  [sym_literal_string] = sym_literal_string,
  [sym_inline_token] = sym_inline_token,
  [sym_source_file] = sym_source_file,
  [sym_program_saty] = sym_program_saty,
  [sym_headers] = sym_headers,
  [sym_header] = sym_header,
  [sym_header_require] = sym_header_require,
  [sym__expr] = sym__expr,
  [sym_bind_stmt] = sym_bind_stmt,
  [sym__unary] = sym__unary,
  [sym__literal] = sym__literal,
  [sym_literal_unit] = sym_literal_unit,
  [sym_literal_bool] = sym_literal_bool,
  [sym_inline_text] = sym_inline_text,
  [sym_inline_literal_escaped] = sym_inline_literal_escaped,
  [aux_sym_headers_repeat1] = aux_sym_headers_repeat1,
  [aux_sym_header_require_repeat1] = aux_sym_header_require_repeat1,
  [aux_sym_inline_text_repeat1] = aux_sym_inline_text_repeat1,
};

static const TSSymbolMetadata ts_symbol_metadata[] = {
  [ts_builtin_sym_end] = {
    .visible = false,
    .named = true,
  },
  [sym_identifier] = {
    .visible = true,
    .named = true,
  },
  [sym_comment] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_ATrequire_COLON] = {
    .visible = true,
    .named = false,
  },
  [aux_sym_header_require_token1] = {
    .visible = false,
    .named = false,
  },
  [anon_sym_LF] = {
    .visible = true,
    .named = false,
  },
  [sym_pkgname] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_let] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_EQ] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_in] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_LPAREN] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_RPAREN] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_true] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_false] = {
    .visible = true,
    .named = false,
  },
  [sym_literal_length] = {
    .visible = true,
    .named = true,
  },
  [sym_literal_int] = {
    .visible = true,
    .named = true,
  },
  [sym_literal_float] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_LBRACE] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_RBRACE] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_BSLASH_BSLASH] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_BSLASH_STAR] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_BSLASH_PIPE] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_BSLASH_LBRACE] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_BSLASH_RBRACE] = {
    .visible = true,
    .named = false,
  },
  [sym_literal_string] = {
    .visible = true,
    .named = true,
  },
  [sym_inline_token] = {
    .visible = true,
    .named = true,
  },
  [sym_source_file] = {
    .visible = true,
    .named = true,
  },
  [sym_program_saty] = {
    .visible = true,
    .named = true,
  },
  [sym_headers] = {
    .visible = true,
    .named = true,
  },
  [sym_header] = {
    .visible = true,
    .named = true,
  },
  [sym_header_require] = {
    .visible = true,
    .named = true,
  },
  [sym__expr] = {
    .visible = false,
    .named = true,
  },
  [sym_bind_stmt] = {
    .visible = true,
    .named = true,
  },
  [sym__unary] = {
    .visible = false,
    .named = true,
  },
  [sym__literal] = {
    .visible = false,
    .named = true,
  },
  [sym_literal_unit] = {
    .visible = true,
    .named = true,
  },
  [sym_literal_bool] = {
    .visible = true,
    .named = true,
  },
  [sym_inline_text] = {
    .visible = true,
    .named = true,
  },
  [sym_inline_literal_escaped] = {
    .visible = true,
    .named = true,
  },
  [aux_sym_headers_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_header_require_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_inline_text_repeat1] = {
    .visible = false,
    .named = false,
  },
};

enum {
  field_definition = 1,
  field_expr = 2,
  field_headers = 3,
  field_pattern = 4,
  field_pkgname = 5,
};

static const char * const ts_field_names[] = {
  [0] = NULL,
  [field_definition] = "definition",
  [field_expr] = "expr",
  [field_headers] = "headers",
  [field_pattern] = "pattern",
  [field_pkgname] = "pkgname",
};

static const TSFieldMapSlice ts_field_map_slices[PRODUCTION_ID_COUNT] = {
  [1] = {.index = 0, .length = 1},
  [2] = {.index = 1, .length = 2},
  [3] = {.index = 3, .length = 1},
  [4] = {.index = 4, .length = 1},
  [5] = {.index = 5, .length = 3},
};

static const TSFieldMapEntry ts_field_map_entries[] = {
  [0] =
    {field_expr, 0},
  [1] =
    {field_expr, 1},
    {field_headers, 0},
  [3] =
    {field_pkgname, 1},
  [4] =
    {field_pkgname, 2},
  [5] =
    {field_definition, 3},
    {field_expr, 5},
    {field_pattern, 1},
};

static const TSSymbol ts_alias_sequences[PRODUCTION_ID_COUNT][MAX_ALIAS_SEQUENCE_LENGTH] = {
  [0] = {0},
};

static const uint16_t ts_non_terminal_alias_map[] = {
  0,
};

static bool ts_lex(TSLexer *lexer, TSStateId state) {
  START_LEXER();
  eof = lexer->eof(lexer);
  switch (state) {
    case 0:
      if (eof) ADVANCE(18);
      if (lookahead == '\n') ADVANCE(24);
      if (lookahead == '%') ADVANCE(20);
      if (lookahead == '(') ADVANCE(28);
      if (lookahead == ')') ADVANCE(29);
      if (lookahead == '-') ADVANCE(4);
      if (lookahead == '.') ADVANCE(13);
      if (lookahead == '0') ADVANCE(32);
      if (lookahead == '=') ADVANCE(26);
      if (lookahead == '@') ADVANCE(10);
      if (lookahead == '\\') ADVANCE(2);
      if (lookahead == '{') ADVANCE(36);
      if (lookahead == '}') ADVANCE(37);
      if (lookahead == '\t' ||
          lookahead == '\r' ||
          lookahead == ' ') ADVANCE(22);
      if (('1' <= lookahead && lookahead <= '9')) ADVANCE(33);
      if (('a' <= lookahead && lookahead <= 'z')) ADVANCE(27);
      END_STATE();
    case 1:
      if (lookahead == '%') ADVANCE(19);
      if (lookahead == '\t' ||
          lookahead == ' ') ADVANCE(23);
      if (lookahead == '\n' ||
          lookahead == '\r') ADVANCE(22);
      if (lookahead != 0) ADVANCE(25);
      END_STATE();
    case 2:
      if (lookahead == '*') ADVANCE(39);
      if (lookahead == '\\') ADVANCE(38);
      if (lookahead == '{') ADVANCE(41);
      if (lookahead == '|') ADVANCE(40);
      if (lookahead == '}') ADVANCE(42);
      END_STATE();
    case 3:
      if (lookahead == '.') ADVANCE(15);
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(3);
      if (('a' <= lookahead && lookahead <= 'z')) ADVANCE(31);
      END_STATE();
    case 4:
      if (lookahead == '.') ADVANCE(14);
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(3);
      END_STATE();
    case 5:
      if (lookahead == ':') ADVANCE(21);
      END_STATE();
    case 6:
      if (lookahead == 'e') ADVANCE(9);
      END_STATE();
    case 7:
      if (lookahead == 'e') ADVANCE(5);
      END_STATE();
    case 8:
      if (lookahead == 'i') ADVANCE(11);
      END_STATE();
    case 9:
      if (lookahead == 'q') ADVANCE(12);
      END_STATE();
    case 10:
      if (lookahead == 'r') ADVANCE(6);
      END_STATE();
    case 11:
      if (lookahead == 'r') ADVANCE(7);
      END_STATE();
    case 12:
      if (lookahead == 'u') ADVANCE(8);
      END_STATE();
    case 13:
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(35);
      END_STATE();
    case 14:
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(15);
      END_STATE();
    case 15:
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(15);
      if (('a' <= lookahead && lookahead <= 'z')) ADVANCE(31);
      END_STATE();
    case 16:
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'F')) ADVANCE(34);
      END_STATE();
    case 17:
      if (eof) ADVANCE(18);
      if (lookahead == '%') ADVANCE(20);
      if (lookahead == '(') ADVANCE(28);
      if (lookahead == ')') ADVANCE(29);
      if (lookahead == '-') ADVANCE(4);
      if (lookahead == '.') ADVANCE(13);
      if (lookahead == '0') ADVANCE(32);
      if (lookahead == '=') ADVANCE(26);
      if (lookahead == '@') ADVANCE(10);
      if (lookahead == '\\') ADVANCE(2);
      if (lookahead == '{') ADVANCE(36);
      if (lookahead == '}') ADVANCE(37);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') ADVANCE(22);
      if (('1' <= lookahead && lookahead <= '9')) ADVANCE(33);
      if (('a' <= lookahead && lookahead <= 'z')) ADVANCE(27);
      END_STATE();
    case 18:
      ACCEPT_TOKEN(ts_builtin_sym_end);
      END_STATE();
    case 19:
      ACCEPT_TOKEN(sym_comment);
      if (lookahead == '\r') ADVANCE(20);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(19);
      END_STATE();
    case 20:
      ACCEPT_TOKEN(sym_comment);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(20);
      END_STATE();
    case 21:
      ACCEPT_TOKEN(anon_sym_ATrequire_COLON);
      END_STATE();
    case 22:
      ACCEPT_TOKEN(aux_sym_header_require_token1);
      END_STATE();
    case 23:
      ACCEPT_TOKEN(aux_sym_header_require_token1);
      if (lookahead != 0 &&
          lookahead != '\n' &&
          lookahead != '\r') ADVANCE(25);
      END_STATE();
    case 24:
      ACCEPT_TOKEN(anon_sym_LF);
      END_STATE();
    case 25:
      ACCEPT_TOKEN(sym_pkgname);
      if (lookahead != 0 &&
          lookahead != '\n' &&
          lookahead != '\r') ADVANCE(25);
      END_STATE();
    case 26:
      ACCEPT_TOKEN(anon_sym_EQ);
      END_STATE();
    case 27:
      ACCEPT_TOKEN(sym_identifier);
      if (lookahead == '-' ||
          ('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(27);
      END_STATE();
    case 28:
      ACCEPT_TOKEN(anon_sym_LPAREN);
      END_STATE();
    case 29:
      ACCEPT_TOKEN(anon_sym_RPAREN);
      END_STATE();
    case 30:
      ACCEPT_TOKEN(sym_literal_length);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'F')) ADVANCE(34);
      if (('a' <= lookahead && lookahead <= 'z')) ADVANCE(31);
      END_STATE();
    case 31:
      ACCEPT_TOKEN(sym_literal_length);
      if (('a' <= lookahead && lookahead <= 'z')) ADVANCE(31);
      END_STATE();
    case 32:
      ACCEPT_TOKEN(sym_literal_int);
      if (lookahead == '.') ADVANCE(35);
      if (lookahead == 'X') ADVANCE(16);
      if (lookahead == 'x') ADVANCE(30);
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(33);
      if (('a' <= lookahead && lookahead <= 'z')) ADVANCE(31);
      END_STATE();
    case 33:
      ACCEPT_TOKEN(sym_literal_int);
      if (lookahead == '.') ADVANCE(35);
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(33);
      if (('a' <= lookahead && lookahead <= 'z')) ADVANCE(31);
      END_STATE();
    case 34:
      ACCEPT_TOKEN(sym_literal_int);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'F')) ADVANCE(34);
      END_STATE();
    case 35:
      ACCEPT_TOKEN(sym_literal_float);
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(35);
      if (('a' <= lookahead && lookahead <= 'z')) ADVANCE(31);
      END_STATE();
    case 36:
      ACCEPT_TOKEN(anon_sym_LBRACE);
      END_STATE();
    case 37:
      ACCEPT_TOKEN(anon_sym_RBRACE);
      END_STATE();
    case 38:
      ACCEPT_TOKEN(anon_sym_BSLASH_BSLASH);
      END_STATE();
    case 39:
      ACCEPT_TOKEN(anon_sym_BSLASH_STAR);
      END_STATE();
    case 40:
      ACCEPT_TOKEN(anon_sym_BSLASH_PIPE);
      END_STATE();
    case 41:
      ACCEPT_TOKEN(anon_sym_BSLASH_LBRACE);
      END_STATE();
    case 42:
      ACCEPT_TOKEN(anon_sym_BSLASH_RBRACE);
      END_STATE();
    default:
      return false;
  }
}

static bool ts_lex_keywords(TSLexer *lexer, TSStateId state) {
  START_LEXER();
  eof = lexer->eof(lexer);
  switch (state) {
    case 0:
      if (lookahead == 'f') ADVANCE(1);
      if (lookahead == 'i') ADVANCE(2);
      if (lookahead == 'l') ADVANCE(3);
      if (lookahead == 't') ADVANCE(4);
      END_STATE();
    case 1:
      if (lookahead == 'a') ADVANCE(5);
      END_STATE();
    case 2:
      if (lookahead == 'n') ADVANCE(6);
      END_STATE();
    case 3:
      if (lookahead == 'e') ADVANCE(7);
      END_STATE();
    case 4:
      if (lookahead == 'r') ADVANCE(8);
      END_STATE();
    case 5:
      if (lookahead == 'l') ADVANCE(9);
      END_STATE();
    case 6:
      ACCEPT_TOKEN(anon_sym_in);
      END_STATE();
    case 7:
      if (lookahead == 't') ADVANCE(10);
      END_STATE();
    case 8:
      if (lookahead == 'u') ADVANCE(11);
      END_STATE();
    case 9:
      if (lookahead == 's') ADVANCE(12);
      END_STATE();
    case 10:
      ACCEPT_TOKEN(anon_sym_let);
      END_STATE();
    case 11:
      if (lookahead == 'e') ADVANCE(13);
      END_STATE();
    case 12:
      if (lookahead == 'e') ADVANCE(14);
      END_STATE();
    case 13:
      ACCEPT_TOKEN(anon_sym_true);
      END_STATE();
    case 14:
      ACCEPT_TOKEN(anon_sym_false);
      END_STATE();
    default:
      return false;
  }
}

static const TSLexMode ts_lex_modes[STATE_COUNT] = {
  [0] = {.lex_state = 0, .external_lex_state = 1},
  [1] = {.lex_state = 17, .external_lex_state = 2},
  [2] = {.lex_state = 17, .external_lex_state = 2},
  [3] = {.lex_state = 17, .external_lex_state = 2},
  [4] = {.lex_state = 17, .external_lex_state = 2},
  [5] = {.lex_state = 17, .external_lex_state = 2},
  [6] = {.lex_state = 17, .external_lex_state = 2},
  [7] = {.lex_state = 17, .external_lex_state = 2},
  [8] = {.lex_state = 17, .external_lex_state = 2},
  [9] = {.lex_state = 17, .external_lex_state = 2},
  [10] = {.lex_state = 17, .external_lex_state = 3},
  [11] = {.lex_state = 17, .external_lex_state = 3},
  [12] = {.lex_state = 17, .external_lex_state = 3},
  [13] = {.lex_state = 17, .external_lex_state = 3},
  [14] = {.lex_state = 1},
  [15] = {.lex_state = 17},
  [16] = {.lex_state = 17},
  [17] = {.lex_state = 1},
  [18] = {.lex_state = 1},
  [19] = {.lex_state = 17},
  [20] = {.lex_state = 17},
  [21] = {.lex_state = 17},
  [22] = {.lex_state = 17},
  [23] = {.lex_state = 17},
  [24] = {.lex_state = 0},
  [25] = {.lex_state = 17},
  [26] = {.lex_state = 0},
  [27] = {.lex_state = 17},
  [28] = {.lex_state = 17},
  [29] = {.lex_state = 17},
  [30] = {.lex_state = 17},
  [31] = {.lex_state = 17},
};

enum {
  ts_external_token_literal_string = 0,
  ts_external_token_inline_token = 1,
};

static const TSSymbol ts_external_scanner_symbol_map[EXTERNAL_TOKEN_COUNT] = {
  [ts_external_token_literal_string] = sym_literal_string,
  [ts_external_token_inline_token] = sym_inline_token,
};

static const bool ts_external_scanner_states[4][EXTERNAL_TOKEN_COUNT] = {
  [1] = {
    [ts_external_token_literal_string] = true,
    [ts_external_token_inline_token] = true,
  },
  [2] = {
    [ts_external_token_literal_string] = true,
  },
  [3] = {
    [ts_external_token_inline_token] = true,
  },
};

static const uint16_t ts_parse_table[LARGE_STATE_COUNT][SYMBOL_COUNT] = {
  [0] = {
    [ts_builtin_sym_end] = ACTIONS(1),
    [sym_identifier] = ACTIONS(1),
    [sym_comment] = ACTIONS(3),
    [anon_sym_ATrequire_COLON] = ACTIONS(1),
    [aux_sym_header_require_token1] = ACTIONS(5),
    [anon_sym_LF] = ACTIONS(1),
    [anon_sym_let] = ACTIONS(1),
    [anon_sym_EQ] = ACTIONS(1),
    [anon_sym_in] = ACTIONS(1),
    [anon_sym_LPAREN] = ACTIONS(1),
    [anon_sym_RPAREN] = ACTIONS(1),
    [anon_sym_true] = ACTIONS(1),
    [anon_sym_false] = ACTIONS(1),
    [sym_literal_length] = ACTIONS(1),
    [sym_literal_int] = ACTIONS(1),
    [sym_literal_float] = ACTIONS(1),
    [anon_sym_LBRACE] = ACTIONS(1),
    [anon_sym_RBRACE] = ACTIONS(1),
    [anon_sym_BSLASH_BSLASH] = ACTIONS(1),
    [anon_sym_BSLASH_STAR] = ACTIONS(1),
    [anon_sym_BSLASH_PIPE] = ACTIONS(1),
    [anon_sym_BSLASH_LBRACE] = ACTIONS(1),
    [anon_sym_BSLASH_RBRACE] = ACTIONS(1),
    [sym_literal_string] = ACTIONS(1),
    [sym_inline_token] = ACTIONS(1),
  },
  [1] = {
    [sym_source_file] = STATE(28),
    [sym_program_saty] = STATE(27),
    [sym_headers] = STATE(4),
    [sym_header] = STATE(6),
    [sym_header_require] = STATE(9),
    [sym__expr] = STATE(25),
    [sym_bind_stmt] = STATE(25),
    [sym__unary] = STATE(25),
    [sym__literal] = STATE(25),
    [sym_literal_unit] = STATE(25),
    [sym_literal_bool] = STATE(25),
    [sym_inline_text] = STATE(25),
    [aux_sym_headers_repeat1] = STATE(6),
    [sym_identifier] = ACTIONS(7),
    [sym_comment] = ACTIONS(3),
    [anon_sym_ATrequire_COLON] = ACTIONS(9),
    [aux_sym_header_require_token1] = ACTIONS(3),
    [anon_sym_let] = ACTIONS(11),
    [anon_sym_LPAREN] = ACTIONS(13),
    [anon_sym_true] = ACTIONS(15),
    [anon_sym_false] = ACTIONS(15),
    [sym_literal_length] = ACTIONS(7),
    [sym_literal_int] = ACTIONS(7),
    [sym_literal_float] = ACTIONS(7),
    [anon_sym_LBRACE] = ACTIONS(17),
    [sym_literal_string] = ACTIONS(19),
  },
};

static const uint16_t ts_small_parse_table[] = {
  [0] = 8,
    ACTIONS(11), 1,
      anon_sym_let,
    ACTIONS(13), 1,
      anon_sym_LPAREN,
    ACTIONS(17), 1,
      anon_sym_LBRACE,
    ACTIONS(23), 1,
      sym_literal_string,
    ACTIONS(3), 2,
      sym_comment,
      aux_sym_header_require_token1,
    ACTIONS(15), 2,
      anon_sym_true,
      anon_sym_false,
    ACTIONS(21), 4,
      sym_identifier,
      sym_literal_length,
      sym_literal_int,
      sym_literal_float,
    STATE(21), 7,
      sym__expr,
      sym_bind_stmt,
      sym__unary,
      sym__literal,
      sym_literal_unit,
      sym_literal_bool,
      sym_inline_text,
  [36] = 8,
    ACTIONS(11), 1,
      anon_sym_let,
    ACTIONS(13), 1,
      anon_sym_LPAREN,
    ACTIONS(17), 1,
      anon_sym_LBRACE,
    ACTIONS(27), 1,
      sym_literal_string,
    ACTIONS(3), 2,
      sym_comment,
      aux_sym_header_require_token1,
    ACTIONS(15), 2,
      anon_sym_true,
      anon_sym_false,
    ACTIONS(25), 4,
      sym_identifier,
      sym_literal_length,
      sym_literal_int,
      sym_literal_float,
    STATE(30), 7,
      sym__expr,
      sym_bind_stmt,
      sym__unary,
      sym__literal,
      sym_literal_unit,
      sym_literal_bool,
      sym_inline_text,
  [72] = 8,
    ACTIONS(11), 1,
      anon_sym_let,
    ACTIONS(13), 1,
      anon_sym_LPAREN,
    ACTIONS(17), 1,
      anon_sym_LBRACE,
    ACTIONS(31), 1,
      sym_literal_string,
    ACTIONS(3), 2,
      sym_comment,
      aux_sym_header_require_token1,
    ACTIONS(15), 2,
      anon_sym_true,
      anon_sym_false,
    ACTIONS(29), 4,
      sym_identifier,
      sym_literal_length,
      sym_literal_int,
      sym_literal_float,
    STATE(23), 7,
      sym__expr,
      sym_bind_stmt,
      sym__unary,
      sym__literal,
      sym_literal_unit,
      sym_literal_bool,
      sym_inline_text,
  [108] = 6,
    ACTIONS(35), 1,
      anon_sym_ATrequire_COLON,
    STATE(9), 1,
      sym_header_require,
    ACTIONS(3), 2,
      sym_comment,
      aux_sym_header_require_token1,
    STATE(5), 2,
      sym_header,
      aux_sym_headers_repeat1,
    ACTIONS(38), 3,
      sym_literal_string,
      anon_sym_LPAREN,
      anon_sym_LBRACE,
    ACTIONS(33), 7,
      anon_sym_let,
      sym_identifier,
      anon_sym_true,
      anon_sym_false,
      sym_literal_length,
      sym_literal_int,
      sym_literal_float,
  [137] = 6,
    ACTIONS(9), 1,
      anon_sym_ATrequire_COLON,
    STATE(9), 1,
      sym_header_require,
    ACTIONS(3), 2,
      sym_comment,
      aux_sym_header_require_token1,
    STATE(5), 2,
      sym_header,
      aux_sym_headers_repeat1,
    ACTIONS(42), 3,
      sym_literal_string,
      anon_sym_LPAREN,
      anon_sym_LBRACE,
    ACTIONS(40), 7,
      anon_sym_let,
      sym_identifier,
      anon_sym_true,
      anon_sym_false,
      sym_literal_length,
      sym_literal_int,
      sym_literal_float,
  [166] = 3,
    ACTIONS(3), 2,
      sym_comment,
      aux_sym_header_require_token1,
    ACTIONS(46), 4,
      sym_literal_string,
      anon_sym_ATrequire_COLON,
      anon_sym_LPAREN,
      anon_sym_LBRACE,
    ACTIONS(44), 7,
      anon_sym_let,
      sym_identifier,
      anon_sym_true,
      anon_sym_false,
      sym_literal_length,
      sym_literal_int,
      sym_literal_float,
  [186] = 3,
    ACTIONS(3), 2,
      sym_comment,
      aux_sym_header_require_token1,
    ACTIONS(50), 4,
      sym_literal_string,
      anon_sym_ATrequire_COLON,
      anon_sym_LPAREN,
      anon_sym_LBRACE,
    ACTIONS(48), 7,
      anon_sym_let,
      sym_identifier,
      anon_sym_true,
      anon_sym_false,
      sym_literal_length,
      sym_literal_int,
      sym_literal_float,
  [206] = 3,
    ACTIONS(3), 2,
      sym_comment,
      aux_sym_header_require_token1,
    ACTIONS(54), 4,
      sym_literal_string,
      anon_sym_ATrequire_COLON,
      anon_sym_LPAREN,
      anon_sym_LBRACE,
    ACTIONS(52), 7,
      anon_sym_let,
      sym_identifier,
      anon_sym_true,
      anon_sym_false,
      sym_literal_length,
      sym_literal_int,
      sym_literal_float,
  [226] = 5,
    ACTIONS(56), 1,
      anon_sym_RBRACE,
    ACTIONS(61), 1,
      sym_inline_token,
    ACTIONS(3), 2,
      sym_comment,
      aux_sym_header_require_token1,
    STATE(10), 2,
      sym_inline_literal_escaped,
      aux_sym_inline_text_repeat1,
    ACTIONS(58), 5,
      anon_sym_BSLASH_BSLASH,
      anon_sym_BSLASH_STAR,
      anon_sym_BSLASH_PIPE,
      anon_sym_BSLASH_LBRACE,
      anon_sym_BSLASH_RBRACE,
  [248] = 5,
    ACTIONS(64), 1,
      anon_sym_RBRACE,
    ACTIONS(68), 1,
      sym_inline_token,
    ACTIONS(3), 2,
      sym_comment,
      aux_sym_header_require_token1,
    STATE(12), 2,
      sym_inline_literal_escaped,
      aux_sym_inline_text_repeat1,
    ACTIONS(66), 5,
      anon_sym_BSLASH_BSLASH,
      anon_sym_BSLASH_STAR,
      anon_sym_BSLASH_PIPE,
      anon_sym_BSLASH_LBRACE,
      anon_sym_BSLASH_RBRACE,
  [270] = 5,
    ACTIONS(70), 1,
      anon_sym_RBRACE,
    ACTIONS(72), 1,
      sym_inline_token,
    ACTIONS(3), 2,
      sym_comment,
      aux_sym_header_require_token1,
    STATE(10), 2,
      sym_inline_literal_escaped,
      aux_sym_inline_text_repeat1,
    ACTIONS(66), 5,
      anon_sym_BSLASH_BSLASH,
      anon_sym_BSLASH_STAR,
      anon_sym_BSLASH_PIPE,
      anon_sym_BSLASH_LBRACE,
      anon_sym_BSLASH_RBRACE,
  [292] = 2,
    ACTIONS(3), 2,
      sym_comment,
      aux_sym_header_require_token1,
    ACTIONS(74), 7,
      sym_inline_token,
      anon_sym_RBRACE,
      anon_sym_BSLASH_BSLASH,
      anon_sym_BSLASH_STAR,
      anon_sym_BSLASH_PIPE,
      anon_sym_BSLASH_LBRACE,
      anon_sym_BSLASH_RBRACE,
  [306] = 4,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(76), 1,
      aux_sym_header_require_token1,
    ACTIONS(79), 1,
      sym_pkgname,
    STATE(14), 1,
      aux_sym_header_require_repeat1,
  [319] = 2,
    ACTIONS(3), 2,
      sym_comment,
      aux_sym_header_require_token1,
    ACTIONS(81), 2,
      ts_builtin_sym_end,
      anon_sym_in,
  [328] = 2,
    ACTIONS(3), 2,
      sym_comment,
      aux_sym_header_require_token1,
    ACTIONS(83), 2,
      ts_builtin_sym_end,
      anon_sym_in,
  [337] = 4,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(85), 1,
      aux_sym_header_require_token1,
    ACTIONS(87), 1,
      sym_pkgname,
    STATE(18), 1,
      aux_sym_header_require_repeat1,
  [350] = 4,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(89), 1,
      aux_sym_header_require_token1,
    ACTIONS(91), 1,
      sym_pkgname,
    STATE(14), 1,
      aux_sym_header_require_repeat1,
  [363] = 2,
    ACTIONS(3), 2,
      sym_comment,
      aux_sym_header_require_token1,
    ACTIONS(93), 2,
      ts_builtin_sym_end,
      anon_sym_in,
  [372] = 2,
    ACTIONS(3), 2,
      sym_comment,
      aux_sym_header_require_token1,
    ACTIONS(95), 2,
      ts_builtin_sym_end,
      anon_sym_in,
  [381] = 2,
    ACTIONS(3), 2,
      sym_comment,
      aux_sym_header_require_token1,
    ACTIONS(97), 2,
      ts_builtin_sym_end,
      anon_sym_in,
  [390] = 2,
    ACTIONS(99), 1,
      anon_sym_EQ,
    ACTIONS(3), 2,
      sym_comment,
      aux_sym_header_require_token1,
  [398] = 2,
    ACTIONS(101), 1,
      ts_builtin_sym_end,
    ACTIONS(3), 2,
      sym_comment,
      aux_sym_header_require_token1,
  [406] = 3,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(5), 1,
      aux_sym_header_require_token1,
    ACTIONS(103), 1,
      anon_sym_LF,
  [416] = 2,
    ACTIONS(105), 1,
      ts_builtin_sym_end,
    ACTIONS(3), 2,
      sym_comment,
      aux_sym_header_require_token1,
  [424] = 3,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(5), 1,
      aux_sym_header_require_token1,
    ACTIONS(107), 1,
      anon_sym_LF,
  [434] = 2,
    ACTIONS(109), 1,
      ts_builtin_sym_end,
    ACTIONS(3), 2,
      sym_comment,
      aux_sym_header_require_token1,
  [442] = 2,
    ACTIONS(111), 1,
      ts_builtin_sym_end,
    ACTIONS(3), 2,
      sym_comment,
      aux_sym_header_require_token1,
  [450] = 2,
    ACTIONS(113), 1,
      anon_sym_RPAREN,
    ACTIONS(3), 2,
      sym_comment,
      aux_sym_header_require_token1,
  [458] = 2,
    ACTIONS(115), 1,
      anon_sym_in,
    ACTIONS(3), 2,
      sym_comment,
      aux_sym_header_require_token1,
  [466] = 2,
    ACTIONS(117), 1,
      sym_identifier,
    ACTIONS(3), 2,
      sym_comment,
      aux_sym_header_require_token1,
};

static const uint32_t ts_small_parse_table_map[] = {
  [SMALL_STATE(2)] = 0,
  [SMALL_STATE(3)] = 36,
  [SMALL_STATE(4)] = 72,
  [SMALL_STATE(5)] = 108,
  [SMALL_STATE(6)] = 137,
  [SMALL_STATE(7)] = 166,
  [SMALL_STATE(8)] = 186,
  [SMALL_STATE(9)] = 206,
  [SMALL_STATE(10)] = 226,
  [SMALL_STATE(11)] = 248,
  [SMALL_STATE(12)] = 270,
  [SMALL_STATE(13)] = 292,
  [SMALL_STATE(14)] = 306,
  [SMALL_STATE(15)] = 319,
  [SMALL_STATE(16)] = 328,
  [SMALL_STATE(17)] = 337,
  [SMALL_STATE(18)] = 350,
  [SMALL_STATE(19)] = 363,
  [SMALL_STATE(20)] = 372,
  [SMALL_STATE(21)] = 381,
  [SMALL_STATE(22)] = 390,
  [SMALL_STATE(23)] = 398,
  [SMALL_STATE(24)] = 406,
  [SMALL_STATE(25)] = 416,
  [SMALL_STATE(26)] = 424,
  [SMALL_STATE(27)] = 434,
  [SMALL_STATE(28)] = 442,
  [SMALL_STATE(29)] = 450,
  [SMALL_STATE(30)] = 458,
  [SMALL_STATE(31)] = 466,
};

static const TSParseActionEntry ts_parse_actions[] = {
  [0] = {.entry = {.count = 0, .reusable = false}},
  [1] = {.entry = {.count = 1, .reusable = false}}, RECOVER(),
  [3] = {.entry = {.count = 1, .reusable = true}}, SHIFT_EXTRA(),
  [5] = {.entry = {.count = 1, .reusable = false}}, SHIFT_EXTRA(),
  [7] = {.entry = {.count = 1, .reusable = false}}, SHIFT(25),
  [9] = {.entry = {.count = 1, .reusable = true}}, SHIFT(17),
  [11] = {.entry = {.count = 1, .reusable = false}}, SHIFT(31),
  [13] = {.entry = {.count = 1, .reusable = true}}, SHIFT(29),
  [15] = {.entry = {.count = 1, .reusable = false}}, SHIFT(20),
  [17] = {.entry = {.count = 1, .reusable = true}}, SHIFT(11),
  [19] = {.entry = {.count = 1, .reusable = true}}, SHIFT(25),
  [21] = {.entry = {.count = 1, .reusable = false}}, SHIFT(21),
  [23] = {.entry = {.count = 1, .reusable = true}}, SHIFT(21),
  [25] = {.entry = {.count = 1, .reusable = false}}, SHIFT(30),
  [27] = {.entry = {.count = 1, .reusable = true}}, SHIFT(30),
  [29] = {.entry = {.count = 1, .reusable = false}}, SHIFT(23),
  [31] = {.entry = {.count = 1, .reusable = true}}, SHIFT(23),
  [33] = {.entry = {.count = 1, .reusable = false}}, REDUCE(aux_sym_headers_repeat1, 2),
  [35] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_headers_repeat1, 2), SHIFT_REPEAT(17),
  [38] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_headers_repeat1, 2),
  [40] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_headers, 1),
  [42] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_headers, 1),
  [44] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_header_require, 4, .production_id = 4),
  [46] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_header_require, 4, .production_id = 4),
  [48] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_header_require, 3, .production_id = 3),
  [50] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_header_require, 3, .production_id = 3),
  [52] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_header, 1),
  [54] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_header, 1),
  [56] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_inline_text_repeat1, 2),
  [58] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_inline_text_repeat1, 2), SHIFT_REPEAT(13),
  [61] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_inline_text_repeat1, 2), SHIFT_REPEAT(10),
  [64] = {.entry = {.count = 1, .reusable = true}}, SHIFT(16),
  [66] = {.entry = {.count = 1, .reusable = true}}, SHIFT(13),
  [68] = {.entry = {.count = 1, .reusable = true}}, SHIFT(12),
  [70] = {.entry = {.count = 1, .reusable = true}}, SHIFT(19),
  [72] = {.entry = {.count = 1, .reusable = true}}, SHIFT(10),
  [74] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_inline_literal_escaped, 1),
  [76] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_header_require_repeat1, 2), SHIFT_REPEAT(14),
  [79] = {.entry = {.count = 1, .reusable = false}}, REDUCE(aux_sym_header_require_repeat1, 2),
  [81] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_literal_unit, 2),
  [83] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_inline_text, 2),
  [85] = {.entry = {.count = 1, .reusable = false}}, SHIFT(18),
  [87] = {.entry = {.count = 1, .reusable = false}}, SHIFT(24),
  [89] = {.entry = {.count = 1, .reusable = false}}, SHIFT(14),
  [91] = {.entry = {.count = 1, .reusable = false}}, SHIFT(26),
  [93] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_inline_text, 3),
  [95] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_literal_bool, 1),
  [97] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_bind_stmt, 6, .production_id = 5),
  [99] = {.entry = {.count = 1, .reusable = true}}, SHIFT(3),
  [101] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_program_saty, 2, .production_id = 2),
  [103] = {.entry = {.count = 1, .reusable = true}}, SHIFT(8),
  [105] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_program_saty, 1, .production_id = 1),
  [107] = {.entry = {.count = 1, .reusable = true}}, SHIFT(7),
  [109] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_source_file, 1),
  [111] = {.entry = {.count = 1, .reusable = true}},  ACCEPT_INPUT(),
  [113] = {.entry = {.count = 1, .reusable = true}}, SHIFT(15),
  [115] = {.entry = {.count = 1, .reusable = true}}, SHIFT(2),
  [117] = {.entry = {.count = 1, .reusable = true}}, SHIFT(22),
};

#ifdef __cplusplus
extern "C" {
#endif
void *tree_sitter_satysfi_external_scanner_create(void);
void tree_sitter_satysfi_external_scanner_destroy(void *);
bool tree_sitter_satysfi_external_scanner_scan(void *, TSLexer *, const bool *);
unsigned tree_sitter_satysfi_external_scanner_serialize(void *, char *);
void tree_sitter_satysfi_external_scanner_deserialize(void *, const char *, unsigned);

#ifdef _WIN32
#define extern __declspec(dllexport)
#endif

extern const TSLanguage *tree_sitter_satysfi(void) {
  static const TSLanguage language = {
    .version = LANGUAGE_VERSION,
    .symbol_count = SYMBOL_COUNT,
    .alias_count = ALIAS_COUNT,
    .token_count = TOKEN_COUNT,
    .external_token_count = EXTERNAL_TOKEN_COUNT,
    .state_count = STATE_COUNT,
    .large_state_count = LARGE_STATE_COUNT,
    .production_id_count = PRODUCTION_ID_COUNT,
    .field_count = FIELD_COUNT,
    .max_alias_sequence_length = MAX_ALIAS_SEQUENCE_LENGTH,
    .parse_table = &ts_parse_table[0][0],
    .small_parse_table = ts_small_parse_table,
    .small_parse_table_map = ts_small_parse_table_map,
    .parse_actions = ts_parse_actions,
    .symbol_names = ts_symbol_names,
    .field_names = ts_field_names,
    .field_map_slices = ts_field_map_slices,
    .field_map_entries = ts_field_map_entries,
    .symbol_metadata = ts_symbol_metadata,
    .public_symbol_map = ts_symbol_map,
    .alias_map = ts_non_terminal_alias_map,
    .alias_sequences = &ts_alias_sequences[0][0],
    .lex_modes = ts_lex_modes,
    .lex_fn = ts_lex,
    .keyword_lex_fn = ts_lex_keywords,
    .keyword_capture_token = sym_identifier,
    .external_scanner = {
      &ts_external_scanner_states[0][0],
      ts_external_scanner_symbol_map,
      tree_sitter_satysfi_external_scanner_create,
      tree_sitter_satysfi_external_scanner_destroy,
      tree_sitter_satysfi_external_scanner_scan,
      tree_sitter_satysfi_external_scanner_serialize,
      tree_sitter_satysfi_external_scanner_deserialize,
    },
  };
  return &language;
}
#ifdef __cplusplus
}
#endif
