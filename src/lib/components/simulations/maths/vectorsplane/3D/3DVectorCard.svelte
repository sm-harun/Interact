<script lang="ts">
	import { slide } from 'svelte/transition';

	interface Props {
		x: number;
		y: number;
		z: number;
		name: string;
		color: string;
		deleteVector: (name: string) => void;
	}

	let {
		x = $bindable(),
		y = $bindable(),
		z = $bindable(),
		name,
		color = $bindable(),
		deleteVector
	}: Props = $props();
</script>

<div
	class="bg-surface-200-700-token card-hover box-border flex size-60 flex-shrink-0 flex-col p-3 rounded-container-token xl:size-72"
	transition:slide={{ axis: 'x' }}
>
	<header class="flex flex-col items-start justify-between gap-2 px-3 xl:flex-row xl:items-center">
		<h3 class="h3">Vector {name}</h3>
		<div class="flex w-full items-center justify-between gap-4 xl:w-auto">
			<input type="color" bind:value={color} class="input" />
			<button
				class="btn-icon bg-primary-500"
				aria-label="Delete Vector"
				onclick={() => deleteVector(name)}
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
	<div class="flex w-full flex-grow flex-col p-2">
		<div class="flex flex-1 items-center gap-3">
			<span>X : </span>
			<input class="input !h-9 !w-[80%]" bind:value={x} type="number" />
		</div>
		<div class="flex flex-1 items-center gap-3">
			<span>Y : </span>
			<input class="input !h-9 !w-[80%]" bind:value={y} type="number" />
		</div>
		<div class="flex flex-1 items-center gap-3">
			<span>Z : </span>
			<input class="input !h-9 !w-[80%]" bind:value={z} type="number" />
		</div>
	</div>
</div>
