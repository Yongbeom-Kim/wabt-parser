/* eslint-disable @typescript-eslint/no-use-before-define */
import { type ValueType } from '../common/type';
import { Token } from '../common/token';

export abstract class IntermediateRepresentation {

}

export class ModuleExpression extends IntermediateRepresentation {
  /*
    Sections in modules:
      0  Custom (unused)
      1  Type (Function Signatures)
      2  Import
      3  Function (Function )
      4  Table
      5  Memory
      6  Global
      7  Export
      8  Start
      9  Element
      10 Code
      11 Data
      12 DataCount
  */

  // Type Section
  functionSignatures: FunctionSignature[] = [];

  // Func Section
  functionBodies: FunctionBody[] = [];

  constructor(body: IntermediateRepresentation[]) {
    super();

    body.forEach((node) => {
      if (node instanceof FunctionExpression) {
        this.functionSignatures.push(node.functionSignature);
        this.functionBodies.push(node.functionBody);
      }
    });
  }
}

/*
FUNCTIONS
*/

/**
 * Intermediate representation of function expression.
 * Note that signature and body will be encoded in different places afterward
 */
export class FunctionExpression extends IntermediateRepresentation {
  functionSignature: FunctionSignature;
  functionBody: FunctionBody;

  constructor(signature: FunctionSignature, body: FunctionBody) {
    super();
    this.functionSignature = signature;
    this.functionBody = body;
  }
}

export class FunctionSignature {
  paramTypes: ValueType[];
  paramNames?: string[];
  returnTypes: ValueType[];
  hasParamNames: boolean;

  constructor(paramTypes: ValueType[], returnTypes: ValueType[], paramNames: string[]) {
    this.paramTypes = paramTypes;
    this.returnTypes = returnTypes;
    this.paramNames = paramNames;
    this.hasParamNames = paramNames.length === 0;
  }
}

/**
 * Intermediate representation of function body.
 * We are using a wrapper around TokenExpression because:
 *  (1) WABT function bodies have to be encoded differently from other blocks
 *  (2) WABT function bodies are in a different module section compared to other blocks.
 */
export class FunctionBody {
  body: TokenExpression;

  constructor(body: TokenExpression) {
    this.body = body;
  }
}


/*
  EXPRESSION BODIES
*/

type TokenExpression = OperationTree | UnfoldedTokenExpression;

/**
 * Interface indicating that the particular intermediate representation
 * may contain s-expressions, and can therefore be 'unfolded'.
 */
interface Unfoldable {
  unfold(): PureUnfoldedTokenExpression;
}

/**
 * Class representing operators and operands in an s-expression.
 */
export class OperationTree extends IntermediateRepresentation implements Unfoldable {
  operator: Token;
  operands: (Token | OperationTree)[];

  constructor(operator: Token, operands: (Token | OperationTree)[]) {
    super();
    this.operator = operator;
    this.operands = operands;
  }

  unfold(): PureUnfoldedTokenExpression {
    const unfoldedOperands: Token[] = this.operands.flatMap((operand) => {
      if (operand instanceof Token) {
        return [operand];
      }

      return operand.unfold().tokens;
    });

    return new PureUnfoldedTokenExpression([...unfoldedOperands, this.operator]);
  }
}

/**
 * Class representing a stack token expression. May have s-expressions inside.
 */
export class UnfoldedTokenExpression extends IntermediateRepresentation implements Unfoldable {
  tokens: (Token | OperationTree)[];

  constructor(tokens: (Token | OperationTree)[]) {
    super();
    this.tokens = tokens;
  }
  unfold(): PureUnfoldedTokenExpression {
    const unfoldedOperands: Token[] = this.tokens.flatMap((token) => {
      if (token instanceof Token) {
        return [token];
      }

      return token.unfold().tokens;
    });

    return new PureUnfoldedTokenExpression(unfoldedOperands);
  }
}

/**
 * Class representing a stack token expression. May NOT have s-expressions inside.
 */
export class PureUnfoldedTokenExpression extends UnfoldedTokenExpression {
  tokens: Token[];

  constructor(tokens: Token[]) {
    super(tokens);
    this.tokens = tokens;
  }
}
