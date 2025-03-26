export function truncateText(text: string, limit: number = 100) {
    if (text.length >= limit) {
        const truncateString = text.slice(0, limit) + "..."
        return truncateString
    }
}