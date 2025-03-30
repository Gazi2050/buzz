<script lang="ts">
    import { User } from "lucide-svelte";
    import Button from "./Button.svelte";
    import { isAuthenticated } from "$lib/authStore";
</script>

<div
    class="fixed top-0 right-0 left-0 flex justify-center items-center z-50 mt-3"
>
    <div
        class="max-w-[1230px] w-full flex justify-between items-center border border-gray-800 px-3 py-3 rounded-xl mx-1 bg-gray-800/30"
    >
        <a href="/" class="text-4xl font-bold text-[#6AFF33] -mt-[9px]">
            Buzz
        </a>
        {#if $isAuthenticated === true}
            <a
                href="/profile"
                class="flex justify-center items-center rounded-full p-2 bg-[#6AFF33]"
            >
                <User class="w-7 h-7 md:w-9 md:h-9 text-black" />
            </a>
        {:else}
            <a href="/sign-in"
                ><Button text="Sign In" type="button" textSize="20px" /></a
            >
        {/if}
    </div>
</div>
