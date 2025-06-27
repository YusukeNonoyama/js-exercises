type URLObj = {
    base: string,
    addQuery?: string[][],
    path?: string,
}

export function modifyUrl(obj: URLObj) {
    const url = new URL(obj.base)
    if (obj.path) {
        url.pathname = obj.path;
    }
    if (obj.addQuery) {
        for (const query of obj.addQuery) {
            url.searchParams.append(query[0], query[1]);
        }
    }
    return url.toString();
}