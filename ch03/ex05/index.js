export function crlfToLf(input) {
    return input.replaceAll("\r\n", "\n");
}

export function lfToCrlf(input) {
    return input.replaceAll("\n", "\r\n");
}

let input_string = "This is a test sentence.\nThis is the second line."

console.log(input_string);
console.log(crlfToLf(input_string));
