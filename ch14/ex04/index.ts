export class HiraGana {
    #letter;
    #unicode;
    constructor(letter: string) {
        if (letter.length !== 1) {
            throw new Error(`input should be one letter: ${letter}`)
        }
        if (!letter.match(/[\u3041-\u3096]/)) {
            throw new Error(`input should be Hiragana: ${letter}`)
        }
        this.#letter = letter;
        this.#unicode = letter.charCodeAt(0);
    }
    [Symbol.toPrimitive](hint: number | string) {
        console.log(hint);
        if (hint === "number") {
            return this.#unicode;
        }
        // string と defaultの場合
        return this.#letter;
    }
}

