<script lang="ts">
    import { storedUser } from "$lib/authStore";
    import Blog from "@components/Blog.svelte";
    import Error from "@components/Error.svelte";
    import Loading from "@components/Loading.svelte";
    import { createQuery } from "@tanstack/svelte-query";
    import { fetchPosts } from "@utils/fetchPosts";
    import { voteOnPost } from "@utils/voteOnPost";
    import moment from "moment";
    const query = createQuery({
        queryKey: ["posts"],
        queryFn: () => fetchPosts(),
        refetchInterval: 10,
        refetchIntervalInBackground: true,
    });

    const handleUpVote = async (postId: string) => {
        const voteData = {
            postId: postId,
            username: storedUser,
            type: "up",
        };
        try {
            const result = await voteOnPost(voteData);
            // console.log(result);
        } catch (error) {
            console.error("Failed to upvote:", error);
        }
    };

    const handleDownVote = async (postId: string) => {
        const voteData = {
            postId: postId,
            username: storedUser,
            type: "down",
        };
        try {
            const result = await voteOnPost(voteData);
            console.log(result);
        } catch (error) {
            console.error("Failed to upvote:", error);
        }
    };
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
                publicLink={true}
                profileColor={post?.profileColor}
                username={post?.username}
                time={moment(post?.time).local().fromNow()}
                title={post?.title}
                description={post?.description}
                blogId={post?._id}
                upvote={post?.vote?.upvote}
                downvote={post?.vote?.downvote}
                comments={post?.comments?.length}
                handleUpVote={() => handleUpVote(post?._id)}
                handleDownVote={() => handleDownVote(post?._id)}
            />
        {/each}
    </div>
{/if}
