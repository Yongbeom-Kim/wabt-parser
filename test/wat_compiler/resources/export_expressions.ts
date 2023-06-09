import { type Token } from '../../../src/common/token';
import { ExportExpression } from '../../../src/wat_compiler/ir_types';
import { Tree } from '../../../src/wat_compiler/tree_types';
import { getSampleToken as t } from './resolved_tokens';

interface TestCaseData {
  str: string;
  parseTree: Tree<Token>;
  ir: ExportExpression[];
  minimal_binary: Uint8Array;
}

export const export_func_add_by_index: TestCaseData = {
  str: '(export "add" (func 0))',
  parseTree: Tree.treeMap(['export', '"add"', ['func', '0']], t),
  ir: [new ExportExpression(t('"add"'), t('func'), t('0'))],
  minimal_binary: new Uint8Array([
    0x01, // num exports
    0x03, // string length
    ...[0x61, 0x64, 0x64], // "add" export name
    0x00, // export kind
    0x00, // export func index
  ]),
};

export const validTestCases = [export_func_add_by_index];
