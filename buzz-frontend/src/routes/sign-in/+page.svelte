<script>
    import AuthForm from "@components/AuthForm.svelte";
    let username = "";
    let password = "";

    // @ts-ignore
    function handleSubmit({ username, password }) {
        console.log("Sign Up submitted:", { username, password });
    }
</script>

<AuthForm authType="signin" {password} {username} onSubmit={handleSubmit} />
