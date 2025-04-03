<script lang="ts">
    import type { Position } from "$lib/type";

    const positionClasses: Record<Position, string> = {
        top: "bottom-full mb-[9px]",
        bottom: "top-full mt-[10px]",
        left: "right-full mr-[10px]",
        right: "left-full ml-[10px]",
    };

    let {
        text = "",
        children,
        isHover = true,
        position = "top" as Position,
    } = $props();
    let show = $state(false);
</script>

<div
    role="tooltip"
    aria-label={show ? text : undefined}
    class={isHover
        ? "transition-transform transform hover:scale-125 duration-300 p-[6px] hover:bg-white hover:text-black rounded-full"
        : null}
    onmouseenter={() => (show = true)}
    onmouseleave={() => (show = false)}
>
    {@render children?.()}

    {#if show}
        <p
            class="absolute {positionClasses[position] ||
                positionClasses.top} left-1/2 -translate-x-1/2 bg-black border border-gray-800 text-white text-lg rounded-lg px-2 py-[2px] font-semibold"
        >
            {text}
        </p>
    {/if}
</div>
