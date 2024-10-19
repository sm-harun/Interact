<script lang="ts">
	import { fly } from 'svelte/transition';

	import MainHeader from '$lib/components/general/header/MainHeader.svelte';
	import HumanSkeletonCard from '$lib/components/simulations/biology/humanskeleton/MainCard.svelte';
</script>

<div class="h-screen flex flex-col">
	<MainHeader />
	<main
		class="flex-grow p-6"
		in:fly={{ x: 100, duration: 500, delay: 500 }}
		out:fly={{ x: 100, duration: 500 }}
	>
		<h1 class="h1 mb-3">All Simulations</h1>
		<div class="p-3">
			<HumanSkeletonCard />
		</div>
	</main>
</div>
