<script lang="ts">
    import { User } from "lucide-svelte";
    import Button from "./Button.svelte";
    let { username = "", profileColor = "" } = $props();
</script>

<div class="flex justify-center items-center h-screen mx-2">
    <div
        class="bg-black border-t border-l border-green-950 max-w-lg w-full flex flex-col items-center py-16 px-8 rounded-2xl shadow-lg"
    >
        <div
            class="w-24 h-24 rounded-full flex justify-center items-center shadow-md"
            style="background-color: {profileColor};"
        >
            <User class="w-16 h-16 text-black" />
        </div>
        <p class="text-white text-xl font-semibold mt-4">{username}</p>
        <dir class="flex justify-center items-center gap-5 mt-10">
            <Button type="button" text="Edit" />
            <Button type="button" text="Delete" />
        </dir>
    </div>
</div>
