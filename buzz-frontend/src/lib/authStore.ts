import { browser } from "$app/environment";
import { writable } from "svelte/store";

// Initialize with defaults if not in browser (SSR)
const storedAuth = browser ? localStorage.getItem("isAuthenticated") === "true" : false;
const storedUser = browser ? localStorage.getItem("currentUser") : null;

export const isAuthenticated = writable(storedAuth);
export const currentUser = writable<string | null>(storedUser);

// Only update localStorage in the browser
if (browser) {
    isAuthenticated.subscribe((value) => localStorage.setItem("isAuthenticated", value.toString()));
    currentUser.subscribe((value) => localStorage.setItem("currentUser", value || ""));
}