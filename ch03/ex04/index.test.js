describe("", () => {
    it("check the length of 'Hundred Points Symbol'", () => {        
        expect("💯".length).toBe(2);
    });
    it("check if two values are the same", () => {        
        expect("\uD83D\uDCAF".length === "\u{0001F4AF}".length).toBe(true);
    });
});