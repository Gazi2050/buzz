<script lang="ts">
    import { storedUser } from "$lib/authStore";
    import Blog from "@components/Blog.svelte";
    import Error from "@components/Error.svelte";
    import Loading from "@components/Loading.svelte";
    import { createQuery } from "@tanstack/svelte-query";
    import { fetchMyPost } from "@utils/fetchMyPost";
    import moment from "moment";
    const query = createQuery({
        queryKey: ["myPosts"],
        queryFn: () => fetchMyPost(storedUser),
    });
</script>

{#if $query.isLoading}
    <Loading />
{:else if $query.isError}
    <Error />
{:else if $query.isSuccess}
    <div class="flex flex-col py-3 gap-3 pt-[100px] mx-1 h-full">
        {#each $query.data as myPost}
            <Blog
                profileColor={myPost?.profileColor}
                username={myPost?.username}
                time={moment(myPost?.time).local().fromNow()}
                title={myPost?.title}
                description={myPost?.description}
                blogId={myPost?._id}
                upvote={myPost?.upvote}
                downvote={myPost?.downvote}
                comments={myPost?.comments?.length}
            />
        {/each}
    </div>
{/if}
