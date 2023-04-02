/* eslint-disable import/no-extraneous-dependencies */
import { ExportType } from '../../src/common/export_types';
import { type Token } from '../../src/common/token';
import { ValueType } from '../../src/common/type';
import {
  ExportExpression,
  ExportObject,
  FunctionExpression,
  OperationTree,
  PureUnfoldedTokenExpression,
  UnfoldedTokenExpression,
  type IntermediateRepresentation,
} from '../../src/parser/ir';
import { Tree } from '../../src/parser/tree_types';
import { getSampleToken as t } from './resolved_tokens';

export interface TestCaseData {
  str: string;
  tokens: Array<Token>;
  tokenTree: Tree<Token>;
  ir: IntermediateRepresentation;
  unfolded_ir?: IntermediateRepresentation;
  minimal_binary?: Uint8Array;
  minimal_binary_function_signature?: Uint8Array;
  minimal_binary_function_body?: Uint8Array;
}

export const simple_addition_sexpr: TestCaseData = {
  str: `
  (f64.add
      (f64.const 1)
      (f64.const 1.5)
      )
  `,
  tokens: [
    '(',
    'f64.add',
    '(',
    'f64.const',
    '1',
    ')',
    '(',
    'f64.const',
    '1.5',
    ')',
    ')',
  ].map(t),
  tokenTree: [
    t('f64.add'),
    [t('f64.const'), t('1')],
    [t('f64.const'), t('1.5')],
  ],
  ir: new OperationTree(t('f64.add'), [
    new UnfoldedTokenExpression([t('f64.const'), t('1')]),
    new UnfoldedTokenExpression([t('f64.const'), t('1.5')]),
  ]),
  unfolded_ir: new PureUnfoldedTokenExpression(
    ['f64.const', '1', 'f64.const', '1.5', 'f64.add'].map(t),
  ),
  minimal_binary: new Uint8Array([
    0x44, 0, 0, 0, 0, 0, 0, 0xf0, 0x3f, 0x44, 0, 0, 0, 0, 0, 0, 0xf8, 0x3f, 0xa0,
  ]),
};

export const simple_addition_sexpr_without_argument_bracket_fails = {
  str: `
  (f64.add
      f64.const 1
      f64.const 1.5
      )
  `,
  tokens: ['(', 'f64.add', 'f64.const', '1', 'f64.const', '1.5', ')'].map(t),
  tokenTree: [t('f64.add'), t('f64.const'), t('1'), t('f64.const'), t('1.5')],
};

export const simple_addition_stack: TestCaseData = {
  str: `
  (f64.const 1
      f64.const 1.5
      f64.add)
  `,
  tokens: ['(', 'f64.const', '1', 'f64.const', '1.5', 'f64.add', ')'].map(t),
  tokenTree: ['f64.const', '1', 'f64.const', '1.5', 'f64.add'].map(t),
  ir: new UnfoldedTokenExpression(
    ['f64.const', '1', 'f64.const', '1.5', 'f64.add'].map(t),
  ),
  unfolded_ir: new PureUnfoldedTokenExpression(
    ['f64.const', '1', 'f64.const', '1.5', 'f64.add'].map(t),
  ),
  minimal_binary: new Uint8Array([
    0x44, 0, 0, 0, 0, 0, 0, 0xf0, 0x3f, 0x44, 0, 0, 0, 0, 0, 0, 0xf8, 0x3f, 0xa0,
  ]),
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
  tokens: [
    'f64.const',
    '1',
    'f64.const',
    '1',
    'f64.add',
    'f64.const',
    '1',
    'f64.const',
    '1',
    'f64.add',
    'f64.add',
  ].map(t),
  tokenTree: [
    'f64.const',
    '1',
    'f64.const',
    '1',
    'f64.add',
    'f64.const',
    '1',
    'f64.const',
    '1',
    'f64.add',
    'f64.add',
  ].map(t),
  ir: new UnfoldedTokenExpression(
    [
      'f64.const',
      '1',
      'f64.const',
      '1',
      'f64.add',
      'f64.const',
      '1',
      'f64.const',
      '1',
      'f64.add',
      'f64.add',
    ].map(t),
  ),
  unfolded_ir: new PureUnfoldedTokenExpression(
    [
      'f64.const',
      '1',
      'f64.const',
      '1',
      'f64.add',
      'f64.const',
      '1',
      'f64.const',
      '1',
      'f64.add',
      'f64.add',
    ].map(t),
  ),
  minimal_binary: new Uint8Array([
    0x44,
    0,
    0,
    0,
    0,
    0,
    0,
    0xf0,
    0x3f,
    0x44,
    0,
    0,
    0,
    0,
    0,
    0,
    0xf0,
    0x3f,
    0xa0,
    0x44,
    0,
    0,
    0,
    0,
    0,
    0,
    0xf0,
    0x3f,
    0x44,
    0,
    0,
    0,
    0,
    0,
    0,
    0xf0,
    0x3f,
    0xa0,
    0xa0,
  ]),
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
  ir: new OperationTree(t('f64.add'), [
    new OperationTree(t('f64.add'), [
      new UnfoldedTokenExpression([t('f64.const'), t('1')]),
      new UnfoldedTokenExpression([t('f64.const'), t('1')]),
    ]),
    new OperationTree(t('f64.add'), [
      new UnfoldedTokenExpression([t('f64.const'), t('1')]),
      new UnfoldedTokenExpression([t('f64.const'), t('1')]),
    ]),
  ]),
  unfolded_ir: new PureUnfoldedTokenExpression(
    [
      'f64.const',
      '1',
      'f64.const',
      '1',
      'f64.add',
      'f64.const',
      '1',
      'f64.const',
      '1',
      'f64.add',
      'f64.add',
    ].map(t),
  ),
  minimal_binary: new Uint8Array([
    0x44,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0xf0,
    0x3f,
    0x44,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0xf0,
    0x3f,
    0xa0,
    0x44,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0xf0,
    0x3f,
    0x44,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0xf0,
    0x3f,
    0xa0,
    0xa0,
  ]),
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

  tokenTree: Tree.treeMap(
    [
      'func',
      ['param', '$p', 'f64'],
      ['result', 'f64'],
      ['f64.add', ['local.get', '$p'], ['local.get', '$p']],
    ],
    t,
  ),
  ir: new FunctionExpression(
    [ValueType.F64],
    [ValueType.F64],
    ['$p'],
    new OperationTree(t('f64.add'), [
      new UnfoldedTokenExpression([t('local.get'), t('$p')]),
      new UnfoldedTokenExpression([t('local.get'), t('$p')]),
    ]),
  ),
  minimal_binary_function_signature: new Uint8Array([
    0x60, 0x01, 0x7c, 0x01, 0x7c,
  ]),
  minimal_binary_function_body: new Uint8Array([
    0x07, 0x00, 0x20, 0x00, 0x20, 0x00, 0xa0, 0x0b,
  ]),
};

