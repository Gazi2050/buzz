<script lang="ts">
    import { truncateText } from "@utils/truncateText";
    import {
        ArrowBigDown,
        ArrowBigUp,
        MessageSquareMore,
        User,
    } from "lucide-svelte";
    let {
        username = "Anonymous",
        profileColor = "#6AFF33",
        time = "Mar 20, 2025",
        title = "This is the Title",
        description = "Hello,this is test post",
        blogId = "1",
        upvote = 0,
        downvote = 0,
        comments = 0,
    } = $props();
    let minimumChar = 120;
    let displayText = $derived(truncateText(description, minimumChar));
</script>

<div
    class="max-w-[1200px] w-full bg-black p-5 md:p-6 lg:p-8 rounded-2xl shadow-md border-green-950 mx-auto border-l border-t"
>
    <!-- Header: Profile + Username -->
    <div class="flex items-center gap-3 mb-3">
        <div
            class="w-10 h-10 rounded-full flex justify-center items-center"
            style="background-color: {profileColor};"
        >
            <User />
        </div>
        <div>
            <h2 class="text-lg md:text-xl font-semibold text-white">
                {username}
            </h2>
            <p class="text-xs md:text-sm text-gray-500">{time}</p>
        </div>
    </div>

    <!-- Title -->
    <h3 class="text-xl md:text-2xl font-bold text-white mb-2">
        {title}
    </h3>

    <!-- Description -->
    <p class="text-sm md:text-base text-gray-400 mb-4 leading-relaxed">
        {#if description.length > minimumChar}
            {displayText}
            <a
                href="/{blogId}"
                class="text-[#6AFF33] hover:text-green-500 ml-2 duration-300"
            >
                See More
            </a>
        {:else}
            {description}
        {/if}
    </p>

    <!-- Actions -->
    <div
        class="flex justify-around border-t border-gray-700 pt-3 gap-4 sm:gap-10"
    >
        <button
            class="flex items-center gap-2 sm:gap-3 text-gray-400 hover:text-white transition"
        >
            <ArrowBigUp strokeWidth={1.5} class="w-8 h-8" />
            <span class="text-lg font-semibold">{upvote}</span>
        </button>
        <button
            class="flex items-center gap-2 sm:gap-3 text-gray-400 hover:text-white transition"
        >
            <ArrowBigDown strokeWidth={1.5} class="w-8 h-8" />
            <span class="text-lg font-semibold">{downvote}</span>
        </button>
        <button
            class="flex items-center gap-2 sm:gap-3 text-gray-400 hover:text-white transition"
        >
            <MessageSquareMore strokeWidth={1.5} class="w-8 h-8" />
            <span class="text-lg font-semibold">{comments}</span>
        </button>
    </div>
</div>
