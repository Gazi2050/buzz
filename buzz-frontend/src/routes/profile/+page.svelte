<script lang="ts">
    import Error from "@components/Error.svelte";
    import Loading from "@components/Loading.svelte";
    import Profile from "@components/Profile.svelte";
    import { createQuery } from "@tanstack/svelte-query";
    import { fetchUsers } from "@utils/fetchUsers";
    let username = "";
    let password = "";
    let profileColor = "";
    const query = createQuery({
        queryKey: ["users"],
        queryFn: () => fetchUsers(),
    });
    $: if ($query.isSuccess && $query.data) {
        username = $query?.data?.username;
        password = $query?.data?.password;
        profileColor = $query?.data?.profileColor;
    }
</script>

{#if $query.isLoading}
    <Loading />
{:else if $query.isError}
    <Error />
{:else if $query.isSuccess}
    <Profile {username} {password} {profileColor} />
{/if}
