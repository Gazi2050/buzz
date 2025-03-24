<script lang="ts">
    import { currentUser } from "$lib/authStore";
    import Error from "@components/Error.svelte";
    import Loading from "@components/Loading.svelte";
    import Profile from "@components/Profile.svelte";
    import { createQuery, useQueryClient } from "@tanstack/svelte-query";
    import { fetchUsers } from "@utils/fetchUsers";
    import { onMount } from "svelte";

    const queryClient = useQueryClient();

    const query = createQuery({
        queryKey: ["users", $currentUser],
        queryFn: () => fetchUsers(),
        refetchInterval: 1000,
        refetchIntervalInBackground: true,
        enabled: !!$currentUser,
    });

    $: userData = $query.isSuccess ? $query.data : null;
    $: username = userData?.username ?? "";
    $: password = userData?.password ?? "";
    $: profileColor = userData?.profileColor ?? "";

    function refetchData() {
        queryClient.refetchQueries({ queryKey: ["users"] });
    }
    onMount(() => {
        refetchData();
    });
</script>

{#if $query.isLoading}
    <Loading />
{:else if $query.isError}
    <Error />
{:else if $query.isSuccess && userData}
    <Profile {username} {password} {profileColor} />
{/if}
