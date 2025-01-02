<script lang="ts">
	import { fly } from 'svelte/transition';

	import MainHeader from '$lib/components/general/header/MainHeader.svelte';

	import PhysicsEngineCard from './physicsEngine2D/MainCard.svelte';
	import PhysicsEngineCard3D from './physicsEngine3D/MainCard.svelte';

	import HumanSkeletonCard from '$lib/components/simulations/biology/humanskeleton/MainCard.svelte';
	import VectorsPlane2DCard from '$lib/components/simulations/maths/vectorsplane/2D/MainCard.svelte';

	import VectorsPlane3DCard from '$lib/components/simulations/maths/vectorsplane/3D/MainCard.svelte';
</script>

<div class="h-screen flex flex-col overflow-hidden">
	<MainHeader />
	<main
		class="flex-grow p-6 overflow-y-auto overflow-x-hidden"
		in:fly={{ x: 100, duration: 500, delay: 500 }}
		out:fly={{ x: -100, duration: 500 }}
	>
		<h1 class="h1 mb-3 bg-transparent">All Simulations</h1>
		<div class="p-3 flex gap-4 flex-wrap">
			<HumanSkeletonCard />
			<VectorsPlane2DCard />
			<VectorsPlane3DCard />
			<PhysicsEngineCard />
			<PhysicsEngineCard3D />
		</div>
		<h1 class="h1 mt-7 mb-3">Physics</h1>
		<div class="p-3 flex gap-4 flex-wrap">
			<PhysicsEngineCard />
			<PhysicsEngineCard3D />
		</div>
		<h1 class="h1 mt-7 mb-3">Maths</h1>
		<div class="p-3 flex gap-4 flex-wrap">
			<VectorsPlane2DCard />
			<VectorsPlane3DCard />
		</div>
		<h1 class="h1 mt-7 mb-3 flex-wrap">Biology</h1>
		<div class="p-3 flex gap-4 flex-wrap">
			<HumanSkeletonCard />
		</div>
	</main>
</div>
