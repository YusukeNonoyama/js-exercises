export function sequenceToObject(...args: (string | number)[]) {
    const obj: Record<string, any> = {};
    if (args.length % 2 !== 0) {
        throw new Error(`array length should be even: ${args.length}`);
    }
    for (let i = 0; i < args.length; i += 2) {
        if (typeof args[i] !== "string") {
            throw Error(`type of input in odd index for array should be string: ${args[i]}`);
        }
        obj[args[i]] = args[i + 1];
    }
    return obj;
}

