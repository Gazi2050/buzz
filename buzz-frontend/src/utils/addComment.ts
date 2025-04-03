import { COMMENT_API_URL } from "$lib/url";
import moment from "moment";
import { fetchUsers } from "./fetchUsers";
import { page } from "$app/state";
import type { CommentData } from "$lib/type";

export async function addComment(text: string): Promise<void> {
    try {
        // Fetch user data
        const user = await fetchUsers();
        const { username, profileColor } = user;

        // Prepare comment data
        const time = moment().utc().toISOString();
        const postId = page.params.slug;
        const commentData: CommentData = {
            postId,
            username,
            profileColor,
            text,
            time,
        };
        const response = await fetch(`${COMMENT_API_URL}/${postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(commentData),
        });
        if (!response.ok) {
            throw new Error(`Failed to add comment: ${response.status} ${response.statusText}`);
        }
        console.log("Comment added:", commentData);
    } catch (error) {
        console.error("Error in addComment:", error);
        throw error;
    }
}