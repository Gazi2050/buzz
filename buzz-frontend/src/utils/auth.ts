import { goto } from "$app/navigation";
import { currentUser, isAuthenticated } from "$lib/authStore";
import type { Auth } from "$lib/type";
import { USERS_API_URL } from "$lib/url";
import { toast } from "svelte-sonner";


export async function signup(credentials: Auth): Promise<boolean> {
    try {
        const response = await fetch(USERS_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            throw new Error("Failed to create user");
        }

        return true; // Success
    } catch (error) {
        console.error("Signup error:", error);
        return false; // Failure
    }
}

// Sign In
export async function signin(credentials: Auth): Promise<{ username: string } | null> {
    try {
        const response = await fetch(USERS_API_URL);
        if (!response.ok) {
            return null;
        }
        const users = await response.json();
        if (!Array.isArray(users) || users.length === 0) {
            return null;
        }

        const matchingUser = users.find(
            (user: { username: string; password: string }) =>
                user.username === credentials.username && user.password === credentials.password
        );

        if (!matchingUser) {
            return null;
        }

        currentUser.set(matchingUser.username);
        isAuthenticated.set(true);

        return { username: matchingUser.username };
    } catch (error) {
        console.error("Signin error:", error);
        return null;
    }
}

// Sign Out
export function signout(): void {
    isAuthenticated.set(false);
    currentUser.set(null);
    toast("Signed out successfully!");
    // Log the current store value instead of storedUser
    // console.log(typeof get(currentUser), get(currentUser));
    goto("/");
}

export async function deleteUser(credentials: { username: string }): Promise<{ username: string } | null> {
    const usersResponse = await fetch(USERS_API_URL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    if (!usersResponse.ok) return null;

    const users = await usersResponse.json();
    const user = users.find((u: Auth) => u.username === credentials.username);

    if (!user) return null;

    const deleteResponse = await fetch(`${USERS_API_URL}/${user._id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });

    return deleteResponse.ok ? { username: credentials.username } : null;
}