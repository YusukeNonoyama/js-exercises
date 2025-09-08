import { writeFileSync, unlinkSync, existsSync } from "node:fs";
import { readLines } from "./index.ts";
import * as fs from "node:fs";

const TEST_FILE = "./test_input.txt";
jest.spyOn(fs, "closeSync");

describe("readLines()", () => {
  beforeEach(() => {
    (fs.closeSync as jest.Mock).mockClear();
  });
  afterEach(() => {
    if (existsSync(TEST_FILE)) unlinkSync(TEST_FILE);
  });

  test("最後までループして終了", () => {
    const content = `line 1\nline 2\nline 3`;
    writeFileSync(TEST_FILE, content, "utf8");
    const lines = [...readLines(TEST_FILE)];
    expect(lines).toEqual(["line 1", "line 2", "line 3"]);
    expect(fs.closeSync).toHaveBeenCalled();
  });

  test("途中でbreakして終了", () => {
    const content = `line 1\nline 2\nline 3`;
    writeFileSync(TEST_FILE, content, "utf8");

    const iter2 = readLines(TEST_FILE);
    let count = 0;
    const lines = [];
    for (const value of iter2) {
      lines.push(value);
      if (count >= 1) {
        break;
      }
      count++;
    }
    expect(lines).toEqual(["line 1", "line 2"]);
    expect(fs.closeSync).toHaveBeenCalled();
  });

  test("途中でthrowして終了", () => {
    const content = `line 1\nline 2\nline 3`;
    writeFileSync(TEST_FILE, content, "utf8");

    const iter2 = readLines(TEST_FILE);
    let count = 0;
    const lines = [];
    for (const value of iter2) {
      lines.push(value);
      if (count >= 1) {
        iter2.throw("stop iteration");
      }
      count++;
    }
    expect(lines).toEqual(["line 1", "line 2"]);
    expect(fs.closeSync).toHaveBeenCalled();
  });

  test("バッファ以上の長さの区切りを持つ場合", () => {
    const longLine = "0123456789".repeat(50);
    const content = `${longLine}\nsecond line\n${longLine}`;
    writeFileSync(TEST_FILE, content, "utf8");

    const lines = Array.from(readLines(TEST_FILE));
    expect(lines).toEqual([longLine, "second line", longLine]);
    expect(fs.closeSync).toHaveBeenCalled();
  });
});
