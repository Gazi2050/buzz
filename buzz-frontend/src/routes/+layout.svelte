<script lang="ts">
	import Frontpage from "$lib/Frontpage.svelte";
	import { Toaster } from "svelte-sonner";
	import "../app.css";
	import Navbar from "@components/Navbar.svelte";
	let { children } = $props();
</script>

<!-- <Frontpage>{@render children()}</Frontpage> -->
{@render children()}
<Navbar />
<Toaster position="top-center" richColors />
