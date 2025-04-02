import { env } from "$env/dynamic/public";

export const USERS_API_URL = env.PUBLIC_USER_API;
export const POSTS_API_URL = env.PUBLIC_POST_API;
export const VOTING_API_URL = env.PUBLIC_VOTING_API;
export const COMMENT_API_URL = env.PUBLIC_COMMENT_API;