export function toBRL(value: string | number): string {
    return Number(value).toLocaleString("pr-br", {style: "currency", currency: "BRL"});
}