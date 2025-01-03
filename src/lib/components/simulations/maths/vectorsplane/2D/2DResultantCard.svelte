<script lang="ts">
	import { slide } from 'svelte/transition';

	import type { Vector2d } from '$lib/types';

	interface Props {
		vectors: Vector2d[];
		scalars: number[];
		unitVectors: number[];
		resultants: { name: string; x: number; y: number; color: string }[];
		name: string;
		color: string;
		showPopup: (name: string, x: number, y: number) => void;
		showShadow: boolean;
		toggleShadow: (name: string) => void;
		deleteRes: (name: string) => void;
	}

	let {
		vectors,
		scalars = $bindable(),
		unitVectors,
		resultants,
		name,
		color = $bindable(),
		showPopup,
		showShadow = $bindable(),
		toggleShadow,
		deleteRes
	}: Props = $props();
</script>

<div
	class="bg-surface-200-700-token card-hover box-border flex size-52 flex-shrink-0 flex-col p-3 rounded-container-token xl:size-72"
	transition:slide={{ axis: 'x' }}
>
	<header class="flex flex-col items-start justify-between gap-2 xl:flex-row xl:items-center">
		<h3 class="h3 inline">RV {name}</h3>
		<div class="flex w-full items-center justify-between gap-2 xl:w-auto">
			<input type="color" bind:value={color} class="input flex-shrink-0" />
			<button
				class="btn-icon {showShadow ? 'bg-primary-500' : ''} flex-shrink-0 p-2"
				aria-label="show resultant vectors in chains"
				onclick={() => toggleShadow(name)}
			>
				<svg viewBox="0 0 24 24" class="fill-white">
					<g id="SVGRepo_iconCarrier">
						<path
							d="M16 10.5C16 11.3284 15.5523 12 15 12C14.4477 12 14 11.3284 14 10.5C14 9.67157 14.4477 9 15 9C15.5523 9 16 9.67157 16 10.5Z"
							fill="#1C274C"
						></path> <ellipse cx="9" cy="10.5" rx="1" ry="1.5" fill="#1C274C"></ellipse>
						<path
							opacity="0.5"
							d="M22 19.723V12.3006C22 6.61173 17.5228 2 12 2C6.47715 2 2 6.61173 2 12.3006V19.723C2 21.0453 3.35098 21.9054 4.4992 21.314C5.42726 20.836 6.5328 20.9069 7.39614 21.4998C8.36736 22.1667 9.63264 22.1667 10.6039 21.4998L10.9565 21.2576C11.5884 20.8237 12.4116 20.8237 13.0435 21.2576L13.3961 21.4998C14.3674 22.1667 15.6326 22.1667 16.6039 21.4998C17.4672 20.9069 18.5727 20.836 19.5008 21.314C20.649 21.9054 22 21.0453 22 19.723Z"
							stroke="#1C274C"
							stroke-width="1.5"
						></path>
					</g></svg
				>
			</button>
			<button
				class="btn-icon bg-primary-500"
				aria-label="Delete Vector"
				onclick={() => deleteRes(name)}
			>
				<svg
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-8 transition"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
					/>
				</svg>
			</button>
		</div>
	</header>
	<hr class="my-2" />
	<main class="grid w-full flex-grow grid-cols-1 gap-3 overflow-y-auto pr-3">
		{#each scalars as scalar, i}
			<div class="flex size-full items-center gap-2">
				<p>Scalar</p>
				<input type="number" class="input" bind:value={scalars[i]} transition:slide />
			</div>
		{/each}
		{#each unitVectors as vector}
			<div
				class="bg-surface-100-800-token box-content h-[4rem] w-full rounded-container-token"
				transition:slide
			>
				<div class="flex w-full items-center justify-between p-1 px-5">
					<h3 class="h5">{vector == 0 ? 'Unit Vector' : 'Unit Vector'}</h3>
					<h3 class="h5">{vector == 0 ? 'i' : 'j'}</h3>
				</div>
				<div class="flex w-full items-center justify-around">
					<p>x : {vector == 0 ? '1' : '0'}</p>
					<p>y : {vector == 0 ? '0' : '1'}</p>
				</div>
			</div>
		{/each}
		{#each vectors as vector}
			<div
				class="bg-surface-300-600-token box-content h-[4.5rem] w-full rounded-container-token"
				transition:slide
			>
				<div class="flex w-full items-center justify-between p-1 px-5">
					<h3 class="h5">Vector {vector.name}</h3>
					<div class="size-6 rounded-full" style="background-color: {vector.color};"></div>
				</div>
				<div class="flex w-full items-center justify-around">
					<p>x : {vector.x}</p>
					<p>y : {vector.y}</p>
				</div>
			</div>
		{/each}
		{#each resultants as resultant}
			<div
				class="bg-surface-300-600-token box-content h-[4.5rem] w-full rounded-container-token"
				transition:slide
			>
				<div class="flex w-full items-center justify-between p-1 px-5">
					<h3 class="h5">RV {resultant.name}</h3>
					<div class="size-6 rounded-full" style="background-color: {resultant.color};"></div>
				</div>
				<div class="flex w-full items-center justify-around">
					<p>x : {resultant.x}</p>
					<p>y : {resultant.y}</p>
				</div>
			</div>
		{/each}
		<button
			class="variant-soft-surface btn h-16 w-full"
			onclick={(e) => showPopup(name, e.pageX, e.pageY)}
		>
			<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7">
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
			</svg>
			<p>Add</p>
		</button>
	</main>
</div>
