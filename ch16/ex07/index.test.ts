import { checkEntry } from "./index.ts";

describe("test checkEntry()", () => {
  it("fixture is a file", async () => {
    const fileType = await checkEntry("ch16/ex07/fixture/fileFixture.txt");
    expect(fileType).toEqual("file");
  });
  it("fixture is a directory", async () => {
    const fileType = await checkEntry("ch16/ex07/fixture/dirFixture");
    expect(fileType).toEqual("directory");
  });
  it("fixture is a symbolic link", async () => {
    const fileType = await checkEntry("ch16/ex07/fixture/linkToFileFixture.txt");
    expect(fileType).toEqual("something else");
  });
  it("fixture is invalid", async () => {
    await expect(checkEntry("fixture/noExistenceFixture")).rejects.toThrow(Error);
  });
});
