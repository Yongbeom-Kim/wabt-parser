import {
  type IntermediateRepresentation,
  OperationTree,
  PureUnfoldedTokenExpression,
  UnfoldedTokenExpression,
  FunctionExpression,
  ModuleExpression,
} from '../../src/parser/ir';
import { getIntermediateRepresentation } from '../../src/parser/parser';
import { isEqual as isDeepEqual, isEqual } from 'lodash';
import { expect } from '@jest/globals';
import {
  simple_add_function_no_param_names,
  simple_function_sexpr_with_param_names,
  export_func_add_by_index,
} from '../resources/program_fragments';
import { TokenData } from '../resources/resolved_tokens';
import { Token } from '../../src/common/token';
import { module_with_exported_add_function_no_names, module_with_one_simple_add_function_with_param_names } from '../resources/module_program_fragments';
import { irTestCases as tc1 } from '../resources/valid_function_body_fragments';
import { simple_addition_sexpr_without_argument_bracket_fails } from '../resources/invalid_function_body_fragments';

describe('get intermediate expression of function body expressions', () => {
  test.each(tc1)('test convert function body expressions into ir', (testCase) => {
    const tokenTree = testCase.tokenTree!;
    const ir = getIntermediateRepresentation(tokenTree);
    const expectedIR = testCase.ir!;

    expect(ir)
      .toEqual(expectedIR);
  });

  test('expect simple_addition_sexpr_without_argument_bracket_fails to throw', () => {
    const testCase = simple_addition_sexpr_without_argument_bracket_fails;
    const tokenTree = testCase.tokenTree!;
    expect(() => getIntermediateRepresentation(tokenTree))
      .toThrow();
  });
});

test('convert simple_function_sexpr_with_param_names into ir', () => {
  const tokenTree = simple_function_sexpr_with_param_names.tokenTree;
  const ir = getIntermediateRepresentation(tokenTree);
  const expectedIR = simple_function_sexpr_with_param_names.ir!;
  expect(ir)
    .toEqual(expectedIR);
});

test('convert simple_add_function_no_param_names into ir', () => {
  const tokenTree = simple_add_function_no_param_names.tokenTree;
  const ir = getIntermediateRepresentation(tokenTree);
  const expectedIR = simple_add_function_no_param_names.ir!;
  expect(ir)
    .toEqual(expectedIR);
});

test('convert export_func_add_by_index into ir', () => {
  const tokenTree = export_func_add_by_index.tokenTree;
  const ir = getIntermediateRepresentation(tokenTree);
  const expectedIR = export_func_add_by_index.ir!;
  expect(ir)
    .toEqual(expectedIR);
});

test('convert module_with_one_simple_add_function_no_param_names into ir', () => {
  const tokenTree = module_with_one_simple_add_function_with_param_names.tokenTree;
  const ir = getIntermediateRepresentation(tokenTree);
  const expectedIR = module_with_one_simple_add_function_with_param_names.ir;
  expect(ir)
    .toEqual(expectedIR);
});

test('convert module_with_exported_add_function_no_names into ir', () => {
  const tokenTree = module_with_exported_add_function_no_names.tokenTree;
  const ir = getIntermediateRepresentation(tokenTree);
  const expectedIR = module_with_exported_add_function_no_names.ir;
  expect(ir)
    .toEqual(expectedIR);
});



/**
 * Custom equality comparison between tokens/intermediate representations for testing purposes
 * @param lhs to compare
 * @param rhs to compare
 * @returns true if equal
 */
// eslint-disable-next-line complexity
function isIREqual(
  lhs: IntermediateRepresentation | Token | Token[],
  rhs: IntermediateRepresentation | Token | Token[],
): boolean | undefined {
  if (lhs instanceof Token && rhs instanceof Token) {
    return isDeepEqual(TokenData.fromToken(lhs), TokenData.fromToken(rhs));
  }

  if (lhs instanceof Array<Token> && rhs instanceof Array<Token>) {
    if (lhs.length !== rhs.length) {
      return false;
    }
    for (let i = 0; i < lhs.length; i++) {
      if (!isIREqual(lhs[i], rhs[i])) {
        return false;
      }
    }
    return true;
  }

  if (
    lhs instanceof PureUnfoldedTokenExpression
      && rhs instanceof PureUnfoldedTokenExpression
  ) {
    return isIREqual(lhs.tokens, rhs.tokens);
  }

  if (lhs instanceof OperationTree && rhs instanceof OperationTree) {
    if (
      !isIREqual(lhs.operator, rhs.operator)
        || lhs.operands.length !== rhs.operands.length
    ) {
      return false;
    }

    for (let i = 0; i < lhs.operands.length; i++) {
      if (!isIREqual(lhs.operands[i], rhs.operands[i])) {
        return false;
      }
    }
    return true;
  }

  if (
    lhs instanceof UnfoldedTokenExpression
      && rhs instanceof UnfoldedTokenExpression
  ) {
    return isIREqual(lhs.tokens, rhs.tokens);
  }
  if (
    lhs instanceof PureUnfoldedTokenExpression
      && rhs instanceof PureUnfoldedTokenExpression
  ) {
    return isIREqual(lhs.tokens, rhs.tokens);
  }

  if (
    lhs instanceof FunctionExpression
      && rhs instanceof FunctionExpression
  ) {
    return isIREqual(lhs.functionBody.body, rhs.functionBody.body)
    && isEqual(lhs.functionSignature, rhs.functionSignature);
  }

  if (
    lhs instanceof ModuleExpression
      && rhs instanceof ModuleExpression
  ) {
    if (lhs.functionDeclarations.length !== rhs.functionDeclarations.length) {
      return false;
    }
    for (let i = 0; i < lhs.functionDeclarations.length; i++) {
      if (!isIREqual(lhs.functionDeclarations[i], rhs.functionDeclarations[i])) {
        return false;
      }
    }
    return true;
  }

  return isDeepEqual(lhs, rhs);
}

expect.addEqualityTesters([isIREqual]);
