<script lang="ts">
    import { signout } from "@utils/auth";
    import { House, Layers, LogOut, Plus, User } from "lucide-svelte";
    import Tooltip from "./Tooltip.svelte";
</script>

<div
    class="w-full max-w-[350px] md:max-w-[500px] fixed bottom-10 sm:bottom-16 md:bottom-20 left-1/2 transform -translate-x-1/2 bg-transparent backdrop-blur-lg rounded-xl"
>
    <div class=" p-4 bg-gray-800/30 rounded-xl shadow-lg text-white z-50">
        <div class="flex justify-evenly items-center gap-3 sm:gap-5">
            <Tooltip text="Feed">
                <a href="/">
                    <House />
                </a>
            </Tooltip>

            <Tooltip text="Post">
                <a href="/my-post">
                    <Layers />
                </a>
            </Tooltip>
            <a
                href="/create-post"
                class="transition-transform transform hover:scale-125 duration-300"
            >
                <Plus size={35} class="bg-white text-black rounded-full" />
            </a>

            <Tooltip text="Profile">
                <a href="/profile">
                    <User />
                </a>
            </Tooltip>
            <Tooltip text="Logout">
                <button
                    onclick={signout}
                    class="flex justify-center items-center"
                >
                    <!-- <Sun /> -->
                    <LogOut />
                </button>
            </Tooltip>
        </div>
    </div>
</div>
