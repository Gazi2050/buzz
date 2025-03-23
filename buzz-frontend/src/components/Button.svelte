<script lang="ts">
    import type { MouseEventHandler } from "svelte/elements";
    let {
        type,
        text = "Button",
        disabled = false,
        onclick = ((
            event: MouseEvent,
        ) => {}) as MouseEventHandler<HTMLButtonElement>,
    } = $props();
</script>

<button
    {type}
    {disabled}
    {onclick}
    class="px-3 py-2 bg-zinc-800 text-[#6AFF33] text-base font-medium rounded-lg transition-all duration-500 ease-in-out hover:bg-zinc-900 hover:text-[#4CFF20] cursor-pointer"
    >{text}</button
>
