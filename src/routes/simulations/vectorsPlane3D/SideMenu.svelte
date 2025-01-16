<script lang="ts">
	import VectorsCard from '$lib/components/simulations/maths/vectorsplane/3D/3DVectorCard.svelte';
	import ResultantsCard from '$lib/components/simulations/maths/vectorsplane/3D/3DResultantCard.svelte';

	let vectors: Vector3d[] = $state([]);
	let resultants: Resultant3d[] = $state([]);

	function deleteVector() {}

	function addNewVector() {}

	function addNewResultant() {}

	function getVectorsFromNames() {}

	function getAllResultants() {}

	function deleteResultant() {}

	function showAddVectorPopup() {}

	let showGrid = true;

	function toggleGrid() {}

	function updateGrid() {}

	let zoom = true;
</script>

<section
	class="relative flex-1 flex-shrink-0 overflow-y-auto bg-gradient-to-tl from-primary-900 via-surface-100 to-surface-50 dark:via-surface-800 dark:to-surface-900"
>
	<!-- This is the vectors section -->
	<div class="w-full overflow-hidden p-8">
		<h1 class="h1 pb-5">Vectors</h1>
		<div
			class="inside-shadow bg-surface-100-800-token border-primary-500-400-token flex w-full gap-3 overflow-x-auto border-2 p-3 rounded-container-token"
		>
			{#each vectors as vector, i}
				<VectorsCard
					bind:x={vectors[i].x}
					bind:y={vectors[i].y}
					bind:z={vectors[i].z}
					bind:color={vectors[i].color}
					name={vector.name}
					{deleteVector}
				/>
			{/each}
			<button
				aria-label="Close"
				class="bg-surface-200-700-token card-hover grid size-60 flex-shrink-0 place-items-center rounded-container-token xl:size-72"
				onclick={addNewVector}
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
	<div class="w-full p-10">
		<h1 class="h1 pb-5">Resultants</h1>
		<div
			class="inside-shadow bg-surface-100-800-token border-primary-500-400-token flex w-full gap-3 overflow-x-auto border-2 p-3 rounded-container-token"
		>
			{#each resultants as resultant}
				<ResultantsCard
					vectors={getVectorsFromNames(resultant.vectors)}
					bind:scalars={resultant.scalars}
					unitVectors={resultant.unitVectors}
					resultants={getAllResultants(resultant.resultants)}
					name={resultant.name}
					bind:color={resultant.color}
					deleteRes={deleteResultant}
					showPopup={showAddVectorPopup}
				/>
			{/each}
			<button
				aria-label="show popup"
				class="bg-surface-200-700-token card-hover grid size-60 flex-shrink-0 place-items-center rounded-container-token xl:size-72"
				onclick={addNewResultant}
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
	<div class="flex h-auto w-full flex-shrink-0 flex-col p-6">
		<h1 class="h1">Plane</h1>
		<div class="flex w-full flex-[3_1_0] items-center gap-3 p-3">
			<!-- This will hold buttons in a grid -->
			<div class="flex flex-grow items-center gap-5 pt-3">
				<button
					class="btn {showGrid ? 'variant-filled-primary' : 'variant-ghost-primary'}"
					onclick={toggleGrid}>Show Grid</button
				>
			</div>
			<div class="flex flex-shrink-0 flex-col items-center gap-2">
				<p class="text-2xl font-bold font-heading-token">Grid Size</p>
				<input
					type="number"
					name="zoom-input"
					class="input"
					onchange={updateGrid}
					bind:value={zoom}
					min="0"
					step="2"
				/>
			</div>
		</div>
	</div>
</section>
