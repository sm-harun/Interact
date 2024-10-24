<script lang="ts">
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import { slide } from 'svelte/transition';

	export let vectors: Writable<Vector[]>[];
	export let vectorsNames: string[];
	export let name: string;
	export let color: string;
	export let addVector: (name: string) => void;

	type Vector = {
		x: number;
		y: number;
		name: string;
		color: string;
	};

	let filteredVectors = writable([]);

	onMount(() => {
		filteredVectors.set(
			$vectors.filter((item) => {
				return vectorsNames.includes(item.name);
			})
		);
		console.log(filteredVectors);
	});
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
		{#each $filteredVectors as vector}
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
		<button
			class="w-full h-16 btn variant-soft-surface"
			on:click={(e) => addVector(name, e.pageX, e.pageY)}
		>
			<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7">
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
			</svg>
			<p>Add Vector</p>
		</button>
	</main>
</div>

