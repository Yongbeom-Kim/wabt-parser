import { tokenize } from '../../src/lexer/lexer';
import { TokenData } from '../resources/resolved_tokens';
import {
  simple_addition_sexpr,
  simple_addition_stack,
  nested_addition_stack,
  nested_addition_sexpr,
  simple_function_sexpr_with_param_names,
  simple_add_function_no_param_names,
} from '../resources/program_fragments';

test('tokenize simple_addition_sexpr', () => {
  const tokens = tokenize(simple_addition_sexpr.str)
    .map(TokenData.fromToken);
  const expectedTokenData = simple_addition_sexpr.tokens.map(TokenData.fromToken);
  expect(tokens)
    .toEqual(expectedTokenData);
});

test('tokenize simple_addition_stack', () => {
  const tokens = tokenize(simple_addition_stack.str)
    .map(TokenData.fromToken);
  const expectedTokenData = simple_addition_stack.tokens.map(TokenData.fromToken);
  expect(tokens)
    .toEqual(expectedTokenData);
});

test('tokenize nested_addition_stack', () => {
  const tokens = tokenize(nested_addition_stack.str)
    .map(TokenData.fromToken);
  const expectedTokenData = nested_addition_stack.tokens.map(TokenData.fromToken);
  expect(tokens)
    .toEqual(expectedTokenData);
});

test('tokenize nested_addition_sexpr', () => {
  const tokens = tokenize(nested_addition_sexpr.str)
    .map(TokenData.fromToken);
  const expectedTokenData = nested_addition_sexpr.tokens.map(TokenData.fromToken);
  expect(tokens)
    .toEqual(expectedTokenData);
});

test('tokenize simple_function_sexpr', () => {
  const tokens = tokenize(simple_function_sexpr_with_param_names.str)
    .map(TokenData.fromToken);
  const expectedTokenData = simple_function_sexpr_with_param_names.tokens.map(TokenData.fromToken);

  expect(tokens)
    .toEqual(expectedTokenData);
});

test('tokenize simple_function_sexpr_with_param_names', () => {
  const tokens = tokenize(simple_function_sexpr_with_param_names.str)
    .map(TokenData.fromToken);
  const expectedTokenData = simple_function_sexpr_with_param_names.tokens.map(TokenData.fromToken);

  expect(tokens)
    .toEqual(expectedTokenData);
});

test('tokenize simple_add_function_no_param_names', () => {
  const tokens = tokenize(simple_add_function_no_param_names.str)
    .map(TokenData.fromToken);
  const expectedTokenData = simple_add_function_no_param_names.tokens.map(TokenData.fromToken);
  expect(tokens)
    .toEqual(expectedTokenData);
});
