import { Bar } from "../../ch10/ex04/module.ts";
import { TypeMap } from "./index.ts"

class Foo { }

describe("TypeMap", () => {
    test("Test get()", () => {
        const a = [
            [String, "hello"],
            [Number, 123],
            [Boolean, true],
            [Foo, new Foo()],
        ]
        const typeMap = new TypeMap(a);
        expect(typeMap.get(String)).toEqual("hello");
        expect(typeMap.get(Number)).toEqual(123);
        expect(typeMap.get(Boolean)).toEqual(true);
        expect(typeMap.get(Foo)).toEqual(new Foo());
    });
    test("Test set()", () => {
        const typeMap = new TypeMap();
        // typeMap.set(String, "hello")
        // typeMap.set(Number, 123)
        typeMap.set(Boolean, true)
        typeMap.set(Foo, new Foo())
        // expect(typeMap.get(String)).toEqual("hello");
        // expect(typeMap.get(Number)).toEqual(123);
        expect(typeMap.get(Boolean)).toEqual(true);
        expect(typeMap.get(Foo)).toEqual(new Foo());
    });
    test("Test set() error", () => {
        const typeMap = new TypeMap();
        expect(() => typeMap.set(String, 123)).toThrow(TypeError);
        expect(() => typeMap.set(String, Boolean)).toThrow(TypeError);
        expect(() => typeMap.set(Foo, 123)).toThrow(TypeError);
        // expect(() => typeMap.set(Foo, new Bar())).toThrow(TypeError);
    });
});
