<script lang="ts">
    import { page } from "$app/state";
    import BlogDetails from "@components/BlogDetails.svelte";
    import Error from "@components/Error.svelte";
    import Loading from "@components/Loading.svelte";
    import { createQuery } from "@tanstack/svelte-query";
    import { fetchPostDetails } from "@utils/fetchPostDetails";
    import { handleDownVote, handleUpVote } from "@utils/handleVote";
    import moment from "moment";
    let id = page.params.slug;
    const query = createQuery({
        queryKey: ["post"],
        queryFn: () => fetchPostDetails(id),
        refetchInterval: 10,
        refetchIntervalInBackground: true,
    });
</script>

<div class="flex flex-col py-3 gap-3 pt-[100px] mx-1 h-full">
    {#if $query.isLoading}
        <Loading />
    {:else if $query.isError}
        <Error />
    {:else if $query.isSuccess}
        <BlogDetails
            header={true}
            username={$query?.data?.username}
            profileColor={$query?.data?.profileColor}
            time={moment($query?.data?.time).local().fromNow()}
            title={$query?.data?.title}
            description={$query?.data?.description}
            upvote={$query?.data?.vote?.upvote}
            downvote={$query?.data?.vote?.downvote}
            comments={$query?.data?.comments.length}
            handleUpVote={() => handleUpVote($query?.data?._id)}
            handleDownVote={() => handleDownVote($query?.data?._id)}
        />
    {/if}
</div>
