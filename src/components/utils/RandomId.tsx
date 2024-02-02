export function generateRandomId(sub: string) {
    const timestamp = new Date().getTime().toString(16);
    const randomString1 = Math.random().toString(36).substring(2, 8);
    const randomString2 = Math.random().toString(36).substring(2, 8);
    return sub + timestamp + randomString1 + randomString2;
}