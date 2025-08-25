export class IgnoreAccentPattern {
    #regexBody: string;
    #flags: string = "u";
    #regexp: RegExp;

    constructor(input: string | RegExp) {
        if (typeof input === "string") {
            this.#regexBody = input;
        } else {
            this.#regexBody = input.source;  // 正規表現の中身
            this.#flags = input.flags;  // 正規表現のフラグ
        }
        const pattern = this.removeDiaCriticals(this.#regexBody);
        this.#regexp = new RegExp(pattern, this.#flags);
    }

    [Symbol.search](s: string) {
        const normalized = this.removeDiaCriticals(s);
        return normalized.search(this.#regexp);
    }

    [Symbol.match](s: string) {
        const normalized = this.removeDiaCriticals(s);
        return normalized.match(this.#regexp);
    }

    private removeDiaCriticals(s: string): string {
        return s.normalize("NFD").replace(/[\u0300-\u036f]/gu, "");
    }
}
