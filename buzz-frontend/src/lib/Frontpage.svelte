<script lang="ts">
    import FrontLoading from "@components/FrontLoading.svelte";

    let { children } = $props();
    let isLoading = $state(true);

    $effect(() => {
        const timer = setTimeout(() => {
            isLoading = false;
        }, 3000);

        return () => clearTimeout(timer);
    });
</script>

{#if isLoading}
    <FrontLoading />
{:else}
    {@render children()}
{/if}
