/* eslint-disable array-element-newline */ // (array formatting)
import { FunctionBody, FunctionSignature, PureUnfoldedTokenExpression, Unfoldable, type IntermediateRepresentation } from './parser/ir';
import { ValueType } from './common/type';
import { Token, TokenType } from './common/token';
import { Opcode, OpcodeType } from './common/opcode';
import assert from 'assert';

namespace SectionCode {
  export const Type = 1;
  export const Import = 2;
  export const Function = 3;
  export const Table = 4;
  export const Memory = 5;
  export const Global = 6;
  export const Export = 7;
  export const Start = 8;
  export const Element = 9;
  export const Code = 10;
  export const Data = 11;
}

export function encode(ir: IntermediateRepresentation): Uint8Array {
  if (Unfoldable.instanceOf(ir)) {
    const unfolded: PureUnfoldedTokenExpression = (ir as Unfoldable).unfold();
    return encode(unfolded);
    // ir = unfolded; // with this, we save one recursive call!
  }

  if (ir instanceof PureUnfoldedTokenExpression) {
    return encodePureUnfoldedTokenExpression(ir);
  }

  if (ir instanceof FunctionSignature) {
    return encodeFunctionSignature(ir);
  }
  if (ir instanceof FunctionBody) {
    return encodeFunctionBody(ir);
  }

  throw new Error(`Unexpected Intermediate Representation: ${ir.constructor.name}, ${JSON.stringify(ir, undefined, 2)}`);
}

/**
 * Encode a completely unfolded token expression
 * @param ir a PureUnfoldedTokenExpression
 * @returns a Uint8Array binary encoding
 */
function encodePureUnfoldedTokenExpression(ir: PureUnfoldedTokenExpression): Uint8Array {
  const binary: number[] = [];
  for (const [index, token] of ir.tokens.entries()) {
    if (!isLiteralToken(token)) {
      binary.push(...encodeNonLiteralToken(token));
    } else {
      const prevToken = ir.tokens[index - 1];
      binary.push(...encodeLiteralToken(prevToken, token));
    }
  }
  return new Uint8Array(binary);
}

/**
 * Encode the function signature of a FunctionSignature intermediate representation.
 * This function encodes a function signature to be used in the "Type" (1) section of a Module encoding.
 * @param ir function signature to encode
 * @returns a Uint8Array binary encoding.
 */
function encodeFunctionSignature(ir: FunctionSignature): Uint8Array {
  const FUNCTION_SIG_PREFIX = 0x60;

  const param_encoding = ir.paramTypes.map((type) => ValueType.getValue(type));
  const param_len = param_encoding.length;

  const result_encoding = ir.returnTypes.map((type) => ValueType.getValue(type));
  const result_len = result_encoding.length;

  return new Uint8Array([FUNCTION_SIG_PREFIX, param_len, ...param_encoding, result_len, ...result_encoding]);
}

/**
 * Encode the function bidt of a FunctionBody intermediate representation.
 * This function encodes a function body to be used in the "Code" (10 / 0x0a) section of a Module encoding.
 * @param ir function body to encode
 * @returns a Uint8Array binary encoding.
 */
function encodeFunctionBody(ir: FunctionBody): Uint8Array {
  const unfoldedBody = ir.body.unfold();
  const paramNames = ir.paramNames;

  // Replace parameter names with index.
  for (let i = 0; i < unfoldedBody.tokens.length; i++) {
    const token = unfoldedBody.tokens[i];
    if (token.type === TokenType.Var) {
      const index = paramNames.indexOf(token.lexeme);
      if (index === -1) { // TODO proper error message
        throw new Error(`Parameter name not found in function body: ${JSON.stringify(ir, undefined, 2)}`);
      }

      unfoldedBody.tokens[i] = convertVarToIndexToken(token, index);
    }
  }

  const encodedBody = encode(unfoldedBody);
  const FUNCTION_END = 0x0b;

  // The random 0 there is the local declaration count. Not yet implemented, so it is 0 for now.
  return new Uint8Array([encodedBody.length + 2, 0, ...encodedBody, FUNCTION_END]);
}

function convertVarToIndexToken(varToken: Token, index: number): Token {
  assert(Number.isInteger(index));
  assert(index >= 0);

  return new Token(
    TokenType.Nat, index.toString(), varToken.line, varToken.col, varToken.indexInSource, null, null,
  );
}
function isLiteralToken(token: Token): boolean {
  return token.type === TokenType.Nat || token.type === TokenType.Float;
}

/**
 * Encode an individual token.
 * @param token token to encode
 * @returns a Uint8Array of binary encodings.
 */
