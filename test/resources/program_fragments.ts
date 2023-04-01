/* eslint-disable import/no-extraneous-dependencies */
import { type Token } from '../../src/common/token';
import { ValueType } from '../../src/common/type';
import { FunctionBody, FunctionExpression, FunctionSignature, OperationTree, UnfoldedTokenExpression, type IntermediateRepresentation } from '../../src/parser/ir';
import { Tree } from '../../src/parser/tree_types';
import { getSampleToken as t } from './resolved_tokens';

export interface TestCaseData {
  str: string;
  tokens: Array<Token>;
  tokenTree: Tree<Token>;
  ir: IntermediateRepresentation;
  minimal_binary?: Uint8Array;
}

// TODO note that the brackets around f64.const are necessary. Add a test case that fails when there are no brackets.
export const simple_addition_sexpr: TestCaseData = {
  str: `
  (f64.add
      (f64.const 1)
      (f64.const 1.5)
      )
  `,
  tokens: ['(', 'f64.add', '(', 'f64.const', '1', ')', '(', 'f64.const', '1.5', ')', ')'].map(t),
  tokenTree: [t('f64.add'), [t('f64.const'), t('1')], [t('f64.const'), t('1.5')]],
  ir: new OperationTree(t('f64.add'), [
    new UnfoldedTokenExpression([t('f64.const'), t('1')]),
    new UnfoldedTokenExpression([t('f64.const'), t('1.5')]),
  ]),
  minimal_binary: undefined,
};

export const simple_addition_stack: TestCaseData = {
  str: `
  (f64.const 1
      f64.const 1.5
      f64.add)
  `,
  tokens: ['(', 'f64.const', '1', 'f64.const', '1.5', 'f64.add', ')'].map(t),
  tokenTree: ['f64.const', '1', 'f64.const', '1.5', 'f64.add'].map(t),
  ir: new UnfoldedTokenExpression(['f64.const', '1', 'f64.const', '1.5', 'f64.add'].map(t)),
  minimal_binary: undefined,
};

export const nested_addition_stack: TestCaseData = {
  str: `
    f64.const 1
    f64.const 1
    f64.add
    f64.const 1
    f64.const 1
    f64.add
    f64.add
    `,
  tokens: ['f64.const', '1', 'f64.const', '1', 'f64.add', 'f64.const', '1', 'f64.const', '1', 'f64.add', 'f64.add'].map(t),
  tokenTree: ['f64.const', '1', 'f64.const', '1', 'f64.add', 'f64.const', '1', 'f64.const', '1', 'f64.add', 'f64.add'].map(t),
  ir: new UnfoldedTokenExpression(['f64.const', '1', 'f64.const', '1', 'f64.add', 'f64.const', '1', 'f64.const', '1', 'f64.add', 'f64.add'].map(t)),
  minimal_binary: undefined,
};

export const nested_addition_sexpr: TestCaseData = {
  str: `
  (f64.add
    (f64.add
      (f64.const 1)
      (f64.const 1)
    )
    (f64.add
      (f64.const 1)
      (f64.const 1)
    )
  )
    `,
  tokens: [
    ...['(', 'f64.add'],
    ...['(', 'f64.add'],
    ...['(', 'f64.const', '1', ')'],
    ...['(', 'f64.const', '1', ')'],
    ...[')'],
    ...['(', 'f64.add'],
    ...['(', 'f64.const', '1', ')'],
    ...['(', 'f64.const', '1', ')'],
    ')',
    ')',
  ].map(t),
  tokenTree: [
    t('f64.add'),
    [t('f64.add'), [t('f64.const'), t('1')], [t('f64.const'), t('1')]],
    [t('f64.add'), [t('f64.const'), t('1')], [t('f64.const'), t('1')]],
  ],
  ir: new OperationTree(
    t('f64.add'),
    [
      new OperationTree(
        t('f64.add'),
        [new UnfoldedTokenExpression([t('f64.const'), t('1')]), new UnfoldedTokenExpression([t('f64.const'), t('1')])],
      ),
      new OperationTree(
        t('f64.add'),
        [new UnfoldedTokenExpression([t('f64.const'), t('1')]), new UnfoldedTokenExpression([t('f64.const'), t('1')])],
      ),
    ],
  ),
  minimal_binary: undefined,
};

export const simple_function_sexpr_with_param_names: TestCaseData = {
  str: `
  (func (param $p f64)
  (result f64)
  (f64.add 
    (local.get $p)
    (local.get $p))
  )
    `,
  tokens: [
    ...['(', 'func', '(', 'param', '$p', 'f64', ')'],
    ...['(', 'result', 'f64', ')'],
    ...['(', 'f64.add'],
    ...['(', 'local.get', '$p', ')'],
    ...['(', 'local.get', '$p', ')', ')'],
    ...[')'],
  ].map(t),

  tokenTree: Tree.treeMap(['func',
    ['param', '$p', 'f64'],
    ['result', 'f64'],
    ['f64.add', ['local.get', '$p'], ['local.get', '$p']]]
  , t),
  ir: new FunctionExpression(
    new FunctionSignature([ValueType.F64], [ValueType.F64], ['$p']),
    new FunctionBody(
      new OperationTree(
        t('f64.add'),
        [
          new UnfoldedTokenExpression([t('local.get'), t('$p')]),
          new UnfoldedTokenExpression([t('local.get'), t('$p')]),
        ],
      ),
    ),
  ),
  minimal_binary: undefined,
};

export const simple_add_function_no_param_names: TestCaseData = {
  str: `
  (func (param i32) (param i32) (result i32)
    local.get 0
    local.get 1
    i32.add)
    `,
  tokens: [
    ...['(', 'func', '(', 'param', 'i32', ')', '(', 'param', 'i32', ')', '(', 'result', 'i32', ')'],
    ...['local.get', '0'],
    ...['local.get', '1'],
    ...['i32.add', ')'],
  ].map(t),

  tokenTree: Tree.treeMap(['func',
    ['param', 'i32'],
    ['param', 'i32'],
    ['result', 'i32'],
    'local.get',
    '0',
    'local.get',
    '1',
    'i32.add']
  , t),
  ir: new FunctionExpression(
    new FunctionSignature([ValueType.I32, ValueType.I32], [ValueType.I32], []),
    new FunctionBody(
      new UnfoldedTokenExpression(['local.get', '0', 'local.get', '1', 'i32.add'].map(t)),
    ),
  ),
  minimal_binary: undefined,
};
