export function crlfToLf(input) {
    return input.replaceAll("\r\n", "\n");
}

export function lfToCrlf(input) {
    return input.replaceAll("\n", "\r\n");
}