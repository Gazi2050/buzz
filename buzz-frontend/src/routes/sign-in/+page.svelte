<script lang="ts">
    import type { Auth } from "$lib/type";
    import AuthForm from "@components/AuthForm.svelte";
    let username = "";
    let password = "";

    function handleSubmit({ username, password }: Auth) {
        console.log("Sign Up submitted:", { username, password });
    }
</script>

<AuthForm authType="signin" {password} {username} onSubmit={handleSubmit} />
