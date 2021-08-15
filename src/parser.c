#include <tree_sitter/parser.h>

#if defined(__GNUC__) || defined(__clang__)
#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Wmissing-field-initializers"
#endif

#define LANGUAGE_VERSION 13
#define STATE_COUNT 20
#define LARGE_STATE_COUNT 2
#define SYMBOL_COUNT 18
#define ALIAS_COUNT 0
#define TOKEN_COUNT 9
#define EXTERNAL_TOKEN_COUNT 0
#define FIELD_COUNT 5
#define MAX_ALIAS_SEQUENCE_LENGTH 6
#define PRODUCTION_ID_COUNT 6

enum {
  sym_identifier = 1,
  sym_comment = 2,
  anon_sym_ATrequire_COLON = 3,
  anon_sym_LF = 4,
  sym_pkgname = 5,
  anon_sym_let = 6,
  anon_sym_EQ = 7,
  anon_sym_in = 8,
  sym_source_file = 9,
  sym_program_saty = 10,
  sym_headers = 11,
  sym_header = 12,
  sym__header_require = 13,
  sym_expr = 14,
  sym_bind_stmt = 15,
  sym__unary = 16,
  aux_sym_headers_repeat1 = 17,
};

static const char * const ts_symbol_names[] = {
  [ts_builtin_sym_end] = "end",
  [sym_identifier] = "identifier",
  [sym_comment] = "comment",
  [anon_sym_ATrequire_COLON] = "@require:",
  [anon_sym_LF] = "\n",
  [sym_pkgname] = "pkgname",
  [anon_sym_let] = "let",
  [anon_sym_EQ] = "=",
  [anon_sym_in] = "in",
  [sym_source_file] = "source_file",
  [sym_program_saty] = "program_saty",
  [sym_headers] = "headers",
  [sym_header] = "header",
  [sym__header_require] = "_header_require",
  [sym_expr] = "expr",
  [sym_bind_stmt] = "bind_stmt",
  [sym__unary] = "_unary",
  [aux_sym_headers_repeat1] = "headers_repeat1",
};

