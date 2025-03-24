import { storedUser } from "$lib/authStore";
import type { Auth } from "$lib/type";
import { USERS_API_URL } from "$lib/url";
export async function fetchUsers() {
    try {
        const response = await fetch(USERS_API_URL);
        if (!response.ok) {
            console.error("Fetch failed:", response.status, response.statusText);
            throw new Error("Network response was not ok");
        }

        const users = await response.json();
        // console.log("Fetched users:", users);
        // console.log("Stored User:", storedUser);

        if (!storedUser) {
            console.warn("No storedUser available.");
            return null;
        }
        const foundUser = users.find((user: Auth) => user?.username === storedUser);
        // console.log("Matched User:", foundUser);
        return foundUser || null;
    } catch (error) {
        console.error("Error fetching users:", error);
        return null;
    }
}
