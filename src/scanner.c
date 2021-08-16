#include <tree_sitter/parser.h>
#include <stdio.h>
#include <wctype.h>

enum TokenType {
  LITERAL_STRING,
  INLINE_TOKEN,
};

void *tree_sitter_satysfi_external_scanner_create() { return NULL; }
void tree_sitter_satysfi_external_scanner_destroy(void *p) {}
void tree_sitter_satysfi_external_scanner_reset(void *p) {}
unsigned tree_sitter_satysfi_external_scanner_serialize(void *p, char *buffer) { return 0; }
void tree_sitter_satysfi_external_scanner_deserialize(void *p, const char *b, unsigned n) {}

static void advance(TSLexer *lexer) {
  lexer->advance(lexer, false);
}

bool tree_sitter_satysfi_external_scanner_scan(void *payload, TSLexer *lexer,
                                            const bool *valid_symbols) {
    if (valid_symbols[LITERAL_STRING]
            && (lexer->lookahead == '#' || lexer->lookahead == '`')) {
        lexer->result_symbol = LITERAL_STRING;

        if (lexer->lookahead == '#') {
            advance(lexer);
        }

        unsigned opening_backquote_count = 0;
        while(lexer->lookahead == '`') {
            advance(lexer);
            opening_backquote_count++;
        }
        if (opening_backquote_count == 0) {
            // '#' しかなかった場合
            return false;
        }

        for(;;) {
            if (lexer->lookahead == 0) {
                return false;
            } else if (lexer->lookahead=='`') {
                advance(lexer);
                unsigned backquote_count = 1;
                while(lexer->lookahead == '`') {
                    advance(lexer);
                    backquote_count++;
                }
                if (backquote_count == opening_backquote_count) {
                    // 終端 # があれば読む
                    if (lexer->lookahead == '#') {
                        advance(lexer);
                    }
                    return true;
                } else if (backquote_count > opening_backquote_count) {
                    return false;
                }
            } else {
                advance(lexer);
            }
        }
    }

    if (valid_symbols[INLINE_TOKEN]) {
        lexer->result_symbol = INLINE_TOKEN;
        for (bool has_content = false;; has_content = true) {
            lexer->mark_end(lexer);
            switch(lexer->lookahead) {
                case '}':
                case '\\':
                case '#':
                case '|':
                case '*':
                case '%':
                    return has_content;
                case '\0':
                    return false;
                default:
                    advance(lexer);
            }
        }

    }

    return false;
}
