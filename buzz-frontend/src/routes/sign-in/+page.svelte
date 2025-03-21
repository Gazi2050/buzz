<script lang="ts">
    import { goto } from "$app/navigation";
    import { currentUser, isAuthenticated } from "$lib/authStore";
    import type { Auth } from "$lib/type";
    import AuthForm from "@components/AuthForm.svelte";
    import { signin } from "@utils/auth";
    let username = "";
    let password = "";

    // function handleSubmit({ username, password }: Auth) {
    //     console.log("Sign Up submitted:", { username, password });
    // }

    async function handleSubmit({ username, password }: Auth) {
        console.log("Sign In submitted:", { username, password });
        const user = await signin({ username, password });
        if (user) {
            // User exists: sign in
            $isAuthenticated = true;
            $currentUser = user.username;
            alert("Signin successful! Welcome, " + user.username);
            goto("/");
        } else {
            // User does not exist: alert and redirect to signup
            alert("User does not exist, please signup");
            goto("/signup");
        }
    }
</script>

<AuthForm authType="signin" {password} {username} onSubmit={handleSubmit} />
