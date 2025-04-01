import type { VoteData } from "$lib/type";
import { VOTING_API_URL } from "$lib/url";

export async function voteOnPost(data: VoteData) {
    try {
        const response = await fetch(`${VOTING_API_URL}/${data.postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: data.username, type: data.type }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to update vote');
        }
        return await response.json();
    } catch (error) {
        console.error('Error voting on post:', error);
        return null;
    }
}