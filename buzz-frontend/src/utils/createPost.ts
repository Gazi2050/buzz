import type { Post } from "$lib/type";
import { POSTS_API_URL } from "$lib/url";

export async function createPost(postData: Post): Promise<boolean> {
    try {
        const response = await fetch(POSTS_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        });

        if (!response.ok) {
            throw new Error("Failed to create post");
        }

        return true; // Success
    } catch (error) {
        console.error("Post error:", error);
        return false; // Failure
    }
}
