#include <tree_sitter/parser.h>
#include <stdio.h>
#include <wctype.h>

enum TokenType {
  LITERAL_STRING,
  INLINE_TOKEN,
  INLINE_TOKEN_COMPOUND,
  NUMBERSIGN_AFTER_NOSPACE,
  NO_EXTRAS,
  DUMMY,
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
    if (valid_symbols[NO_EXTRAS]) {
        lexer->result_symbol = NO_EXTRAS;
        if (iswspace(lexer->lookahead) || lexer->lookahead == '#') {
            return false;
        } else {
            return true;
        }
    }

    if (valid_symbols[NUMBERSIGN_AFTER_NOSPACE] && lexer->lookahead == '#') {
        advance(lexer);
        if ((lexer->lookahead >= 'a' && lexer->lookahead <= 'z')
                || (lexer->lookahead >= 'A' && lexer->lookahead <= 'Z')) {
            lexer->result_symbol = NUMBERSIGN_AFTER_NOSPACE;
            lexer->mark_end(lexer);
            return true;
        }
        return false;
    }

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

    if (valid_symbols[INLINE_TOKEN] || valid_symbols[INLINE_TOKEN_COMPOUND]) {
        // 文法から考えて排反
        if (valid_symbols[INLINE_TOKEN]) {
            lexer->result_symbol = INLINE_TOKEN;
        } else {
            lexer->result_symbol = INLINE_TOKEN_COMPOUND;
        }
        for (bool has_content = false;; has_content = true) {
            lexer->mark_end(lexer);
            switch(lexer->lookahead) {
                case '}':
                case '\\':
                case '#':
                case '%':
                case '$':
                    return has_content;
                case '*':
                case '|':
                    if (valid_symbols[INLINE_TOKEN]) {
                        return false;
                    } else {
                        return has_content;
                    }
                case ';':
                case '{':
                case '\0':
                    return false;
                default:
                    advance(lexer);
            }
        }

    }

    return false;
}
