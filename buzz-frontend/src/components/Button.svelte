<script lang="ts">
    import type { MouseEventHandler } from "svelte/elements";
    let {
        type,
        text = "Button",
        color = "#6AFF33",
        textSize = "17px",
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
    class="px-3 py-2 bg-zinc-800 font-medium rounded-lg transition-all duration-500 ease-in-out hover:bg-zinc-900 cursor-pointer"
    style="color: {color};font-size:{textSize}">{text}</button
>
