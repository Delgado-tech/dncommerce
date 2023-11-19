export function randomHexColor(): string {
    const hex = "0123456789ABCDEF";
    let hexColor = "#";

    for (let i = 0; i < 6; i++) {
        hexColor += hex[Math.floor(Math.random() * 16)];
    }
    
    return hexColor;
}