import { TokenType, type Token } from '../token';
import { type TokenTree } from './tree_types';
import assert from 'assert';
import { tokenize } from '../lexer/lexer';

/**
 * Parse a sequence of tokens to a tree of tokens
 * @param tokenList an array of tokens to parse
 * @returns a program tree
 */
export function getTokenTree(tokenList: Token[]): TokenTree {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return new Parser(tokenList)
    .getGrouping();
}

class Parser {
  private readonly tokens: Token[];
  tree: TokenTree | undefined;
  cursor: number = 0;

  constructor(tokens: Token[]) {
    // This is because the lexer automatically omits the first bracket (and this makes the parser more robust in tests).
    if (tokens[0].type !== TokenType.Lpar) {
      tokens.unshift(tokenize('(')[0]);
    }
    this.tokens = tokens;
  }

  private peek(): Token {
    return this.tokens[this.cursor];
  }

  private read(): Token {
    return this.tokens[this.cursor++];
  }

  private peekOffset(i: number): Token {
    assert(this.cursor + i >= 0 && this.cursor + i < this.tokens.length);
    return this.tokens[this.cursor + i];
  }

  private isEof(): boolean {
    return this.cursor >= this.tokens.length;
  }

  getGrouping(): TokenTree {
    const tree: TokenTree = [];
    while (!this.isEof()) {
      const token = this.read();
      if (token.lexeme === 'f64.const') {
        console.log(token);
        console.log(`
          ${token.lexeme}
          ${token.opcodeType !== null}
          ${token.getOpcodeParamLength()}
        `);
      }
      if (token.type === TokenType.Lpar) {
        tree.push(this.getGrouping());
      } else if (token.type === TokenType.Rpar) {
        return tree;
      } else {
        tree.push(token);
      }
    }

    return tree;
  }
}
