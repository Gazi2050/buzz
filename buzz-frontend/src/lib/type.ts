export interface Auth {
    id?: string
    username: string;
    password: string;
    profileColor?: string;
};
export interface Post {
    title: string;
    description: string;
    time?: Date;
    vote?: { upvote: number; downvote: number };
    comments?: { username: string; text: string; time?: Date }[];
}
