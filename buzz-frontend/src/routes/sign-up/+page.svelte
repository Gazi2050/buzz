<script lang="ts">
    import { goto } from "$app/navigation";
    import { currentUser, isAuthenticated } from "$lib/authStore";
    import type { Auth } from "$lib/type";
    import AuthForm from "@components/AuthForm.svelte";
    import { signin, signup } from "@utils/auth";

    let username = "";
    let password = "";

    // function handleSubmit({ username, password }: Auth) {
    //     console.log("Sign Up submitted:", { username, password });
    // }

    async function handleSubmit({ username, password }: Auth) {
        console.log("Sign Up submitted:", { username, password });
        const success = await signup({ username, password });
        if (success) {
            // Signup successful, now auto-signin
            const user = await signin({ username, password });
            if (user) {
                $isAuthenticated = true; // Update auth state
                $currentUser = user.username;
                alert("Signup successful! Welcome, " + user.username);
                goto("/"); // Redirect to home page
            } else {
                // This shouldn't happen, but handle it just in case
                alert(
                    "Signup succeeded, but auto-signin failed. Please sign in manually.",
                );
                goto("/signin");
            }
        } else {
            alert(
                "Signup failed. Username might be taken or there was an error.",
            );
        }
    }
</script>

<AuthForm authType="signup" {password} {username} onSubmit={handleSubmit} />
