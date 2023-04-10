import { encode, NumberEncoder, TEST_EXPORTS } from '../src/binary_writer';
import { module_with_exported_add_function_no_names, module_with_one_simple_add_function_with_param_names } from './resources/module_program_fragments';

import { minimalBinaryTestCases as tc1 } from './resources/valid_function_bodies';
import { validTestCases as tc2 } from './resources/function_expressions';
import { validTestCases as tc3 } from './resources/export_expressions';

test.each(tc1)('test encode function body expressions', (testCase) => {
  const encoding = encode(testCase.ir!);
  const expectedEncoding = testCase.minimal_binary;
  expect(encoding)
    .toEqual(expectedEncoding);
});

describe('Encode function expresions', () => {
  test.each(tc2)('test encode function expression signature', (testCase) => {
    const encoding = encode(testCase.ir.functionSignature);
    const expectedEncoding = testCase.minimal_binary_function_signature;
    expect(encoding)
      .toEqual(expectedEncoding);
  });

  test.each(tc2)('test encode function expression body', (testCase) => {
    const encoding = encode(testCase.ir.functionBody);
    const expectedEncoding = testCase.minimal_binary_function_body;
    expect(encoding)
      .toEqual(expectedEncoding);
  });
});


test.each(tc3)('test encode encode expressions', (testCase) => {
  const encoding = encode(testCase.ir);
  const expectedEncoding = testCase.minimal_binary;
  expect(encoding)
    .toEqual(expectedEncoding);
});


describe('Encode const numbers', () => {
  test('encode 1.0 (f64)', () => {
    const encoding = NumberEncoder.encodeF64Const(1);
    const expectedEncoding = new Uint8Array([0, 0, 0, 0, 0, 0, 0xf0, 0x3f]);
    expect(encoding)
      .toEqual(expectedEncoding);
  });

  test('encode 1.5 (f64)', () => {
    const encoding = NumberEncoder.encodeF64Const(1.5);
    const expectedEncoding = new Uint8Array([0, 0, 0, 0, 0, 0, 0xf8, 0x3f]);
    expect(encoding)
      .toEqual(expectedEncoding);
  });
});

describe('encode modules', () => {
  describe('encode module module_with_one_simple_add_function_with_param_names', () => {
    test('Encode type section (1): module_with_one_simple_add_function_with_param_names', () => {
      const encode_fn = TEST_EXPORTS.encodeModuleTypeSection;
      const encoding = encode_fn(
        module_with_one_simple_add_function_with_param_names.ir,
      );
      const expected
        = module_with_one_simple_add_function_with_param_names.type_section_encoding;

      expect(encoding)
        .toEqual(expected);
    });

    test('Encode function section (3): module_with_one_simple_add_function_with_param_names', () => {
      const encode_fn = TEST_EXPORTS.encodeModuleFunctionSection;
      const encoding = encode_fn(
        module_with_one_simple_add_function_with_param_names.ir,
      );
      const expected
        = module_with_one_simple_add_function_with_param_names.function_section_encoding;

      expect(encoding)
        .toEqual(expected);
    });

    test('Encode code section (10/0x0a): module_with_one_simple_add_function_with_param_names', () => {
      const encode_fn = TEST_EXPORTS.encodeModuleCodeSection;
      const encoding = encode_fn(
        module_with_one_simple_add_function_with_param_names.ir,
      );
      const expected
        = module_with_one_simple_add_function_with_param_names.code_section_encoding;

      expect(encoding)
        .toEqual(expected);
    });

    test('Encode entire module: module_with_one_simple_add_function_with_param_names', () => {
      const encode_fn = TEST_EXPORTS.encodeModule;
      const encoding = encode_fn(
        module_with_one_simple_add_function_with_param_names.ir,
      );
      const expected
        = module_with_one_simple_add_function_with_param_names.minimal_module_encoding;

      expect(encoding)
        .toEqual(expected);
    });
  });


  describe('encode module module_with_exported_add_function_no_names', () => {
    test('Encode type section (1): module_with_exported_add_function_no_names', () => {
      const encode_fn = TEST_EXPORTS.encodeModuleTypeSection;
      const encoding = encode_fn(
        module_with_exported_add_function_no_names.ir,
      );
      const expected
        = module_with_exported_add_function_no_names.type_section_encoding;

      expect(encoding)
        .toEqual(expected);
    });

    test('Encode function section (3): module_with_exported_add_function_no_names', () => {
      const encode_fn = TEST_EXPORTS.encodeModuleFunctionSection;
      const encoding = encode_fn(
        module_with_exported_add_function_no_names.ir,
      );
      const expected
        = module_with_exported_add_function_no_names.function_section_encoding;

      expect(encoding)
        .toEqual(expected);
    });

    test('Encode export section (7): module_with_exported_add_function_no_names', () => {
      const encode_fn = TEST_EXPORTS.encodeModuleExportSection;
      const encoding = encode_fn(
        module_with_exported_add_function_no_names.ir,
      );
      const expected
        = module_with_exported_add_function_no_names.export_section_encoding;

      expect(encoding)
        .toEqual(expected);
    });

    test('Encode code section (10/0x0a): module_with_exported_add_function_no_names', () => {
      const encode_fn = TEST_EXPORTS.encodeModuleCodeSection;
      const encoding = encode_fn(
        module_with_exported_add_function_no_names.ir,
      );
      const expected
        = module_with_exported_add_function_no_names.code_section_encoding;

      expect(encoding)
        .toEqual(expected);
    });

    test('Encode module: module_with_exported_add_function_no_names', () => {
      const encode_fn = TEST_EXPORTS.encodeModule;
      const encoding = encode_fn(
        module_with_exported_add_function_no_names.ir,
      );
      const expected
        = module_with_exported_add_function_no_names.minimal_module_encoding;

      expect(encoding)
        .toEqual(expected);
    });
  });
});
