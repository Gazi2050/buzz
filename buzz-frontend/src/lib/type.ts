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
    vote: { upvote: number; downvote: number };
    comments?: { username?: string; text?: string; time?: string }[];
}
