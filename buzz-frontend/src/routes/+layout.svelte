<script lang="ts">
	import Frontpage from "$lib/Frontpage.svelte";
	import { Toaster } from "svelte-sonner";
	import "../app.css";
	import Navbar from "@components/Navbar.svelte";
	import Header from "@components/Header.svelte";
	import { page } from "$app/stores";
	import { QueryClientProvider } from "@tanstack/svelte-query";
	import { QueryClient } from "@tanstack/svelte-query";
	import { browser } from "$app/environment";
	let { children } = $props();
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser,
			},
		},
	});

	const excludedPaths = ["/sign-up", "/sign-in"];
</script>

<QueryClientProvider client={queryClient}>
	<!-- <Frontpage>.....</Frontpage> -->
	<div class="bg-zinc-950">
		{#if !excludedPaths.includes($page.url.pathname)}
			<Header />
		{/if}
		{@render children()}
		{#if !excludedPaths.includes($page.url.pathname)}
			<Navbar />
		{/if}
		<Toaster position="top-center" richColors />
	</div>
</QueryClientProvider>
