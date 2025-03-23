<script lang="ts">
    import { goto } from "$app/navigation";
    import { currentUser, isAuthenticated } from "$lib/authStore";
    import type { Auth } from "$lib/type";
    import AuthForm from "@components/AuthForm.svelte";
    import { signin } from "@utils/auth";
    import { toast } from "svelte-sonner";
    let username = "";
    let password = "";

    async function handleSubmit({ username, password }: Auth) {
        // console.log("Sign In submitted:", { username, password });
        const user = await signin({ username, password });
        if (user) {
            $isAuthenticated = true;
            $currentUser = user.username;
            toast.success(`Sign-in successful! Welcome back, ${user.username}`);
            goto("/");
        } else {
            toast.error("User does not exist, please signup");
            goto("/sign-up");
        }
    }
</script>

<AuthForm authType="signin" {username} {password} onSubmit={handleSubmit} />
