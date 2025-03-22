<script lang="ts">
    import { goto } from "$app/navigation";
    import { currentUser, isAuthenticated } from "$lib/authStore";
    import type { Auth } from "$lib/type";
    import AuthForm from "@components/AuthForm.svelte";
    import { signin, signup } from "@utils/auth";
    import { toast } from "svelte-sonner";

    let username = "";
    let password = "";
    let profileColor = "#6AFF33";

    async function handleSubmit({ username, password }: Auth) {
        console.log("Sign Up submitted:", { username, password, profileColor });
        const success = await signup({ username, password, profileColor });
        if (success) {
            const user = await signin({ username, password });
            if (user) {
                $isAuthenticated = true;
                $currentUser = user.username;
                toast.success(`Signup successful! Welcome,${user?.username}`);
                goto("/");
            } else {
                toast.error(
                    "Signup succeeded, but auto-signin failed. Please sign in manually.",
                );
                goto("/sign-in");
            }
        } else {
            toast.error(
                "Signup failed. Username might be taken or there was an error.",
            );
        }
    }
</script>

<AuthForm
    authType="signup"
    bind:username
    bind:password
    bind:profileColor
    onSubmit={handleSubmit}
/>
