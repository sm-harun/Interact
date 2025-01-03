<script lang="ts">
	import type { Writable } from 'svelte/store';
	import ObjectCreationModal from './ObjectCreationModal.svelte';
	import { getModalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';

	import { shapeStats } from '../../states.svelte';
	import ObjectsCard from './ObjectsCard.svelte';

	interface Props {
		navSectionsStatus: Writable<number>;
	}

	let { navSectionsStatus }: Props = $props();

	const modalStore = getModalStore();
	const objectModalComponent: ModalComponent = { ref: ObjectCreationModal };

	const objectModalSettings: ModalSettings = {
		type: 'component',
		component: objectModalComponent
	};

	function triggerModal() {
		modalStore.trigger(objectModalSettings);
	}

	let staticBodiesEmpty = $derived(
		shapeStats.filter((shape) => shape.type == 'Static').length == 0
	);

	let dynamicBodiesEmpty = $derived(
		shapeStats.filter((shape) => shape.type == 'Dynamic').length == 0
	);
</script>

<section
	class="absolute top-0 flex h-full w-full flex-col gap-8 overflow-y-auto p-5"
	style="right: {$navSectionsStatus}%"
>
	<button
		class="variant-ghost-primary btn h-32 w-full flex-shrink-0 gap-4 rounded-none text-2xl"
		onclick={triggerModal}
		><svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="size-6"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
		</svg>
		<span>Add Object</span></button
	>
	<h2 class="h3">Dynamic Bodies</h2>
	<hr class="my-1" />
	{#if dynamicBodiesEmpty}
		<div class="card variant-glass-surface w-full p-8 text-xl text-black/50 dark:text-white/50">
			No Dynamic Bodies
		</div>
	{:else}
		{#each shapeStats as body, i}
			{#if body.type == 'Dynamic'}
				<ObjectsCard body={shapeStats[i]} />
			{/if}
		{/each}
	{/if}

	<h2 class="h3">Static Bodies</h2>
	<hr class="my-1" />
	{#if staticBodiesEmpty}
		<div class="card variant-glass-surface w-full p-8 text-xl text-black/50 dark:text-white/50">
			No Static Bodies
		</div>
	{:else}
		{#each shapeStats as body, i}
			{#if body.type == 'Static'}
				<ObjectsCard body={shapeStats[i]} />
			{/if}
		{/each}
	{/if}
</section>
