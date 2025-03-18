<script>
	import Frontpage from "$lib/Frontpage.svelte";
	import "../app.css";
	let { children } = $props();
</script>

<Frontpage>{@render children()}</Frontpage>
