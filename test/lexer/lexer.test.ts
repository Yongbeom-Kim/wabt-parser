// import { Lexer } from '../src/lexer/lexer';
// import { TokenType } from '../src/token';

import { tokenize } from '../../src/lexer/lexer';
import { getExpectedTokenData, TokenData } from '../resources/resolved_tokens';
import {
  simple_addition_sexpr,
  simple_addition_stack,
  nested_addition_stack,
  nested_addition_sexpr,
  simple_function_sexpr,
} from '../resources/program_fragments';

test('tokenize simple_addition_sexpr', () => {
  const tokens = tokenize(simple_addition_sexpr.str)
    .map(TokenData.fromToken);
  const expectedTokenData = simple_addition_sexpr.tokens.map(getExpectedTokenData);
  expect(tokens)
    .toEqual(expectedTokenData);
});

test('tokenize simple_addition_stack', () => {
  const tokens = tokenize(simple_addition_stack.str)
    .map(TokenData.fromToken);
  const expectedTokenData = simple_addition_stack.tokens.map(getExpectedTokenData);
  expect(tokens)
    .toEqual(expectedTokenData);
});

test('tokenize nested_addition_stack', () => {
  const tokens = tokenize(nested_addition_stack.str)
    .map(TokenData.fromToken);
  const expectedTokenData = nested_addition_stack.tokens.map(getExpectedTokenData);
  expect(tokens)
    .toEqual(expectedTokenData);
});

test('tokenize nested_addition_sexpr', () => {
  const tokens = tokenize(nested_addition_sexpr.str)
    .map(TokenData.fromToken);
  const expectedTokenData = nested_addition_sexpr.tokens.map(getExpectedTokenData);
  expect(tokens)
    .toEqual(expectedTokenData);
});

test('tokenize simple_function_sexpr', () => {
  const tokens = tokenize(simple_function_sexpr.str)
    .map(TokenData.fromToken);
  const expectedTokenData = simple_function_sexpr.tokens.map(getExpectedTokenData);

  console.log(tokens);
  console.log(expectedTokenData);
  expect(tokens)
    .toEqual(expectedTokenData);
});
