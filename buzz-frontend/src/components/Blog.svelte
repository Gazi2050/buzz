<script lang="ts">
    import { truncateText } from "@utils/truncateText";
    import {
        ArrowBigDown,
        ArrowBigUp,
        ExternalLink,
        MessageSquareMore,
        User,
    } from "lucide-svelte";
    import type { MouseEventHandler } from "svelte/elements";

    let {
        username = "Anonymous",
        profileColor = "#6AFF33",
        time = "a hour ago",
        title = "This is the Title",
        description = "Hello, this is a test post",
        blogId = "1",
        upvote = 0,
        downvote = 0,
        comments = 0,
        header = false,
        publicLink = false,
        handleUpVote = ((
            event: MouseEvent,
        ) => {}) as MouseEventHandler<HTMLButtonElement>,
        handleDownVote = ((
            event: MouseEvent,
        ) => {}) as MouseEventHandler<HTMLButtonElement>,
    } = $props();

    let minimumChar = 120;
    let displayText = $derived(truncateText(description, minimumChar));
</script>

<div
    class="max-w-[1220px] w-full bg-gradient-to-b from-zinc-900 to-black p-6 rounded-3xl shadow-sm border border-gray-800 hover:shadow-green-600 drop-shadow-xl transition duration-300 mx-auto overflow-hidden"
>
    <!-- Header: Profile + Username -->
    {#if header === true}
        <div class="flex items-center gap-4 mb-5">
            <div
                class="w-14 h-14 rounded-full flex justify-center items-center shadow-md"
                style="background-color: {profileColor};"
            >
                <User color="black" size={33} />
            </div>
            <div>
                <h2 class="text-lg font-semibold text-white">{username}</h2>
                <p class="text-xs text-gray-400 font-medium">{time}</p>
            </div>
        </div>
    {:else}
        <p class="text-sm text-gray-400 font-medium">{time}</p>
    {/if}
    <!-- Title -->
    <h3 class="text-2xl font-extrabold text-white mb-3">{title}</h3>

    <!-- Description -->
    <p class="text-gray-300 text-base leading-relaxed mb-5">
        {#if description.length > minimumChar}
            {displayText}
            <a
                href={publicLink ? `/${blogId}` : `/my-post/${blogId}`}
                class="text-green-400 hover:text-green-300 ml-1 font-semibold transition duration-300 inline-flex gap-1 items-center"
            >
                <span>Read More</span>
                <ExternalLink size={18} />
            </a>
        {:else}
            {description}
        {/if}
    </p>

    <!-- Actions -->
    <div
        class="flex justify-between items-center border-t border-gray-700 pt-4"
    >
        <div class="flex gap-4">
            <button
                onclick={handleUpVote}
                class="flex items-center gap-2 text-gray-400 hover:text-green-400 transition duration-200 ease-in-out"
            >
                <ArrowBigUp strokeWidth={1.5} class="w-6 h-6" />
                <span class="text-lg font-semibold">{upvote}</span>
            </button>
            <div class="p-[0.5px] bg-gray-700"></div>
            <button
                onclick={handleDownVote}
                class="flex items-center gap-2 text-gray-400 hover:text-red-400 transition duration-200 ease-in-out"
            >
                <ArrowBigDown strokeWidth={1.5} class="w-6 h-6" />
                <span class="text-lg font-semibold">{downvote}</span>
            </button>
        </div>
        <button
            class="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition duration-200 ease-in-out"
        >
            <MessageSquareMore strokeWidth={1.5} class="w-6 h-6" />
            <span class="text-lg font-semibold">{comments}</span>
        </button>
    </div>
</div>
