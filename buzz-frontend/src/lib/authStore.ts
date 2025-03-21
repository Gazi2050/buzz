import { browser } from "$app/environment";
import { writable } from "svelte/store";

const storedAuth = browser ? localStorage.getItem("isAuthenticated") === "true" : false;
const storedUser = browser ? localStorage.getItem("currentUser") : null;

export const isAuthenticated = writable(storedAuth);
export const currentUser = writable<string | null>(storedUser);

if (browser) {
    isAuthenticated.subscribe((value) => localStorage.setItem("isAuthenticated", value.toString()));
    currentUser.subscribe((value) => localStorage.setItem("currentUser", value || ""));
}