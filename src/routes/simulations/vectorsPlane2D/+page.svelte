<script lang="ts">
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';

	import VectorsCard from '$lib/components/simulations/maths/vectorsplane/2D/2DVectorCard.svelte';
	import ResultantsCard from '$lib/components/simulations/maths/vectorsplane/2D/2DResultantCard.svelte';
</script>

<div class="h-screen flex flex-col">
	<MainHeader showBackButton={true} showMainRoutes={false} />
	<main class="flex-grow flex flex-col xl:flex-row overflow-hidden">
		<div class="flex-1 h-full">
			<canvas></canvas>
		</div>
		<section class="flex-1 h-full flex flex-col border-l-2">
			<!-- This is the vectors section -->
			<div class="w-full flex-[1_1_0] p-10 flex flex-col justify-center">
				<h1 class="h1 flex-1">Vectors</h1>
				<div
					class="w-full flex-[3_1_0] inside-shadow border-2 rounded-container-token flex p-3 gap-3 overflow-x-auto"
				>
					<VectorsCard />
					<VectorsCard />
					<VectorsCard />
					<button
						class="card-hover h-full aspect-square rounded-container-token bg-surface-200-700-token grid place-items-center"
					>
						<svg
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-[60%]"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
						</svg>
					</button>
				</div>
			</div>

			<!-- This is the Resultants section -->
			<div class="w-full flex-[1_1_0] p-10 flex flex-col justify-center">
				<h1 class="h1 flex-1">Resultants</h1>
				<div
					class="w-full flex-[3_1_0] border-2 inside-shadow rounded-container-token flex p-3 gap-3 overflow-x-auto"
				>
					<ResultantsCard />
					<ResultantsCard />
					<button
						class="card-hover h-full aspect-square rounded-container-token bg-surface-200-700-token grid place-items-center"
					>
						<svg
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-[60%]"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
						</svg>
					</button>
				</div>
			</div>

			<!-- This is the planes section -->
			<div class="w-full h-[20%] flex-shrink-0 p-6">
				<h1 class="h1">Plane</h1>
			</div>
		</section>
	</main>
</div>

<style>
	.inside-shadow {
		box-shadow: inset 0 0 1rem black;
	}
</style>
