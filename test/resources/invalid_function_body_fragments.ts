import { getSampleToken as t } from './resolved_tokens';
import { type FunctionBodyTestCaseData } from './valid_function_body_fragments';

// Fails at the IR stage.
export const simple_addition_sexpr_without_argument_bracket_fails: FunctionBodyTestCaseData = {
  str: `
    (f64.add
        f64.const 1
        f64.const 1.5
        )
    `,
  tokens: ['(', 'f64.add', 'f64.const', '1', 'f64.const', '1.5', ')'].map(t),
  tokenTree: [t('f64.add'), t('f64.const'), t('1'), t('f64.const'), t('1.5')],
};
