import { getIntermediateRepresentation } from '../../src/parser/parser';
import { expect } from '@jest/globals';
import { type Token } from '../../src/common/token';
import { simple_addition_sexpr_without_argument_bracket_fails } from '../resources/invalid_function_bodies';

import { validTestCases as tc2 } from '../resources/function_expressions';
import { irTestCases as tc1 } from '../resources/valid_function_bodies';
import { validTestCases as tc3 } from '../resources/export_expressions';
import { isTokenEqual } from '../resources/resolved_tokens';

describe('get intermediate expression of function body expressions', () => {
  test.each(tc1)(
    'test convert function body expressions into ir',
    (testCase) => {
      const parseTree = testCase.parseTree!;
      const ir = getIntermediateRepresentation(parseTree);
      const expectedIR = testCase.ir!;

      expect(ir)
        .toEqual(expectedIR);
    },
  );

  test('expect simple_addition_sexpr_without_argument_bracket_fails to throw', () => {
    const testCase = simple_addition_sexpr_without_argument_bracket_fails;
    const parseTree = testCase.parseTree!;
    expect(() => getIntermediateRepresentation(parseTree))
      .toThrow();
  });
});

test.each(tc2)('test convert function expressions into ir', (testCase) => {
  const parseTree = testCase.parseTree!;
  const ir = getIntermediateRepresentation(parseTree);
  const expectedIR = testCase.ir!;

  expect(ir)
    .toEqual(expectedIR);
});

test.each(tc3)('test convert export expressions into ir', (testCase) => {
  const parseTree = testCase.parseTree!;
  const ir = getIntermediateRepresentation(parseTree);
  const expectedIR = testCase.ir!;

  expect(ir)
    .toEqual(expectedIR);
});

expect.addEqualityTesters([isTokenEqual]);
