<script lang="ts">
    import {
        ArrowBigDown,
        ArrowBigUp,
        MessageSquareMore,
        User,
    } from "lucide-svelte";
    import type { MouseEventHandler } from "svelte/elements";
    import Comments from "./Comments.svelte";
    let {
        username = "Anonymous",
        profileColor = "#6AFF33",
        time = "a hour ago",
        title = "This is the Title",
        description = "Hello, this is a test post",
        upvote = 0,
        downvote = 0,
        header = false,
        commentData = [],
        handleUpVote = ((
            event: MouseEvent,
        ) => {}) as MouseEventHandler<HTMLButtonElement>,
        handleDownVote = ((
            event: MouseEvent,
        ) => {}) as MouseEventHandler<HTMLButtonElement>,
    } = $props();
</script>

<div class="max-w-[1220px] w-full mx-auto px-4 py-8">
    <article
        class="bg-gradient-to-b from-zinc-900 to-black rounded-3xl border border-gray-700 p-8 shadow-2xl"
    >
        {#if header === true}
            <!-- Header: Profile + Username -->
            <header class="flex items-center gap-4 mb-6">
                <div
                    class="w-16 h-16 rounded-full flex justify-center items-center shadow-lg"
                    style="background-color: {profileColor};"
                >
                    <User size={40} class="text-black" />
                </div>
                <div>
                    <h2 class="text-2xl font-semibold text-white">
                        {username}
                    </h2>
                    <p class="text-sm text-gray-500 mt-1 font-medium">{time}</p>
                </div>
            </header>
        {:else}
            <p class="text-sm text-gray-400 font-medium">{time}</p>
        {/if}
        <!-- Blog Content -->
        <section>
            <h1 class="text-4xl font-bold text-white mb-4">{title}</h1>
            <p
                class="max-h-[450px] lg:max-h-[420px] overflow-y-auto text-xl text-gray-400 leading-relaxed"
            >
                {description}
            </p>
        </section>

        <!-- Actions -->
        <footer
            class="mt-8 border-t border-gray-700 pt-4 flex justify-between items-center"
        >
            <div class="flex gap-6">
                <button
                    onclick={handleUpVote}
                    class="flex items-center gap-2 text-gray-400 hover:text-green-400 transition ease-in-out duration-200"
                >
                    <ArrowBigUp strokeWidth={1.5} size={32} />
                    <span class="text-lg font-semibold">{upvote}</span>
                </button>
                <div class="p-[0.5px] bg-gray-700"></div>
                <button
                    onclick={handleDownVote}
                    class="flex items-center gap-2 text-gray-400 hover:text-red-400 transition ease-in-out duration-200"
                >
                    <ArrowBigDown strokeWidth={1.5} size={32} />
                    <span class="text-lg font-semibold">{downvote}</span>
                </button>
            </div>
            <button
                class="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition ease-in-out duration-200"
            >
                <MessageSquareMore
                    strokeWidth={1.5}
                    size={32}
                    class="mt-[3px]"
                />
                <span class="text-lg font-semibold">{commentData?.length}</span>
            </button>
        </footer>
    </article>
    <!-- Comments -->
    <Comments {commentData} />
</div>
