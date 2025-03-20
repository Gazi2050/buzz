const apiUrl = import.meta.env.VITE_USERNAME_GENERATE_API_URL;
const apiKey = import.meta.env.VITE_USERNAME_GENERATE_API_KEY;

export async function generateUsername(): Promise<string> {
    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "X-Api-Key": apiKey,
            },
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        const randomNum = Math.floor(Math.random() * 990) + 10;
        return `${data.username}_${randomNum}`;
    } catch (error) {
        console.error("Failed to generate username:", error);
        const randomNum = Math.floor(Math.random() * 990) + 10;
        return `user_${randomNum}`;
    }
}