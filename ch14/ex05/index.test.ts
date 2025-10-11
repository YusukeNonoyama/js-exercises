import { templateToStringWithType } from "./index.ts";

describe("templateToStringWithType()", () => {
  test("補完値なし", () => {
    expect(templateToStringWithType`no interpolations`).toBe("no interpolations");
  });
  test("補完値がstring", () => {
    expect(templateToStringWithType`${"A"}`).toBe("string");
  });
  test("補完値がobject", () => {
    expect(templateToStringWithType`${{ x: 1 }}`).toBe("object");
  });
  test("補完値がnumber", () => {
    expect(templateToStringWithType`${100}`).toBe("number");
  });
  test("補完値と他の文字列含む", () => {
    expect(
      templateToStringWithType`Type of the parameter is ${{ x: 1 }}.`,
    ).toBe("Type of the parameter is object.");
  });
});
