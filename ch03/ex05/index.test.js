import { crlfToLf, lfToCrlf } from "./index.js";

describe("EOL conversion", () => {
  describe("crlf to lf", () => {
    it("check if conversion CRLF to LF is correctly implemented", () => {
      let input = "This is the first line.\r\nThis is the second line.";
      expect(crlfToLf(input).includes("\r\n")).toBe(false);
    });
  });

  describe("lf to crlf", () => {
    it("check if conversion LF to CRLF is correctly implemented", () => {
      let input = "This is the first line.\nThis is the second line.";
      expect(lfToCrlf(input).includes("\r\n")).toBe(true);
    });
  });
});
