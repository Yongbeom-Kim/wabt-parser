/**
 * Just a file to write demos and run examples on ts-node
 */
import { compile, parse } from './index';
const program = `
(module
    (func $first_function (param) (result))
    (func $second_function (param) (result))
    (export "second" (func $second_function))
    (export "first" (func $first_function))
  )
`;
// const program = `
// (module
//     (func (param f64) (param f64) (result f64)
//         local.get 0
//         local.get 1
//         f64.add)
//     (func (param f64) (param f64) (result f64)
//         local.get 0
//         local.get 1
//         f64.sub)
//     (func (param f64) (param f64) (result f64)
//         local.get 0
//         local.get 1
//         f64.mul)
//     (func (param f64) (param f64) (result f64)
//         local.get 0
//         local.get 1
//         f64.div)
//     (export "add" (func 0))
//     (export "sub" (func 1))
//     (export "mul" (func 2))
//     (export "div" (func 3))
// )`;

const parseTree = compile(program);
// const encoding = encode(parseTree);
// const encoding = compile(program);
// const instance = new WebAssembly.Instance(new WebAssembly.Module(encoding));
// console.log(instance.exports);
// const { add, sub, mul, div } = instance.exports;

// console.log(add);
// console.log(sub);
// console.log(mul);
// console.log(div);

// // @ts-ignore
// console.log(add(2, 1));
// // @ts-ignore
// console.log(sub(10, 5));
// // @ts-ignore
// console.log(div(40, 6));
// // @ts-ignore
// console.log(mul(50, 19));
