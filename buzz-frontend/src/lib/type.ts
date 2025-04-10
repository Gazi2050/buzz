export interface Auth {
    _id?: string
    username: string;
    password: string;
    profileColor?: string;
};
export interface Post {
    _id?: string;
    username: string;
    profileColor: string;
    title: string;
    description: string;
    time: string;
    vote: {
        upvote: number;
        downvote: number;
        voter?: { username?: string, type?: string }[];
    };
    comments?: { username?: string; profileColor?: string; text?: string; time?: string }[];
}

export interface VoteData {
    postId: string;
    username: string | null;
    type: string
}

export interface CommentData {
    postId: string;
    username: string;
    profileColor: string;
    text: string;
    time: string;
}

export type Position = "top" | "bottom" | "left" | "right";
