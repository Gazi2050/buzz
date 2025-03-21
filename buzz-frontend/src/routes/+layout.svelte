<script lang="ts">
	import Frontpage from "$lib/Frontpage.svelte";
	import { Toaster } from "svelte-sonner";
	import "../app.css";
	let { children } = $props();
</script>

<!-- <Frontpage>{@render children()}</Frontpage> -->
{@render children()}
<Toaster position="top-center" richColors />
