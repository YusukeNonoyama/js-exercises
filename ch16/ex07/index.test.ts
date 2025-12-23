import { checkEntry } from "./index.ts";

describe("test checkEntry()", () => {
  it("fixture is a file", () => {
    const fileType = checkEntry("ch16/ex07/fixture/fileFixture.txt");
    expect(fileType).toEqual("file");
  });
  it("fixture is a directory", () => {
    const fileType = checkEntry("ch16/ex07/fixture/dirFixture");
    expect(fileType).toEqual("directory");
  });
  it("fixture is invalid", () => {
    expect(() => checkEntry("fixture/noExistenceFixture")).toThrow(Error);
  });
});
