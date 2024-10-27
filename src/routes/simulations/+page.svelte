<script lang="ts">
	import { fly } from 'svelte/transition';

	import MainHeader from '$lib/components/general/header/MainHeader.svelte';

	import HumanSkeletonCard from '$lib/components/simulations/biology/humanskeleton/MainCard.svelte';
	import VectorsPlane2DCard from '$lib/components/simulations/maths/vectorsplane/2D/MainCard.svelte';

	import VectorsPlane3DCard from '$lib/components/simulations/maths/vectorsplane/3D/MainCard.svelte';
</script>

<div class="h-screen flex flex-col overflow-hidden">
	<MainHeader />
	<main
		class="flex-grow p-6 overflow-x-hidden overflow-y-auto"
		in:fly={{ x: 100, duration: 500, delay: 500 }}
		out:fly={{ x: 100, duration: 500 }}
	>
		<h1 class="h1 mb-3">All Simulations</h1>
		<div class="p-3 flex gap-4 overflow-y-visible overflow-x-auto">
			<HumanSkeletonCard />
			<VectorsPlane2DCard />
			<VectorsPlane3DCard />
		</div>
		<h1 class="h1 mt-7 mb-3">Maths</h1>
		<div class="p-3 flex gap-4 overflow-x-auto">
			<VectorsPlane2DCard />
			<VectorsPlane3DCard />
		</div>
		<h1 class="h1 mt-7 mb-3">Biology</h1>
		<div class="p-3 flex gap-4 overflow-x-auto">
			<HumanSkeletonCard />
		</div>
	</main>
</div>
