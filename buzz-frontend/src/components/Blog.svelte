<script lang="ts">
    import {
        ArrowBigDown,
        ArrowBigUp,
        MessageSquareMore,
        User,
    } from "lucide-svelte";
</script>

<div
    class="max-w-[1200px] w-full bg-black p-5 md:p-6 lg:p-8 rounded-2xl shadow-md border-green-950 mx-auto border-l border-t"
>
    <!-- Header: Profile + Username -->
    <div class="flex items-center gap-3 mb-3">
        <div
            class="w-10 h-10 bg-[#6AFF33] rounded-full flex justify-center items-center"
        >
            <User />
        </div>
        <div>
            <h2 class="text-lg md:text-xl font-semibold text-white">
                Username
            </h2>
            <p class="text-xs md:text-sm text-gray-500">2 hours ago</p>
        </div>
    </div>

    <!-- Title -->
    <h3 class="text-xl md:text-2xl font-bold text-white mb-2">
        This is the Title
    </h3>

    <!-- Description -->
    <p class="text-sm md:text-base text-gray-400 mb-4 leading-relaxed">
        This is a short description of the post. It gives an overview of the
        content in a concise way.
    </p>

    <!-- Actions -->
    <div
        class="flex justify-between sm:justify-evenly border-t border-gray-700 pt-3 gap-4 sm:gap-10"
    >
        <button
            class="flex items-center gap-2 sm:gap-3 text-gray-400 hover:text-white transition"
        >
            <ArrowBigUp strokeWidth={1.5} class="w-8 h-8" />
            <span class="text-lg font-semibold">20</span>
        </button>
        <button
            class="flex items-center gap-2 sm:gap-3 text-gray-400 hover:text-white transition"
        >
            <ArrowBigDown strokeWidth={1.5} class="w-8 h-8" />
            <span class="text-lg font-semibold">5</span>
        </button>
        <button
            class="flex items-center gap-2 sm:gap-3 text-gray-400 hover:text-white transition"
        >
            <MessageSquareMore strokeWidth={1.5} class="w-8 h-8" />
            <span class="text-lg font-semibold">7</span>
        </button>
    </div>
</div>
