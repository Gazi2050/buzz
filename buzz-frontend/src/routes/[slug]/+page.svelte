<script lang="ts">
    import { page } from "$app/state";
    import BlogDetails from "@components/BlogDetails.svelte";
    import Error from "@components/Error.svelte";
    import Loading from "@components/Loading.svelte";
    import { createQuery } from "@tanstack/svelte-query";
    import { fetchPostDetails } from "@utils/fetchPostDetails";
    let id = page.params.slug;
    const query = createQuery({
        queryKey: ["post"],
        queryFn: () => fetchPostDetails(id),
    });
</script>

<div class="flex flex-col py-3 gap-3 pt-[100px] mx-1 h-full">
    {#if $query.isLoading}
        <Loading />
    {:else if $query.isError}
        <Error />
    {:else if $query.isSuccess}
        <p class="text-3xl text-white font-bold text-center mt-20">
            {$query.data?._id}
            <BlogDetails />
        </p>
    {/if}
</div>
