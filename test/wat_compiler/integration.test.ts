import { compile, parse } from '../../src/wat_compiler';
import {
  TEST_EXPORTS,
  encodeModule,
} from '../../src/wat_compiler/binary_writer';
import { getIR } from '../../src/wat_compiler/ir';
import { areUint8ArraysEqual } from '../array_buffer_comparison';
import { invalidTestCases as invalidFuncExpTestCases } from './resources/function_expressions';
import {
  type ModuleTestCase,
  moduleTestCases,
} from './resources/module_program_fragments';
import { isTokenEqual } from '../token_comparisons';
import { expect } from '@jest/globals';
const {
  encodeModuleTypeSection,
  encodeModuleImportSection,
  encodeModuleFunctionSection,
  encodeModuleTableSection,
  encodeModuleMemorySection,
  encodeModuleGlobalSection,
  encodeModuleExportSection,
  encodeModuleStartSection,
  encodeModuleElementSection,
  encodeModuleCodeSection,
  encodeModuleDataSection,
} = TEST_EXPORTS;

expect.addEqualityTesters([isTokenEqual]);
// expect.addEqualityTesters([areUint8ArraysEqual]);

describe.each(moduleTestCases)('encode modules', (testCase: ModuleTestCase) => {
  test('Check IR', () => {
    const ir = getIR(parse(testCase.str));
    expect(ir)
      .toEqual(testCase.ir);
  });

  test('Test encode Module Type Section', () => {
    const encoding = encodeModuleTypeSection(testCase.ir);
    expect(encoding)
      .toEqual(testCase.type_section_encoding);
  });

  test('Test encode Module Import Section', () => {
    const encoding = encodeModuleImportSection(testCase.ir);
    expect(encoding)
      .toEqual(testCase.import_section_encoding);
  });

  test('Test encode Module Function Section', () => {
    const encoding = encodeModuleFunctionSection(testCase.ir);
    expect(encoding)
      .toEqual(testCase.function_section_encoding);
  });

  test('Test encode Module Table Section', () => {
    const encoding = encodeModuleTableSection(testCase.ir);
    expect(encoding)
      .toEqual(testCase.table_section_encoding);
  });

  test('Test encode Module Memory Section', () => {
    const encoding = encodeModuleMemorySection(testCase.ir);
    expect(encoding)
      .toEqual(testCase.memory_section_encoding);
  });

  test('Test encode Module Global Section', () => {
    const encoding = encodeModuleGlobalSection(testCase.ir);
    expect(encoding)
      .toEqual(testCase.global_section_encoding);
  });

  test('Test encode Module Export Section', () => {
    const encoding = encodeModuleExportSection(testCase.ir);
    expect(encoding)
      .toEqual(testCase.export_section_encoding);
  });

  test('Test encode Module Start Section', () => {
    const encoding = encodeModuleStartSection(testCase.ir);
    expect(encoding)
      .toEqual(testCase.start_section_encoding);
  });

  test('Test encode Module Element Section', () => {
    const encoding = encodeModuleElementSection(testCase.ir);
    expect(encoding)
      .toEqual(testCase.element_section_encoding);
  });

  test('Test encode Module Code Section', () => {
    const encoding = encodeModuleCodeSection(testCase.ir);
    expect(encoding)
      .toEqual(testCase.code_section_encoding);
  });

  test('Test encode Module Data Section', () => {
    const encoding = encodeModuleDataSection(testCase.ir);
    expect(encoding)
      .toEqual(testCase.data_section_encoding);
  });

  test('Test overall minimal encoding', () => {
    const encoding = encodeModule(testCase.ir);
    expect(encoding)
      .toEqual(testCase.minimal_module_encoding);
  });
});

test.each(invalidFuncExpTestCases)(
  'encode invalid function expression throws',
  (testCase) => {
    expect(() => compile(parse(testCase.str)))
      .toThrow();
  },
);
