import { browser } from "$app/environment";
import { writable } from "svelte/store";

export const storedAuth = browser
    ? (() => {
        try {
            const auth = localStorage.getItem("isAuthenticated");
            return auth === "true";
        } catch (e) {
            console.error("Error reading isAuthenticated from localStorage:", e);
            return false;
        }
    })()
    : false;

export const storedUser = browser
    ? (() => {
        try {
            const user = localStorage.getItem("currentUser");
            return user === "null" ? null : user;
        } catch (e) {
            console.error("Error reading currentUser from localStorage:", e);
            return null;
        }
    })()
    : null;

export const isAuthenticated = writable<boolean>(storedAuth);
export const currentUser = writable<string | null>(storedUser);

if (browser) {
    isAuthenticated.subscribe((value) => {
        try {
            localStorage.setItem("isAuthenticated", value.toString());
        } catch (e) {
            console.error("Error writing isAuthenticated to localStorage:", e);
        }
    });

    currentUser.subscribe((value) => {
        try {
            localStorage.setItem("currentUser", value === null ? "null" : value);
        } catch (e) {
            console.error("Error writing currentUser to localStorage:", e);
        }
    });
}
