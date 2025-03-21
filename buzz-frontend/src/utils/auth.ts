// src/utils/auth.ts
import { env } from "$env/dynamic/public";
import { currentUser, isAuthenticated } from "$lib/authStore";
import type { Auth } from "$lib/type";

const API_URL = env.PUBLIC_USER_API;

// Sign Up: Post user data to backend
export async function signup(credentials: Auth): Promise<boolean> {
    try {
        const response = await fetch(API_URL, {
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

// Sign In: Check if user exists
export async function signin(credentials: Auth): Promise<{ username: string } | null> {
    try {
        const response = await fetch(`${API_URL}?username=${credentials.username}&password=${credentials.password}`);
        if (!response.ok) {
            return null;
        }
        const users = await response.json();
        if (!Array.isArray(users) || users.length === 0) {
            return null; // No users found
        }

        // Find a user that matches both username and password
        const matchingUser = users.find(
            (user: { username: string; password: string }) =>
                user.username === credentials.username && user.password === credentials.password
        );

        if (!matchingUser) {
            return null; // No matching user
        }

        return { username: matchingUser.username };
    } catch (error) {
        console.error("Signin error:", error);
        return null;
    }
}

// Sign Out: Reset auth state using store.set()
export function signout(): void {
    isAuthenticated.set(false); // Reset authenticated state
    currentUser.set(null); // Clear current user
    alert("Signed out successfully!"); // Show browser alert
}