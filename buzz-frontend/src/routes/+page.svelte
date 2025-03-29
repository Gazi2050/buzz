<script lang="ts">
    import Blog from "@components/Blog.svelte";
    import Error from "@components/Error.svelte";
    import Loading from "@components/Loading.svelte";
    import { createQuery } from "@tanstack/svelte-query";
    import { fetchPosts } from "@utils/fetchPosts";
    import moment from "moment";
    const query = createQuery({
        queryKey: ["posts"],
        queryFn: () => fetchPosts(),
    });
</script>

{#if $query.isLoading}
    <Loading />
{:else if $query.isError}
    <Error />
{:else if $query.isSuccess}
    <div class="flex flex-col py-3 gap-3 pt-[100px] mx-1 h-full">
        {#each $query.data as post}
            <Blog
                header={true}
                profileColor={post?.profileColor}
                username={post?.username}
                time={moment(post?.time).local().fromNow()}
                title={post?.title}
                description={post?.description}
                blogId={post?._id}
                upvote={post?.upvote}
                downvote={post?.downvote}
                comments={post?.comments?.length}
            />
        {/each}
    </div>
{/if}
