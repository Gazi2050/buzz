<script lang="ts">
    import { User } from "lucide-svelte";
    import Button from "./Button.svelte";
    import { isAuthenticated } from "$lib/authStore";
</script>

<div
    class="bg-transparent backdrop-blur-lg fixed top-0 right-0 left-0 py-4 flex justify-center"
>
    <div
        class="max-w-[1450px] w-full flex justify-between items-center px-6 md:px-16 lg:px-32"
    >
        <a href="/" class="text-4xl lg:text-5xl font-bold text-[#6AFF33]">
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
            <a href="/sign-in"><Button text="Sign In" type="button" /></a>
        {/if}
    </div>
</div>