static const TSSymbol ts_symbol_map[] = {
  [ts_builtin_sym_end] = ts_builtin_sym_end,
  [sym_identifier] = sym_identifier,
  [sym_comment] = sym_comment,
  [anon_sym_ATrequire_COLON] = anon_sym_ATrequire_COLON,
  [anon_sym_LF] = anon_sym_LF,
  [sym_pkgname] = sym_pkgname,
  [anon_sym_let] = anon_sym_let,
  [anon_sym_EQ] = anon_sym_EQ,
  [anon_sym_in] = anon_sym_in,
  [sym_source_file] = sym_source_file,
  [sym_program_saty] = sym_program_saty,
  [sym_headers] = sym_headers,
  [sym_header] = sym_header,
  [sym__header_require] = sym__header_require,
  [sym_expr] = sym_expr,
  [sym_bind_stmt] = sym_bind_stmt,
  [sym__unary] = sym__unary,
  [aux_sym_headers_repeat1] = aux_sym_headers_repeat1,
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
  [sym__header_require] = {
    .visible = false,
    .named = true,
  },
  [sym_expr] = {
    .visible = true,
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
  [aux_sym_headers_repeat1] = {
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
  [2] = {.index = 1, .length = 1},
  [3] = {.index = 2, .length = 2},
  [4] = {.index = 4, .length = 1},
  [5] = {.index = 5, .length = 3},
};

static const TSFieldMapEntry ts_field_map_entries[] = {
  [0] =
    {field_pkgname, 0, .inherited = true},
  [1] =
    {field_expr, 0},
  [2] =
    {field_expr, 1},
    {field_headers, 0},
  [4] =
    {field_pkgname, 1},
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
      if (eof) ADVANCE(11);
      if (lookahead == '%') ADVANCE(13);
      if (lookahead == '=') ADVANCE(18);
      if (lookahead == '@') ADVANCE(8);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(0)
      if (('a' <= lookahead && lookahead <= 'z')) ADVANCE(19);
      END_STATE();
    case 1:
      if (lookahead == '\n') ADVANCE(15);
      if (lookahead == '%') ADVANCE(13);
      if (lookahead == '\t' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(1)
      END_STATE();
    case 2:
      if (lookahead == '%') ADVANCE(12);
      if (lookahead == '\t' ||
          lookahead == ' ') ADVANCE(16);
      if (lookahead == '\n' ||
          lookahead == '\r') SKIP(2)
      if (lookahead != 0) ADVANCE(17);
      END_STATE();
    case 3:
      if (lookahead == ':') ADVANCE(14);
      END_STATE();
    case 4:
      if (lookahead == 'e') ADVANCE(7);
      END_STATE();
    case 5:
      if (lookahead == 'e') ADVANCE(3);
      END_STATE();
    case 6:
      if (lookahead == 'i') ADVANCE(9);
      END_STATE();
    case 7:
      if (lookahead == 'q') ADVANCE(10);
      END_STATE();
    case 8:
      if (lookahead == 'r') ADVANCE(4);
      END_STATE();
    case 9:
      if (lookahead == 'r') ADVANCE(5);
      END_STATE();
    case 10:
      if (lookahead == 'u') ADVANCE(6);
      END_STATE();
    case 11:
      ACCEPT_TOKEN(ts_builtin_sym_end);
      END_STATE();
    case 12:
      ACCEPT_TOKEN(sym_comment);
      if (lookahead == '\r') ADVANCE(13);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(12);
      END_STATE();
    case 13:
      ACCEPT_TOKEN(sym_comment);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(13);
      END_STATE();
    case 14:
      ACCEPT_TOKEN(anon_sym_ATrequire_COLON);
      END_STATE();
    case 15:
      ACCEPT_TOKEN(anon_sym_LF);
      if (lookahead == '\n') ADVANCE(15);
      END_STATE();
    case 16:
      ACCEPT_TOKEN(sym_pkgname);
      if (lookahead == '%') ADVANCE(12);
      if (lookahead == '\t' ||
          lookahead == ' ') ADVANCE(16);
      if (lookahead != 0 &&
          lookahead != '\n' &&
          lookahead != '\r') ADVANCE(17);
      END_STATE();
    case 17:
      ACCEPT_TOKEN(sym_pkgname);
      if (lookahead != 0 &&
          lookahead != '\n' &&
          lookahead != '\r') ADVANCE(17);
      END_STATE();
    case 18:
      ACCEPT_TOKEN(anon_sym_EQ);
      END_STATE();
    case 19:
      ACCEPT_TOKEN(sym_identifier);
      if (lookahead == '-' ||
          ('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(19);
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
      if (lookahead == 'i') ADVANCE(1);
      if (lookahead == 'l') ADVANCE(2);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(0)
      END_STATE();
    case 1:
      if (lookahead == 'n') ADVANCE(3);
      END_STATE();
    case 2:
      if (lookahead == 'e') ADVANCE(4);
      END_STATE();
    case 3:
      ACCEPT_TOKEN(anon_sym_in);
      END_STATE();
    case 4:
      if (lookahead == 't') ADVANCE(5);
      END_STATE();
    case 5:
      ACCEPT_TOKEN(anon_sym_let);
      END_STATE();
    default:
      return false;
  }
}

static const TSLexMode ts_lex_modes[STATE_COUNT] = {
  [0] = {.lex_state = 0},
  [1] = {.lex_state = 0},
  [2] = {.lex_state = 0},
  [3] = {.lex_state = 0},
  [4] = {.lex_state = 0},
  [5] = {.lex_state = 0},
  [6] = {.lex_state = 0},
  [7] = {.lex_state = 0},
  [8] = {.lex_state = 0},
  [9] = {.lex_state = 0},
  [10] = {.lex_state = 0},
  [11] = {.lex_state = 2},
  [12] = {.lex_state = 0},
  [13] = {.lex_state = 0},
  [14] = {.lex_state = 0},
  [15] = {.lex_state = 0},
  [16] = {.lex_state = 1},
  [17] = {.lex_state = 0},
  [18] = {.lex_state = 0},
  [19] = {.lex_state = 0},
};

static const uint16_t ts_parse_table[LARGE_STATE_COUNT][SYMBOL_COUNT] = {
  [0] = {
    [ts_builtin_sym_end] = ACTIONS(1),
    [sym_identifier] = ACTIONS(1),
    [sym_comment] = ACTIONS(3),
    [anon_sym_ATrequire_COLON] = ACTIONS(1),
    [anon_sym_let] = ACTIONS(1),
    [anon_sym_EQ] = ACTIONS(1),
    [anon_sym_in] = ACTIONS(1),
  },
  [1] = {
    [sym_source_file] = STATE(13),
    [sym_program_saty] = STATE(14),
    [sym_headers] = STATE(4),
    [sym_header] = STATE(2),
    [sym__header_require] = STATE(7),
    [sym_expr] = STATE(15),
    [sym_bind_stmt] = STATE(9),
    [sym__unary] = STATE(9),
    [aux_sym_headers_repeat1] = STATE(2),
    [sym_identifier] = ACTIONS(5),
    [sym_comment] = ACTIONS(3),
    [anon_sym_ATrequire_COLON] = ACTIONS(7),
    [anon_sym_let] = ACTIONS(9),
  },
};

static const uint16_t ts_small_parse_table[] = {
  [0] = 5,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(7), 1,
      anon_sym_ATrequire_COLON,
    STATE(7), 1,
      sym__header_require,
    ACTIONS(11), 2,
      anon_sym_let,
      sym_identifier,
    STATE(3), 2,
      sym_header,
      aux_sym_headers_repeat1,
  [18] = 5,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(15), 1,
      anon_sym_ATrequire_COLON,
    STATE(7), 1,
      sym__header_require,
    ACTIONS(13), 2,
      anon_sym_let,
      sym_identifier,
    STATE(3), 2,
      sym_header,
      aux_sym_headers_repeat1,
  [36] = 5,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(5), 1,
      sym_identifier,
    ACTIONS(9), 1,
      anon_sym_let,
    STATE(18), 1,
      sym_expr,
    STATE(9), 2,
      sym_bind_stmt,
      sym__unary,
  [53] = 5,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(5), 1,
      sym_identifier,
    ACTIONS(9), 1,
      anon_sym_let,
    STATE(19), 1,
      sym_expr,
    STATE(9), 2,
      sym_bind_stmt,
      sym__unary,
  [70] = 5,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(5), 1,
      sym_identifier,
    ACTIONS(9), 1,
      anon_sym_let,
    STATE(10), 1,
      sym_expr,
    STATE(9), 2,
      sym_bind_stmt,
      sym__unary,
  [87] = 3,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(20), 1,
      anon_sym_ATrequire_COLON,
    ACTIONS(18), 2,
      anon_sym_let,
      sym_identifier,
  [98] = 3,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(24), 1,
      anon_sym_ATrequire_COLON,
    ACTIONS(22), 2,
      anon_sym_let,
      sym_identifier,
  [109] = 2,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(26), 2,
      ts_builtin_sym_end,
      anon_sym_in,
  [117] = 2,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(28), 2,
      ts_builtin_sym_end,
      anon_sym_in,
  [125] = 2,
    ACTIONS(30), 1,
      sym_comment,
    ACTIONS(32), 1,
      sym_pkgname,
  [132] = 2,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(34), 1,
      sym_identifier,
  [139] = 2,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(36), 1,
      ts_builtin_sym_end,
  [146] = 2,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(38), 1,
      ts_builtin_sym_end,
  [153] = 2,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(40), 1,
      ts_builtin_sym_end,
  [160] = 2,
    ACTIONS(30), 1,
      sym_comment,
    ACTIONS(42), 1,
      anon_sym_LF,
  [167] = 2,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(44), 1,
      anon_sym_EQ,
  [174] = 2,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(46), 1,
      ts_builtin_sym_end,
  [181] = 2,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(48), 1,
      anon_sym_in,
};

static const uint32_t ts_small_parse_table_map[] = {
  [SMALL_STATE(2)] = 0,
  [SMALL_STATE(3)] = 18,
  [SMALL_STATE(4)] = 36,
  [SMALL_STATE(5)] = 53,
  [SMALL_STATE(6)] = 70,
  [SMALL_STATE(7)] = 87,
  [SMALL_STATE(8)] = 98,
  [SMALL_STATE(9)] = 109,
  [SMALL_STATE(10)] = 117,
  [SMALL_STATE(11)] = 125,
  [SMALL_STATE(12)] = 132,
  [SMALL_STATE(13)] = 139,
  [SMALL_STATE(14)] = 146,
  [SMALL_STATE(15)] = 153,
  [SMALL_STATE(16)] = 160,
  [SMALL_STATE(17)] = 167,
  [SMALL_STATE(18)] = 174,
  [SMALL_STATE(19)] = 181,
};

static const TSParseActionEntry ts_parse_actions[] = {
  [0] = {.entry = {.count = 0, .reusable = false}},
  [1] = {.entry = {.count = 1, .reusable = false}}, RECOVER(),
  [3] = {.entry = {.count = 1, .reusable = true}}, SHIFT_EXTRA(),
  [5] = {.entry = {.count = 1, .reusable = false}}, SHIFT(9),
  [7] = {.entry = {.count = 1, .reusable = true}}, SHIFT(11),
  [9] = {.entry = {.count = 1, .reusable = false}}, SHIFT(12),
  [11] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_headers, 1),
  [13] = {.entry = {.count = 1, .reusable = false}}, REDUCE(aux_sym_headers_repeat1, 2),
  [15] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_headers_repeat1, 2), SHIFT_REPEAT(11),
  [18] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_header, 1, .production_id = 1),
  [20] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_header, 1, .production_id = 1),
  [22] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym__header_require, 3, .production_id = 4),
  [24] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__header_require, 3, .production_id = 4),
  [26] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_expr, 1),
  [28] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_bind_stmt, 6, .production_id = 5),
  [30] = {.entry = {.count = 1, .reusable = false}}, SHIFT_EXTRA(),
  [32] = {.entry = {.count = 1, .reusable = false}}, SHIFT(16),
  [34] = {.entry = {.count = 1, .reusable = true}}, SHIFT(17),
  [36] = {.entry = {.count = 1, .reusable = true}},  ACCEPT_INPUT(),
  [38] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_source_file, 1),
  [40] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_program_saty, 1, .production_id = 2),
  [42] = {.entry = {.count = 1, .reusable = true}}, SHIFT(8),
  [44] = {.entry = {.count = 1, .reusable = true}}, SHIFT(5),
  [46] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_program_saty, 2, .production_id = 3),
  [48] = {.entry = {.count = 1, .reusable = true}}, SHIFT(6),
};

#ifdef __cplusplus
extern "C" {
#endif
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
  };
  return &language;
}
#ifdef __cplusplus
}
#endif
