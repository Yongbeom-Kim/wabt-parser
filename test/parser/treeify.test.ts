import { TokenData } from '../resources/resolved_tokens';
import { Tree } from '../../src/parser/tree_types';
import { getTokenTree } from '../../src/parser/treeify';
import { module_with_exported_add_function_no_names, module_with_one_simple_add_function_with_param_names } from '../resources/module_program_fragments';

import { tokenTreeTestCases as tc1 } from '../resources/valid_function_bodies';
import { validTestCases as tc2 } from '../resources/function_expressions';
import { validTestCases as tc3 } from '../resources/export_expressions';

test.each(tc1)('test get parse tree of function body expressions', (testCase) => {
  const tree = Tree.treeMap(getTokenTree(testCase.tokens!), TokenData.fromToken);
  const expectedTree = Tree.treeMap(testCase.tokenTree!, TokenData.fromToken);

  expect(tree)
    .toEqual(expectedTree);
});

test.each(tc2)('test get parse tree of function expressions', (testCase) => {
  const tree = Tree.treeMap(getTokenTree(testCase.tokens!), TokenData.fromToken);
  const expectedTree = Tree.treeMap(testCase.tokenTree!, TokenData.fromToken);

  expect(tree)
    .toEqual(expectedTree);
});

test.each(tc3)('test get parse tree of export expressions', (testCase) => {
  const tree = Tree.treeMap(getTokenTree(testCase.tokens!), TokenData.fromToken);
  const expectedTree = Tree.treeMap(testCase.tokenTree!, TokenData.fromToken);

  expect(tree)
    .toEqual(expectedTree);
});

test('treeify module_with_one_simple_add_function_no_param_names', () => {
  const tree = Tree.treeMap(getTokenTree(module_with_one_simple_add_function_with_param_names.tokens), TokenData.fromToken);
  const expectedTree = Tree.treeMap(module_with_one_simple_add_function_with_param_names.tokenTree, TokenData.fromToken);

  expect(tree)
    .toEqual(expectedTree);
});

test('treeify module_with_exported_add_function_no_names', () => {
  const tree = Tree.treeMap(getTokenTree(module_with_exported_add_function_no_names.tokens), TokenData.fromToken);
  const expectedTree = Tree.treeMap(module_with_exported_add_function_no_names.tokenTree, TokenData.fromToken);

  expect(tree)
    .toEqual(expectedTree);
});
