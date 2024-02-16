export function makeHeader(token: string) {
    const header = {
        Authorization: `Bearer ${token}`
    };
    return header;
}
