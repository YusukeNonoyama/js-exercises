import { parseJson } from "./index.js";

let test_array = [
    ['{"name": "Hiroshi", "age": 72}', `{success: true, data: {"name":"Hiroshi","age":72}}`],
    ['{"customer id": 101, "order": {"1": "apple", "2": "salmon"}}', `{success: true, data: {"customer id":101,"order":{"1":"apple","2":"salmon"}}}`],
    ["This is not JSON", `{success: false, data: Unexpected token 'T', "This is not JSON" is not valid JSON}`],
    [10, "{success: true, data: 10}"],
    [true, "{success: true, data: true}"],
    [null, "{success: true, data: null}"],
]

describe("Omit odd number from object", () => {
    test.each(test_array)("Normal: %s => %s", (input, expected) => {
        expect(parseJson(input)).toBe(expected);        
    });
});