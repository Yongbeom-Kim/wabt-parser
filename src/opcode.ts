import { OpcodeType } from "./opcode"
import { Type } from "./type";
namespace anon {
export enum OpcodeType {
Unreachable = 0x00,
Nop = 0x01,
Block = 0x02,
Loop = 0x03,
If = 0x04,
Else = 0x05,
Try = 0x06,
Catch = 0x07,
Throw = 0x08,
Rethrow = 0x09,
End = 0x0b,
Br = 0x0c,
BrIf = 0x0d,
BrTable = 0x0e,
Return = 0x0f,
Call = 0x10,
CallIndirect = 0x11,
ReturnCall = 0x12,
ReturnCallIndirect = 0x13,
CallRef = 0x14,
Delegate = 0x18,
CatchAll = 0x19,
Drop = 0x1a,
Select = 0x1b,
SelectT = 0x1c,
LocalGet = 0x20,
LocalSet = 0x21,
LocalTee = 0x22,
GlobalGet = 0x23,
GlobalSet = 0x24,
I32Load = 0x28,
I64Load = 0x29,
F32Load = 0x2a,
F64Load = 0x2b,
I32Load8S = 0x2c,
I32Load8U = 0x2d,
I32Load16S = 0x2e,
I32Load16U = 0x2f,
I64Load8S = 0x30,
I64Load8U = 0x31,
I64Load16S = 0x32,
I64Load16U = 0x33,
I64Load32S = 0x34,
I64Load32U = 0x35,
I32Store = 0x36,
I64Store = 0x37,
F32Store = 0x38,
F64Store = 0x39,
I32Store8 = 0x3a,
I32Store16 = 0x3b,
I64Store8 = 0x3c,
I64Store16 = 0x3d,
I64Store32 = 0x3e,
MemorySize = 0x3f,
MemoryGrow = 0x40,
I32Const = 0x41,
I64Const = 0x42,
F32Const = 0x43,
F64Const = 0x44,
I32Eqz = 0x45,
I32Eq = 0x46,
I32Ne = 0x47,
I32LtS = 0x48,
I32LtU = 0x49,
I32GtS = 0x4a,
I32GtU = 0x4b,
I32LeS = 0x4c,
I32LeU = 0x4d,
I32GeS = 0x4e,
I32GeU = 0x4f,
I64Eqz = 0x50,
I64Eq = 0x51,
I64Ne = 0x52,
I64LtS = 0x53,
I64LtU = 0x54,
I64GtS = 0x55,
I64GtU = 0x56,
I64LeS = 0x57,
I64LeU = 0x58,
I64GeS = 0x59,
I64GeU = 0x5a,
F32Eq = 0x5b,
F32Ne = 0x5c,
F32Lt = 0x5d,
F32Gt = 0x5e,
F32Le = 0x5f,
F32Ge = 0x60,
F64Eq = 0x61,
F64Ne = 0x62,
F64Lt = 0x63,
F64Gt = 0x64,
F64Le = 0x65,
F64Ge = 0x66,
I32Clz = 0x67,
I32Ctz = 0x68,
I32Popcnt = 0x69,
I32Add = 0x6a,
I32Sub = 0x6b,
I32Mul = 0x6c,
I32DivS = 0x6d,
I32DivU = 0x6e,
I32RemS = 0x6f,
I32RemU = 0x70,
I32And = 0x71,
I32Or = 0x72,
I32Xor = 0x73,
I32Shl = 0x74,
I32ShrS = 0x75,
I32ShrU = 0x76,
I32Rotl = 0x77,
I32Rotr = 0x78,
I64Clz = 0x79,
I64Ctz = 0x7a,
I64Popcnt = 0x7b,
I64Add = 0x7c,
I64Sub = 0x7d,
I64Mul = 0x7e,
I64DivS = 0x7f,
I64DivU = 0x80,
I64RemS = 0x81,
I64RemU = 0x82,
I64And = 0x83,
I64Or = 0x84,
I64Xor = 0x85,
I64Shl = 0x86,
I64ShrS = 0x87,
I64ShrU = 0x88,
I64Rotl = 0x89,
I64Rotr = 0x8a,
F32Abs = 0x8b,
F32Neg = 0x8c,
F32Ceil = 0x8d,
F32Floor = 0x8e,
F32Trunc = 0x8f,
F32Nearest = 0x90,
F32Sqrt = 0x91,
F32Add = 0x92,
F32Sub = 0x93,
F32Mul = 0x94,
F32Div = 0x95,
F32Min = 0x96,
F32Max = 0x97,
F32Copysign = 0x98,
F64Abs = 0x99,
F64Neg = 0x9a,
F64Ceil = 0x9b,
F64Floor = 0x9c,
F64Trunc = 0x9d,
F64Nearest = 0x9e,
F64Sqrt = 0x9f,
F64Add = 0xa0,
F64Sub = 0xa1,
F64Mul = 0xa2,
F64Div = 0xa3,
F64Min = 0xa4,
F64Max = 0xa5,
F64Copysign = 0xa6,
I32WrapI64 = 0xa7,
I32TruncF32S = 0xa8,
I32TruncF32U = 0xa9,
I32TruncF64S = 0xaa,
I32TruncF64U = 0xab,
I64ExtendI32S = 0xac,
I64ExtendI32U = 0xad,
I64TruncF32S = 0xae,
I64TruncF32U = 0xaf,
I64TruncF64S = 0xb0,
I64TruncF64U = 0xb1,
F32ConvertI32S = 0xb2,
F32ConvertI32U = 0xb3,
F32ConvertI64S = 0xb4,
F32ConvertI64U = 0xb5,
F32DemoteF64 = 0xb6,
F64ConvertI32S = 0xb7,
F64ConvertI32U = 0xb8,
F64ConvertI64S = 0xb9,
F64ConvertI64U = 0xba,
F64PromoteF32 = 0xbb,
I32ReinterpretF32 = 0xbc,
I64ReinterpretF64 = 0xbd,
F32ReinterpretI32 = 0xbe,
F64ReinterpretI64 = 0xbf,
I32Extend8S = 0xC0,
I32Extend16S = 0xC1,
I64Extend8S = 0xC2,
I64Extend16S = 0xC3,
I64Extend32S = 0xC4,
InterpAlloca = 0xe0,
InterpBrUnless = 0xe1,
InterpCallImport = 0xe2,
InterpData = 0xe3,
InterpDropKeep = 0xe4,
InterpCatchDrop = 0xe5,
InterpAdjustFrameForReturnCall = 0xe6,
I32TruncSatF32S = 0x00,
I32TruncSatF32U = 0x01,
I32TruncSatF64S = 0x02,
I32TruncSatF64U = 0x03,
I64TruncSatF32S = 0x04,
I64TruncSatF32U = 0x05,
I64TruncSatF64S = 0x06,
I64TruncSatF64U = 0x07,
MemoryInit = 0x08,
DataDrop = 0x09,
MemoryCopy = 0x0a,
MemoryFill = 0x0b,
TableInit = 0x0c,
ElemDrop = 0x0d,
TableCopy = 0x0e,
TableGet = 0x25,
TableSet = 0x26,
TableGrow = 0x0f,
TableSize = 0x10,
TableFill = 0x11,
RefNull = 0xd0,
RefIsNull = 0xd1,
RefFunc = 0xd2,
V128Load = 0x00,
V128Load8X8S = 0x01,
V128Load8X8U = 0x02,
V128Load16X4S = 0x03,
V128Load16X4U = 0x04,
V128Load32X2S = 0x05,
V128Load32X2U = 0x06,
V128Load8Splat = 0x07,
V128Load16Splat = 0x08,
V128Load32Splat = 0x09,
V128Load64Splat = 0x0a,
V128Store = 0x0b,
V128Const = 0x0c,
I8X16Shuffle = 0x0d,
I8X16Swizzle = 0x0e,
I8X16Splat = 0x0f,
I16X8Splat = 0x10,
I32X4Splat = 0x11,
I64X2Splat = 0x12,
F32X4Splat = 0x13,
F64X2Splat = 0x14,
I8X16ExtractLaneS = 0x15,
I8X16ExtractLaneU = 0x16,
I8X16ReplaceLane = 0x17,
I16X8ExtractLaneS = 0x18,
I16X8ExtractLaneU = 0x19,
I16X8ReplaceLane = 0x1a,
I32X4ExtractLane = 0x1b,
I32X4ReplaceLane = 0x1c,
I64X2ExtractLane = 0x1d,
I64X2ReplaceLane = 0x1e,
F32X4ExtractLane = 0x1f,
F32X4ReplaceLane = 0x20,
F64X2ExtractLane = 0x21,
F64X2ReplaceLane = 0x22,
I8X16Eq = 0x23,
I8X16Ne = 0x24,
I8X16LtS = 0x25,
I8X16LtU = 0x26,
I8X16GtS = 0x27,
I8X16GtU = 0x28,
I8X16LeS = 0x29,
I8X16LeU = 0x2a,
I8X16GeS = 0x2b,
I8X16GeU = 0x2c,
I16X8Eq = 0x2d,
I16X8Ne = 0x2e,
I16X8LtS = 0x2f,
I16X8LtU = 0x30,
I16X8GtS = 0x31,
I16X8GtU = 0x32,
I16X8LeS = 0x33,
I16X8LeU = 0x34,
I16X8GeS = 0x35,
I16X8GeU = 0x36,
I32X4Eq = 0x37,
I32X4Ne = 0x38,
I32X4LtS = 0x39,
I32X4LtU = 0x3a,
I32X4GtS = 0x3b,
I32X4GtU = 0x3c,
I32X4LeS = 0x3d,
I32X4LeU = 0x3e,
I32X4GeS = 0x3f,
I32X4GeU = 0x40,
F32X4Eq = 0x41,
F32X4Ne = 0x42,
F32X4Lt = 0x43,
F32X4Gt = 0x44,
F32X4Le = 0x45,
F32X4Ge = 0x46,
F64X2Eq = 0x47,
F64X2Ne = 0x48,
F64X2Lt = 0x49,
F64X2Gt = 0x4a,
F64X2Le = 0x4b,
F64X2Ge = 0x4c,
V128Not = 0x4d,
V128And = 0x4e,
V128Andnot = 0x4f,
V128Or = 0x50,
V128Xor = 0x51,
V128BitSelect = 0x52,
V128AnyTrue = 0x53,
V128Load8Lane = 0x54,
V128Load16Lane = 0x55,
V128Load32Lane = 0x56,
V128Load64Lane = 0x57,
V128Store8Lane = 0x58,
V128Store16Lane = 0x59,
V128Store32Lane = 0x5a,
V128Store64Lane = 0x5b,
V128Load32Zero = 0x5c,
V128Load64Zero = 0x5d,
F32X4DemoteF64X2Zero = 0x5e,
F64X2PromoteLowF32X4 = 0x5f,
I8X16Abs = 0x60,
I8X16Neg = 0x61,
I8X16Popcnt = 0x62,
I8X16AllTrue = 0x63,
I8X16Bitmask = 0x64,
I8X16NarrowI16X8S = 0x65,
I8X16NarrowI16X8U = 0x66,
I8X16Shl = 0x6b,
I8X16ShrS = 0x6c,
I8X16ShrU = 0x6d,
I8X16Add = 0x6e,
I8X16AddSatS = 0x6f,
I8X16AddSatU = 0x70,
I8X16Sub = 0x71,
I8X16SubSatS = 0x72,
I8X16SubSatU = 0x73,
I8X16MinS = 0x76,
I8X16MinU = 0x77,
I8X16MaxS = 0x78,
I8X16MaxU = 0x79,
I8X16AvgrU = 0x7b,
I16X8ExtaddPairwiseI8X16S = 0x7c,
I16X8ExtaddPairwiseI8X16U = 0x7d,
I32X4ExtaddPairwiseI16X8S = 0x7e,
I32X4ExtaddPairwiseI16X8U = 0x7f,
I16X8Abs = 0x80,
I16X8Neg = 0x81,
I16X8Q15mulrSatS = 0x82,
I16X8AllTrue = 0x83,
I16X8Bitmask = 0x84,
I16X8NarrowI32X4S = 0x85,
I16X8NarrowI32X4U = 0x86,
I16X8ExtendLowI8X16S = 0x87,
I16X8ExtendHighI8X16S = 0x88,
I16X8ExtendLowI8X16U = 0x89,
I16X8ExtendHighI8X16U = 0x8a,
I16X8Shl = 0x8b,
I16X8ShrS = 0x8c,
I16X8ShrU = 0x8d,
I16X8Add = 0x8e,
I16X8AddSatS = 0x8f,
I16X8AddSatU = 0x90,
I16X8Sub = 0x91,
I16X8SubSatS = 0x92,
I16X8SubSatU = 0x93,
I16X8Mul = 0x95,
I16X8MinS = 0x96,
I16X8MinU = 0x97,
I16X8MaxS = 0x98,
I16X8MaxU = 0x99,
I16X8AvgrU = 0x9b,
I16X8ExtmulLowI8X16S = 0x9c,
I16X8ExtmulHighI8X16S = 0x9d,
I16X8ExtmulLowI8X16U = 0x9e,
I16X8ExtmulHighI8X16U = 0x9f,
I32X4Abs = 0xa0,
I32X4Neg = 0xa1,
I32X4AllTrue = 0xa3,
I32X4Bitmask = 0xa4,
I32X4ExtendLowI16X8S = 0xa7,
I32X4ExtendHighI16X8S = 0xa8,
I32X4ExtendLowI16X8U = 0xa9,
I32X4ExtendHighI16X8U = 0xaa,
I32X4Shl = 0xab,
I32X4ShrS = 0xac,
I32X4ShrU = 0xad,
I32X4Add = 0xae,
I32X4Sub = 0xb1,
I32X4Mul = 0xb5,
I32X4MinS = 0xb6,
I32X4MinU = 0xb7,
I32X4MaxS = 0xb8,
I32X4MaxU = 0xb9,
I32X4DotI16X8S = 0xba,
I32X4ExtmulLowI16X8S = 0xbc,
I32X4ExtmulHighI16X8S = 0xbd,
I32X4ExtmulLowI16X8U = 0xbe,
I32X4ExtmulHighI16X8U = 0xbf,
I64X2Abs = 0xc0,
I64X2Neg = 0xc1,
I64X2AllTrue = 0xc3,
I64X2Bitmask = 0xc4,
I64X2ExtendLowI32X4S = 0xc7,
I64X2ExtendHighI32X4S = 0xc8,
I64X2ExtendLowI32X4U = 0xc9,
I64X2ExtendHighI32X4U = 0xca,
I64X2Shl = 0xcb,
I64X2ShrS = 0xcc,
I64X2ShrU = 0xcd,
I64X2Add = 0xce,
I64X2Sub = 0xd1,
I64X2Mul = 0xd5,
I64X2Eq = 0xd6,
I64X2Ne = 0xd7,
I64X2LtS = 0xd8,
I64X2GtS = 0xd9,
I64X2LeS = 0xda,
I64X2GeS = 0xdb,
I64X2ExtmulLowI32X4S = 0xdc,
I64X2ExtmulHighI32X4S = 0xdd,
I64X2ExtmulLowI32X4U = 0xde,
I64X2ExtmulHighI32X4U = 0xdf,
F32X4Ceil = 0x67,
F32X4Floor = 0x68,
F32X4Trunc = 0x69,
F32X4Nearest = 0x6a,
F64X2Ceil = 0x74,
F64X2Floor = 0x75,
F64X2Trunc = 0x7a,
F64X2Nearest = 0x94,
F32X4Abs = 0xe0,
F32X4Neg = 0xe1,
F32X4Sqrt = 0xe3,
F32X4Add = 0xe4,
F32X4Sub = 0xe5,
F32X4Mul = 0xe6,
F32X4Div = 0xe7,
F32X4Min = 0xe8,
F32X4Max = 0xe9,
F32X4PMin = 0xea,
F32X4PMax = 0xeb,
F64X2Abs = 0xec,
F64X2Neg = 0xed,
F64X2Sqrt = 0xef,
F64X2Add = 0xf0,
F64X2Sub = 0xf1,
F64X2Mul = 0xf2,
F64X2Div = 0xf3,
F64X2Min = 0xf4,
F64X2Max = 0xf5,
F64X2PMin = 0xf6,
F64X2PMax = 0xf7,
I32X4TruncSatF32X4S = 0xf8,
I32X4TruncSatF32X4U = 0xf9,
F32X4ConvertI32X4S = 0xfa,
F32X4ConvertI32X4U = 0xfb,
I32X4TruncSatF64X2SZero = 0xfc,
I32X4TruncSatF64X2UZero = 0xfd,
F64X2ConvertLowI32X4S = 0xfe,
F64X2ConvertLowI32X4U = 0xff,
I8X16RelaxedSwizzle = 0x100,
I32X4RelaxedTruncF32X4S = 0x101,
I32X4RelaxedTruncF32X4U = 0x102,
I32X4RelaxedTruncF64X2SZero = 0x103,
I32X4RelaxedTruncF64X2UZero = 0x104,
F32X4RelaxedMadd = 0x105,
F32X4RelaxedNmadd = 0x106,
F64X2RelaxedMadd = 0x107,
F64X2RelaxedNmadd = 0x108,
I8X16RelaxedLaneSelect = 0x109,
I16X8RelaxedLaneSelect = 0x10a,
I32X4RelaxedLaneSelect = 0x10b,
I64X2RelaxedLaneSelect = 0x10c,
F32X4RelaxedMin = 0x10d,
F32X4RelaxedMax = 0x10e,
F64X2RelaxedMin = 0x10f,
F64X2RelaxedMax = 0x110,
I16X8RelaxedQ15mulrS = 0x111,
I16X8DotI8X16I7X16S = 0x112,
I32X4DotI8X16I7X16AddS = 0x113,
MemoryAtomicNotify = 0x00,
MemoryAtomicWait32 = 0x01,
MemoryAtomicWait64 = 0x02,
AtomicFence = 0x03,
I32AtomicLoad = 0x10,
I64AtomicLoad = 0x11,
I32AtomicLoad8U = 0x12,
I32AtomicLoad16U = 0x13,
I64AtomicLoad8U = 0x14,
I64AtomicLoad16U = 0x15,
I64AtomicLoad32U = 0x16,
I32AtomicStore = 0x17,
I64AtomicStore = 0x18,
I32AtomicStore8 = 0x19,
I32AtomicStore16 = 0x1a,
I64AtomicStore8 = 0x1b,
I64AtomicStore16 = 0x1c,
I64AtomicStore32 = 0x1d,
I32AtomicRmwAdd = 0x1e,
I64AtomicRmwAdd = 0x1f,
I32AtomicRmw8AddU = 0x20,
I32AtomicRmw16AddU = 0x21,
I64AtomicRmw8AddU = 0x22,
I64AtomicRmw16AddU = 0x23,
I64AtomicRmw32AddU = 0x24,
I32AtomicRmwSub = 0x25,
I64AtomicRmwSub = 0x26,
I32AtomicRmw8SubU = 0x27,
I32AtomicRmw16SubU = 0x28,
I64AtomicRmw8SubU = 0x29,
I64AtomicRmw16SubU = 0x2a,
I64AtomicRmw32SubU = 0x2b,
I32AtomicRmwAnd = 0x2c,
I64AtomicRmwAnd = 0x2d,
I32AtomicRmw8AndU = 0x2e,
I32AtomicRmw16AndU = 0x2f,
I64AtomicRmw8AndU = 0x30,
I64AtomicRmw16AndU = 0x31,
I64AtomicRmw32AndU = 0x32,
I32AtomicRmwOr = 0x33,
I64AtomicRmwOr = 0x34,
I32AtomicRmw8OrU = 0x35,
I32AtomicRmw16OrU = 0x36,
I64AtomicRmw8OrU = 0x37,
I64AtomicRmw16OrU = 0x38,
I64AtomicRmw32OrU = 0x39,
I32AtomicRmwXor = 0x3a,
I64AtomicRmwXor = 0x3b,
I32AtomicRmw8XorU = 0x3c,
I32AtomicRmw16XorU = 0x3d,
I64AtomicRmw8XorU = 0x3e,
I64AtomicRmw16XorU = 0x3f,
I64AtomicRmw32XorU = 0x40,
I32AtomicRmwXchg = 0x41,
I64AtomicRmwXchg = 0x42,
I32AtomicRmw8XchgU = 0x43,
I32AtomicRmw16XchgU = 0x44,
I64AtomicRmw8XchgU = 0x45,
I64AtomicRmw16XchgU = 0x46,
I64AtomicRmw32XchgU = 0x47,
I32AtomicRmwCmpxchg = 0x48,
I64AtomicRmwCmpxchg = 0x49,
I32AtomicRmw8CmpxchgU = 0x4a,
I32AtomicRmw16CmpxchgU = 0x4b,
I64AtomicRmw8CmpxchgU = 0x4c,
I64AtomicRmw16CmpxchgU = 0x4d,
I64AtomicRmw32CmpxchgU = 0x4e,
    Invalid = 'invalid',
};
}
class Opcode {
    constructor() { }
    static constructor1(e: OpcodeType) {
        this.enum_ = e;
    }
    Enum(): operator {
        return this.enum_;
    }
    static FromCode(uint32_t): Opcode;
    static FromCode(uint8_t prefix, uint32_t code): Opcode;
    HasPrefix(): boolean { return GetInfo().prefix != 0; }
    GetPrefix(): number { return GetInfo().prefix; }
    GetCode(): number { return GetInfo().code; }
    GetLength(): number { return GetBytes().size(); }
    GetName(): string { return GetInfo().name; }
    GetDecomp(): string {
        return * GetInfo().decomp ? GetInfo().decomp : GetInfo().name;
    }
Type GetResultType() const { return GetInfo().result_type; }
Type GetParamType1() const { return GetInfo().param_types[0]; }
Type GetParamType2() const { return GetInfo().param_types[1]; }
Type GetParamType3() const { return GetInfo().param_types[2]; }
Type GetParamType(int n) const { return GetInfo().param_types[n - 1]; }
Address GetMemorySize() const { return GetInfo().memory_size; }
std:: vector < uint8_t > GetBytes() const ;
uint32_t GetSimdLaneCount() const ;
bool IsNaturallyAligned(Address alignment) const ;
Address GetAlignment(Address alignment) const ;
static bool IsPrefixByte(uint8_t byte) {
    return byte == kMathPrefix || byte == kThreadsPrefix || byte == kSimdPrefix;
}
bool IsEnabled(const Features& features) const ;
bool IsInvalid() const { return enum_ >= Invalid; }
private:
static constexpr uint32_t kMathPrefix = 0xfc;
static constexpr uint32_t kThreadsPrefix = 0xfe;
static constexpr uint32_t kSimdPrefix = 0xfd;
struct Info {
    const char* name;
    const char* decomp;
  Type result_type;
  Type param_types[3];
  Address memory_size;
  uint8_t prefix;
  uint32_t code;
  uint32_t prefix_code;
};
static uint32_t PrefixCode(uint8_t prefix, uint32_t code) {
    if (code >= (1 << MAX_OPCODE_BITS)) {
        code = (1 << MAX_OPCODE_BITS) - 1;
    }
    return (prefix << MAX_OPCODE_BITS) | code;
}
static Enum EncodeInvalidOpcode(uint32_t prefix_code) {
  Enum result = static_cast<Enum>(~prefix_code + 1);
    assert(result >= Invalid);
    return result;
}
static void DecodeInvalidOpcode(Enum e,
    uint8_t * out_prefix,
    uint32_t * out_code) {
  uint32_t prefix_code = ~static_cast<uint32_t>(e) + 1;
  * out_prefix = prefix_code >> MAX_OPCODE_BITS;
  * out_code = prefix_code & 0xff;
}
Info GetInfo() const ;
static Info infos_[];
Enum enum_;
};
inline Opcode Opcode:: FromCode(uint32_t code) {
    return FromCode(0, code);
}
inline Opcode Opcode:: FromCode(uint8_t prefix, uint32_t code) {
uint32_t prefix_code = PrefixCode(prefix, code);
    if (WABT_LIKELY(prefix_code < WABT_ARRAY_SIZE(WabtOpcodeCodeTable))) {
  uint32_t value = WabtOpcodeCodeTable[prefix_code];
        if (WABT_LIKELY(value != 0 || code == 0)) {
            return Opcode(static_cast<Enum>(value));
        }
    }
    return Opcode(EncodeInvalidOpcode(prefix_code));
}
}
export { OpcodeType };

