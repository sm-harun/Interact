<script lang="ts">
	import WaveAnimation from './animations/WaveAnimation.svelte';

	import PhysicsEngineCard from '../../routes/simulations/physicsEngine2D/MainCard.svelte';
	import PhysicsEngineCard3D from '../../routes/simulations/physicsEngine3D/MainCard.svelte';

	import HumanSkeletonCard from '$lib/components/simulations/biology/humanskeleton/MainCard.svelte';
	import VectorsPlane2DCard from '$lib/components/simulations/maths/vectorsplane/2D/MainCard.svelte';
	import AiChat from '$lib/components/courses/workingSpaces/AIChat.svelte';
</script>

<div
	class="bg-surface-200-700-token relative grid h-[400vh] w-full grid-cols-1 grid-rows-1 overflow-y-visible xl:grid-cols-2"
>
	<WaveAnimation position="bottom" />

	<div class="absolute top-0 grid h-full w-full items-start justify-center xl:static">
		<div
			class="sticky top-20 z-30 my-14 flex flex-col items-center xl:sticky xl:top-1/2 xl:my-80 xl:items-start"
		>
			<h1 class="h1 font-bold">Start learning</h1>
			<p class="text-surface-500-400-token w-[90%] text-center xl:text-start">
				Take courses with a lot of interactive examples to boost your creativity
			</p>
		</div>
	</div>
	<div class="relative mt-24 flex flex-col items-center gap-48 overflow-hidden py-24 xl:mt-0">
		<div class="w-[80%]">
			<img src="/welcomePageAssets/scalar-example.png" alt="Scalar Example image" />
		</div>
		<div class="grid w-[80%] grid-cols-2 grid-rows-2 place-items-center gap-10 px-20">
			<HumanSkeletonCard />
			<div class="z-10">
				<PhysicsEngineCard />
			</div>
			<PhysicsEngineCard3D />
			<div class="z-10">
				<VectorsPlane2DCard />
			</div>
		</div>
		<div class="border-surface-300-600-token h-[40rem] w-[80%] border-2">
			<AiChat />
		</div>
		<div class="w-[80%]">
			<img src="/welcomePageAssets/notes-photo.png" alt="Notes Example image" />
		</div>
		<div class="grid w-[80%] grid-cols-2 grid-rows-2 gap-5">
			<img
				src="/welcomePageAssets/tests-image-1.png"
				class="col-span-1 row-span-2"
				alt="Tests Example 1 image"
			/>
			<img
				src="/welcomePageAssets/tests-image-2.png"
				class="col-span-1 row-span-1"
				alt="Tests Example 1 image"
			/>
			<img
				src="/welcomePageAssets/tests-image-3.png"
				class="col-span-1 row-span-1"
				alt="Tests Example 1 image"
			/>
		</div>
	</div>

	<WaveAnimation position="top" />
</div>
