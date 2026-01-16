import { checkEntry } from "./index.ts";

describe("test checkEntry()", () => {
  it("fixtureがfileの場合", async () => {
    const fileType = await checkEntry("ch16/ex07/fixture/fileFixture.txt");
    expect(fileType).toEqual("file");
  });
  it("fixtureがdirectoryの場合", async () => {
    const fileType = await checkEntry("ch16/ex07/fixture/dirFixture");
    expect(fileType).toEqual("directory");
  });
  it("fixtureがsymbolic linkの場合", async () => {
    const fileType = await checkEntry(
      "ch16/ex07/fixture/linkToFileFixture.txt",
    );
    expect(fileType).toEqual("something else");
  });
  it("fixtureが存在しない場合", async () => {
    await expect(checkEntry("fixture/noExistenceFixture")).rejects.toThrow(
      Error,
    );
  });
});
