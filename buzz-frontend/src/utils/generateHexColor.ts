export function generateHexColor(): string {
    let color = '#';

    do {
        const letters = '0123456789ABCDEF';
        color = '#';

        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
    } while (color === '#000000');

    return color;
}
