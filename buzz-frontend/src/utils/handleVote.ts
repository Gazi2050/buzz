import { storedUser } from "$lib/authStore";
import { voteOnPost } from "./voteOnPost";

export const handleUpVote = async (postId: string) => {
    const voteData = {
        postId: postId,
        username: storedUser,
        type: "up",
    };
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const result = await voteOnPost(voteData);
        // console.log(result);
    } catch (error) {
        console.error("Failed to upvote:", error);
    }
};

export const handleDownVote = async (postId: string) => {
    const voteData = {
        postId: postId,
        username: storedUser,
        type: "down",
    };
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const result = await voteOnPost(voteData);
        // console.log(result);
    } catch (error) {
        console.error("Failed to upvote:", error);
    }
};