export const simple_add_function_no_param_names: TestCaseData = {
  str: `
  (func (param i32) (param i32) (result i32)
    local.get 0
    local.get 1
    i32.add)
    `,
  tokens: [
    ...[
      '(',
      'func',
      '(',
      'param',
      'i32',
      ')',
      '(',
      'param',
      'i32',
      ')',
      '(',
      'result',
      'i32',
      ')',
    ],
    ...['local.get', '0'],
    ...['local.get', '1'],
    ...['i32.add', ')'],
  ].map(t),

  tokenTree: Tree.treeMap(
    [
      'func',
      ['param', 'i32'],
      ['param', 'i32'],
      ['result', 'i32'],
      'local.get',
      '0',
      'local.get',
      '1',
      'i32.add',
    ],
    t,
  ),
  ir: new FunctionExpression(
    [ValueType.I32, ValueType.I32],
    [ValueType.I32],
    [],
    new UnfoldedTokenExpression(
      ['local.get', '0', 'local.get', '1', 'i32.add'].map(t),
    ),
  ),
  minimal_binary: undefined,
};

// export const simple_named_add_function_no_param_names: TestCaseData = {
//   str: `
//   (func $add (param i32) (param i32) (result i32)
//     local.get 0
//     local.get 1
//     i32.add)
//     `,
//   tokens: [
//     ...['(', 'func', '$add', '(', 'param', 'i32', ')', '(', 'param', 'i32', ')', '(', 'result', 'i32', ')'],
//     ...['local.get', '0'],
//     ...['local.get', '1'],
//     ...['i32.add', ')'],
//   ].map(t),
//
//   tokenTree: Tree.treeMap(['func',
//     '$add',
//     ['param', 'i32'],
//     ['param', 'i32'],
//     ['result', 'i32'],
//     'local.get',
//     '0',
//     'local.get',
//     '1',
//     'i32.add']
//   , t),
//   ir: new FunctionExpression(
//     [ValueType.I32, ValueType.I32],
//     [ValueType.I32],
//     [],
//     new UnfoldedTokenExpression(['local.get', '0', 'local.get', '1', 'i32.add'].map(t)),
//     '$add',
//   ),
//   minimal_binary: undefined,
// };

export const export_func_add_by_index = {
  str: '(export "add" (func 0))',
  tokens: ['(', 'export', '"add"', '(', 'func', '0', ')', ')'].map(t),
  tokenTree: Tree.treeMap(['export', '"add"', ['func', '0']], t),
  ir: new ExportExpression([new ExportObject(t('"add"'), t('func'), t('0'))]),
  minimal_binary: new Uint8Array([
    0x01, // num exports
    0x03, // string length
    ...[0x61, 0x64, 0x64], // "add" export name
    0x00, // export kind
    0x00, // export func index
  ]),
};
