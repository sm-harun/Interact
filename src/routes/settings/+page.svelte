<script lang="ts">
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';
</script>

<div class="flex h-screen flex-col">
	<MainHeader showMainRoutes={false} showHomeButton={true} showBackButton={true} />
	<main class="flex flex-grow">
		<nav class="bg-surface-100-800-token h-full w-96 flex-shrink-0 p-5">
			<h2 class="h2">The Nav</h2>
		</nav>
		<section class="flex-grow px-96 py-10">
			<h1 class="h1">This is the Settings Page</h1>
			<h3 class="h3 mt-5">Page still in Production</h3>
		</section>
	</main>
</div>
