import { showStringsRepeatedly, calcSquaredNumber, createObjectWithDate } from "./index.ts";

describe("showStringsRepeatedly()のテスト", () => {
    it("showStringsRepeatedly()の正常動作", () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
        const inputStr = "Hello";
        const inputNumber = 10;
        const expectResult = [];
        const result = showStringsRepeatedly(inputNumber, inputStr)
        for (let i = 0; i < inputNumber; i++) {
            expectResult.push(inputStr);
            expect(logSpy).toHaveBeenNthCalledWith(i + 1, inputStr);
        }
        expect(result).toEqual(expectResult);
        expect(logSpy).toHaveBeenCalledTimes(inputNumber);
    });
    it("showStringsRepeatedly()の繰り返し回数0回", () => {
        const result = showStringsRepeatedly(0, "Hello")
        expect(result).toEqual([]);
    });
    it("showStringsRepeatedly()の繰り返し回数NaN: Error", () => {
        expect(() => showStringsRepeatedly(NaN, "Hello")).toThrow(Error);
    });
    it("showStringsRepeatedly()の繰り返し回数が整数でない: Error", () => {
        expect(() => showStringsRepeatedly(5.4, "Hello")).toThrow(Error);
    });
})

describe("calcSquaredNumber()のテスト", () => {
    it("calcSquaredNumber()", () => {
        const x = 3;
        expect(calcSquaredNumber(x)).toEqual(x ** 2);
    });
})

describe("createObjectWithDate()のテスト", () => {
    it("createObjectWithDate()", () => {
        expect(createObjectWithDate()).toEqual({ "now": expect.any(Date) });
    });
}) 