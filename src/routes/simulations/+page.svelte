<script lang="ts">
	import { fly } from 'svelte/transition';

	import MainHeader from '$lib/components/general/header/MainHeader.svelte';

	import PhysicsEngineCard from './physicsEngine2D/MainCard.svelte';
	import PhysicsEngineCard3D from './physicsEngine3D/MainCard.svelte';

	import HumanSkeletonCard from '$lib/components/simulations/biology/humanskeleton/MainCard.svelte';
	import VectorsPlane2DCard from '$lib/components/simulations/maths/vectorsplane/2D/MainCard.svelte';

	import VectorsPlane3DCard from '$lib/components/simulations/maths/vectorsplane/3D/MainCard.svelte';
</script>

<div class="flex h-screen flex-col overflow-hidden">
	<MainHeader />
	<main
		class="flex-grow overflow-y-auto overflow-x-hidden p-6"
		in:fly={{ x: 100, duration: 500, delay: 500 }}
		out:fly={{ x: -100, duration: 500 }}
	>
		<h1 class="h1 mb-3 bg-transparent">All Simulations</h1>
		<div class="flex flex-wrap gap-4 p-3">
			<HumanSkeletonCard />
			<VectorsPlane2DCard />
			<VectorsPlane3DCard />
			<PhysicsEngineCard />
			<PhysicsEngineCard3D />
		</div>
		<h1 class="h1 mb-3 mt-7">Physics</h1>
		<div class="flex flex-wrap gap-4 p-3">
			<PhysicsEngineCard />
			<PhysicsEngineCard3D />
		</div>
		<h1 class="h1 mb-3 mt-7">Maths</h1>
		<div class="flex flex-wrap gap-4 p-3">
			<VectorsPlane2DCard />
			<VectorsPlane3DCard />
		</div>
		<h1 class="h1 mb-3 mt-7 flex-wrap">Biology</h1>
		<div class="flex flex-wrap gap-4 p-3">
			<HumanSkeletonCard />
		</div>
	</main>
</div>
