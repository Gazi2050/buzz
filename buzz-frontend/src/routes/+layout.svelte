<script lang="ts">
	import Frontpage from "$lib/Frontpage.svelte";
	import { Toaster } from "svelte-sonner";
	import "../app.css";
	import Navbar from "@components/Navbar.svelte";
	import Header from "@components/Header.svelte";
	import { page } from "$app/stores";
	import { QueryClientProvider, QueryClient } from "@tanstack/svelte-query";
	import { browser } from "$app/environment";
	import { excludedPaths } from "$lib/data";
	import { isAuthenticated } from "$lib/authStore";
	import { isExcludedPath } from "@utils/isExcludedPath";

	let { children } = $props();
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser,
			},
		},
	});
</script>

<QueryClientProvider client={queryClient}>
	<!-- <Frontpage>.....</Frontpage> -->
	<div>
		{#if !excludedPaths.includes($page.url.pathname)}
			<Header />
		{/if}
		{@render children()}
		{#if !isExcludedPath($page.url.pathname) && $isAuthenticated === true}
			<Navbar />
		{/if}
		<Toaster position="top-center" richColors />
	</div>
</QueryClientProvider>
