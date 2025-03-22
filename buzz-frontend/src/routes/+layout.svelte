<script lang="ts">
	import Frontpage from "$lib/Frontpage.svelte";
	import { Toaster } from "svelte-sonner";
	import "../app.css";
	import Navbar from "@components/Navbar.svelte";
	import Nav from "@components/Nav.svelte";
	import { page } from "$app/stores";
	let { children } = $props();
</script>

<!-- <Frontpage>{@render children()}</Frontpage> -->
<div class="bg-zinc-950">
	{#if $page.url.pathname === "/"}
		<Nav />
	{/if}
	{@render children()}
	{#if $page.url.pathname === "/"}
		<Navbar />
	{/if}
	<Toaster position="top-center" richColors />
</div>
