<script lang="ts">
	import Frontpage from "$lib/Frontpage.svelte";
	import { Toaster } from "svelte-sonner";
	import "../app.css";
	import Navbar from "@components/Navbar.svelte";
	import Nav from "@components/Nav.svelte";
	let { children } = $props();
</script>

<!-- <Frontpage>{@render children()}</Frontpage> -->
<div class="bg-zinc-950">
	<Nav />
	{@render children()}
	<Navbar />
	<Toaster position="top-center" richColors />
</div>
