<script>
    let { children } = $props();
    let isLoading = $state(true);

    $effect(() => {
        const timer = setTimeout(() => {
            isLoading = false;
        }, 2000);

        return () => clearTimeout(timer);
    });
</script>

{#if isLoading}
    <p>Loading component...</p>
{:else}
    {@render children()}
{/if}
