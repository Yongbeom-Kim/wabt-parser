import {
  type IntermediateRepresentation,
  OperationTree,
  PureUnfoldedTokenExpression,
  UnfoldedTokenExpression,
  FunctionExpression,
  ModuleExpression,
  ExportExpression,
} from '../../src/parser/ir';
import { getIntermediateRepresentation } from '../../src/parser/parser';
import { isEqual as isDeepEqual, isEqual } from 'lodash';
import { expect } from '@jest/globals';
import {
  simple_addition_sexpr,
  simple_addition_stack,
  nested_addition_stack,
  nested_addition_sexpr,
  simple_add_function_no_param_names,
  simple_function_sexpr_with_param_names,
  simple_addition_sexpr_without_argument_bracket_fails,
  export_func_add_by_index,
} from '../resources/program_fragments';
import { TokenData } from '../resources/resolved_tokens';
import { Token } from '../../src/common/token';
import { module_with_one_simple_add_function_with_param_names } from '../resources/module_program_fragments';

test('convert simple_addition_sexpr into ir', () => {
  const tokenTree = simple_addition_sexpr.tokenTree;
  const ir = getIntermediateRepresentation(tokenTree);
  const expectedIR = simple_addition_sexpr.ir!;

  expect(ir)
    .toEqual(expectedIR);
});

test('convert simple_addition_sexpr into ir without argument bracket fails', () => {
  const tokenTree = simple_addition_sexpr_without_argument_bracket_fails.tokenTree;
  expect(() => getIntermediateRepresentation(tokenTree))
    .toThrow();
});

test('convert simple_addition_stack into ir', () => {
  const tokenTree = simple_addition_stack.tokenTree;
  const ir = getIntermediateRepresentation(tokenTree);
  const expectedIR = simple_addition_stack.ir!;
  expect(ir)
    .toEqual(expectedIR);
});

test('convert nested_addition_stack into ir', () => {
  const tokenTree = nested_addition_stack.tokenTree;
  const ir = getIntermediateRepresentation(tokenTree);
  const expectedIR = nested_addition_stack.ir!;
  expect(ir)
    .toEqual(expectedIR);
});

test('convert nested_addition_sexpr into ir', () => {
  const tokenTree = nested_addition_sexpr.tokenTree;
  const ir = getIntermediateRepresentation(tokenTree);
  const expectedIR = nested_addition_sexpr.ir!;
  expect(ir)
    .toEqual(expectedIR);
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
  const expectedIR = module_with_one_simple_add_function_with_param_names.ir!;
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