function encodeNonLiteralToken(token: Token): Uint8Array {
  if (token.isValueToken()) {
    return new Uint8Array([ValueType.getValue(token.valueType!)]);
  }

  if (token.isOpcodeToken()) {
    return new Uint8Array([Opcode.getCode(token.opcodeType!)]);
  }

  throw new Error(`Unexpected token: ${token}`);
}

/**
 * Encode a literal token.
 * We need to know the previous token to determine the type of the current token.
 * @param prevToken previous token
 * @param token token
 */
function encodeLiteralToken(prevToken: Token, token: Token): Uint8Array {
  if (prevToken.isOpcodeType(OpcodeType.F64Const)) {
    return NumberEncoder.encodeF64Const(
      /^\d+$/u.test(token.lexeme)
        ? Number.parseInt(token.lexeme)
        : Number.parseFloat(token.lexeme),
    );
  }

  if (prevToken.type === TokenType.LocalGet) {
    assert(token.type === TokenType.Nat); // TODO proper error
    return new Uint8Array([Number.parseInt(token.lexeme)]);
  }

  // TODO custom error
  throw new Error(`Unsuppored literal token type: [${JSON.stringify(prevToken, undefined, 2)}, ${JSON.stringify(token, undefined, 2)}]`);
}


// class BinaryWriter {
//   readonly module: ModuleExpression;

//   constructor(module: ModuleExpression) {
//     this.module = module;
//   }

//   encode(): Uint8Array {
//     // TODO merge using .set() function https://stackoverflow.com/questions/49129643/how-do-i-merge-an-array-of-uint8arrays
//     return new Uint8Array([
//       ...this.encodeModulePrefix(),
//       ...this.encodeTypeSection(),
//       ...this.encodeImportSection(),
//       ...this.encodeFunctionSection(),
//       ...this.encodeTableSection(),
//       ...this.encodeMemorySection(),
//       ...this.encodeGlobalSection(),
//       ...this.encodeExportSection(),
//       ...this.encodeStartSection(),
//       ...this.encodeElementSection(),
//       ...this.encodeCodeSection(),
//       ...this.encodeDataSection(),
//     ]);
//   }

//   private encodeModulePrefix(): number[] {
//     return [
//       ...[0, 'a'.charCodeAt(0), 's'.charCodeAt(0), 'm'.charCodeAt(0)], // magic number
//       ...[1, 0, 0, 0], // version number
//     ];
//   }

//   private encodeTypeSection(): number[] {
//     const type_number = this.module.functionSignatures.length;

//     // encode functions
//     let encoded_func_sigs: number[] = this.module.functionSignatures.flatMap((sig) => [
//       0x60,
//       sig.paramTypes.length,
//       ...sig.paramTypes.map(ValueType.getValue),
//       sig.returnTypes.length,
//       ...sig.returnTypes.map(ValueType.getValue),
//     ]);

//     const total_bytes = 1 + encoded_func_sigs.length;

//     return [SectionCode.Type, total_bytes, type_number, ...encoded_func_sigs];
//   }

//   private encodeImportSection(): number[] {
//     return [];
//   }

//   private encodeFunctionSection(): number[] {
//     let func_length = this.module.functionSignatures.length;
//     let encoded_func_decls: number[] = [
//       ...this.module.functionSignatures.map((sig, i) => i),
//     ];

//     const total_bytes = 1 + encoded_func_decls.length;
//     return [SectionCode.Function, total_bytes, func_length, ...encoded_func_decls];
//   }

//   private encodeTableSection(): number[] {
//     return [];
//   }
//   private encodeMemorySection(): number[] {
//     return [];
//   }
//   private encodeGlobalSection(): number[] {
//     return [];
//   }
//   private encodeExportSection(): number[] {
//     return [];
//   }
//   private encodeStartSection(): number[] {
//     return [];
//   }
//   private encodeElementSection(): number[] {
//     return [];
//   }

//   private encodeCodeSection(): number[] {
//     let func_length = this.module.functionBodies.length;
//     let encoded_func_bodies: number[][]
//     = this.module.functionBodies.map((body) => {
//       const contents = body.body.contents;
//       return contents.map((token) => token.getOpcodeEncoding());
//     });

//     return [SectionCode.Code];
//   }

//   private encodeDataSection(): number[] {
//     return [];
//   }
// }

export namespace NumberEncoder {
  /**
   * Get the little-endian binary encoding of a double-precision floating-point number,
   * in the IEEE-754 specification.
   * @param n number to encode
   * @returns a unsigned-8 bit integer array
   */
  export function encodeF64Const(n: number): Uint8Array {
    let buffer = new ArrayBuffer(8);
    new DataView(buffer)
      .setFloat64(0, n);
    let bytes = new Uint8Array(buffer);

    return bytes.reverse();
  }
}
