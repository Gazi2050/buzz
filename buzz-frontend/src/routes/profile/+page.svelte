<script lang="ts">
    import { storedUser } from "$lib/authStore";
    import Loading from "@components/Loading.svelte";
    import Profile from "@components/Profile.svelte";
    import { createQuery } from "@tanstack/svelte-query";
    import { fetchUsers } from "@utils/fetchUsers";
    let username = "gazi";
    let profileColor = "#ffff";
    const query = createQuery({
        queryKey: ["users"],
        queryFn: () => fetchUsers(),
    });
    console.log(storedUser);
</script>

{#if $query.isLoading}
    <Loading />
{:else if $query.isError}
    <p>Error: {$query.error.message}</p>
{:else if $query.isSuccess}
    <Profile {username} {profileColor} />
{/if}
