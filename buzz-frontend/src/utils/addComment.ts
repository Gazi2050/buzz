import type { CommentData } from "$lib/type";
import { COMMENT_API_URL } from "$lib/url";
import { fetchUsers } from "./fetchUsers";

export async function addComment(data: CommentData): Promise<CommentData> {
    try {
        // Basic input validation
        if (!data.postId) {
            throw new Error("postId is required to add a comment");
        }

        // Fetch user data
        const userData = await fetchUsers();
        if (!userData || !userData.username || !userData.userColor) {
            throw new Error("User data incomplete. Unable to add comment.");
        }

        // Construct request payload
        const requestData = {
            postId: data.postId,
            username: userData.username,
            userColor: userData.userColor,
            text: data.text,
            time: data.time,
        };

        console.log(requestData);
        const url = `${COMMENT_API_URL}/${data.postId}`;

        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to add comment: ${response.status} - ${errorText}`);
        }

        const result = await response.json();
        // Optional: Add runtime type checking here if needed
        return result as CommentData;
    } catch (error) {
        console.error("Error adding comment:", error);
        throw error;
    }
}