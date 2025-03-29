import { POSTS_API_URL } from "$lib/url";

export async function fetchMyPost(username: string | null) {
    try {
        const response = await fetch(`${POSTS_API_URL}/${username}`)
        if (!response.ok) {
            console.error("Fetch failed:", response.status, response.statusText);
            throw new Error("Network response was not ok");
        }
        const posts = await response.json();
        console.log("Fetched users:", posts);
        return posts || null;
    } catch (error) {
        console.error("Error fetching posts:", error);
        return null;
    }
}