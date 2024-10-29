<script lang="ts">
	import { slide } from 'svelte/transition';

	interface Props {
		x: number;
		y: number;
		z: number;
		name: string;
		color: string;
	}

	let {
		x = $bindable(),
		y = $bindable(),
		z = $bindable(),
		name,
		color = $bindable()
	}: Props = $props();
</script>

<div
	class="size-60 xl:size-72 flex-shrink-0 card-hover rounded-container-token bg-surface-200-700-token p-3 box-border flex flex-col"
	transition:slide={{ axis: 'x' }}
>
	<header class="px-3 flex justify-between">
		<h3 class="h3">{name}</h3>
		<input type="color" bind:value={color} class="input" />
	</header>
	<hr class="my-2" />
	<div class="flex-grow w-full flex flex-col p-2">
		<div class="flex-1 flex gap-3 items-center">
			<span>X : </span>
			<input class="input !w-[80%] !h-9" bind:value={x} type="number" />
		</div>
		<div class="flex-1 flex gap-3 items-center">
			<span>Y : </span>
			<input class="input !w-[80%] !h-9" bind:value={y} type="number" />
		</div>
		<div class="flex-1 flex gap-3 items-center">
			<span>Z : </span>
			<input class="input !w-[80%] !h-9" bind:value={z} type="number" />
		</div>
	</div>
</div>
