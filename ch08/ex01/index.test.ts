import { showStringsRepeatedly, calcSquaredNumber, createObjectWithDate } from "./index.ts";

describe("Return an array of strings and output the strings for a specified number of times", () =>{
    it("showStringsRepeatedly()", () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        const result = showStringsRepeatedly(3, "hi")
        expect(result).toEqual(["hi", "hi", "hi"]);
        expect(logSpy).toHaveBeenCalledTimes(3);
        expect(logSpy).toHaveBeenNthCalledWith(1, "hi");
        expect(logSpy).toHaveBeenNthCalledWith(2, "hi");
        expect(logSpy).toHaveBeenNthCalledWith(3, "hi");
    });
}) 

describe("Return the squared number for an input", () =>{
    it("calcSquaredNumber()", () => {
        const result = calcSquaredNumber(3)
        expect(result).toEqual(9);
    });
}) 

describe("Return an object includes Date", () =>{
    it("createObjectWithDate()", () => {
        const result = createObjectWithDate()
        expect(result).toEqual({"now": expect.any(Date)});
    });
}) 