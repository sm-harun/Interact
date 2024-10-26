<script lang="ts">
	import { slide } from 'svelte/transition';

	import type { Vector, Resultant } from '$lib/types';

	interface Props {
		vectors: Vector[];
		scalars: number[];
		unitVectors: number[];
		resultants: { name: string; x: number; y: number; color: string }[];
		name: string;
		color: string;
		showPopup: (name: string, x: number, y: number) => void;
	}

	let {
		vectors,
		scalars = $bindable(),
		unitVectors,
		resultants,
		name,
		color = $bindable(),
		showPopup
	}: Props = $props();
</script>

<div
	class="card-hover h-full aspect-square rounded-container-token bg-surface-200-700-token flex flex-col box-border p-3"
	transition:slide={{ axis: 'x' }}
>
	<header class="flex justify-between">
		<h3 class="h3">{name}</h3>
		<input type="color" bind:value={color} class="input" />
	</header>
	<hr class="my-2" />
	<main class="flex-grow w-full grid grid-cols-1 gap-3 overflow-y-auto pr-3">
		{#each scalars as scalar, i}
			<div class="size-full flex items-center gap-2">
				<p>Scalar</p>
				<input type="number" class="input" bind:value={scalars[i]} transition:slide />
			</div>
		{/each}
		{#each unitVectors as vector}
			<div
				class="bg-surface-100-800-token rounded-container-token w-full h-[4rem] box-content"
				transition:slide
			>
				<div class="w-full p-1 px-5 flex justify-between items-center">
					<h3 class="h5">{vector == 0 ? 'Unit Vector' : 'Unit Vector'}</h3>
					<h3 class="h5">{vector == 0 ? 'i' : 'j'}</h3>
				</div>
				<div class="w-full flex items-center justify-around">
					<p>x : {vector == 0 ? '1' : '0'}</p>
					<p>y : {vector == 0 ? '0' : '1'}</p>
				</div>
			</div>
		{/each}
		{#each vectors as vector}
			<div
				class="bg-surface-300-600-token rounded-container-token w-full h-[4.5rem] box-content"
				transition:slide
			>
				<div class="w-full p-1 px-5 flex justify-between items-center">
					<h3 class="h5">{vector.name}</h3>
					<div class="size-6 rounded-full" style="background-color: {vector.color};"></div>
				</div>
				<div class="w-full flex items-center justify-around">
					<p>x : {vector.x}</p>
					<p>y : {vector.y}</p>
				</div>
			</div>
		{/each}
		{#each resultants as resultant}
			<div
				class="bg-surface-300-600-token rounded-container-token w-full h-[4.5rem] box-content"
				transition:slide
			>
				<div class="w-full p-1 px-5 flex justify-between items-center">
					<h3 class="h5">{resultant.name}</h3>
					<div class="size-6 rounded-full" style="background-color: {resultant.color};"></div>
				</div>
				<div class="w-full flex items-center justify-around">
					<p>x : {resultant.x}</p>
					<p>y : {resultant.y}</p>
				</div>
			</div>
		{/each}
		<button
			class="w-full h-16 btn variant-soft-surface"
			onclick={(e) => showPopup(name, e.pageX, e.pageY)}
		>
			<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7">
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
			</svg>
			<p>Add</p>
		</button>
	</main>
</div>
