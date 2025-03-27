<script lang="ts">
    import { signout } from "@utils/auth";
    import { Bell, House, Layers, LogOut, Plus } from "lucide-svelte";
</script>

<div
    class="fixed bottom-10 sm:bottom-16 md:bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-[350px] md:max-w-[500px] p-4 bg-transparent backdrop-blur-lg rounded-xl shadow-lg text-white z-50"
>
    <div class="flex justify-evenly items-center gap-3 sm:gap-5">
        <a
            href="/"
            class="transition-transform transform hover:scale-125 duration-300 p-[6px] hover:bg-white hover:text-black rounded-full"
        >
            <House />
        </a>
        <a
            href="/"
            class="transition-transform transform hover:scale-125 duration-300 p-[6px] hover:bg-white hover:text-black rounded-full"
        >
            <Layers />
        </a>
        <a
            href="/create-post"
            class="transition-transform transform hover:scale-125 duration-300"
        >
            <Plus size={35} class="bg-white text-black rounded-full" />
        </a>
        <a
            href="/"
            class="transition-transform transform hover:scale-125 duration-300 p-[6px] hover:bg-white hover:text-black rounded-full"
        >
            <Bell />
        </a>
        <button
            onclick={signout}
            class="transition-transform transform hover:scale-125 duration-300 p-[6px] hover:bg-white hover:text-black rounded-full"
        >
            <!-- <Sun /> -->
            <LogOut />
        </button>
    </div>
</div>
