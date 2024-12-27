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
	class="w-full h-full p-5 absolute top-0 flex flex-col gap-8 overflow-y-auto"
	style="right: {$navSectionsStatus}%"
>
	<button
		class="flex-shrink-0 btn variant-ghost-primary rounded-none w-full h-32 text-2xl gap-4"
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
		<div class="w-full card variant-glass-surface p-8 text-xl text-black/50 dark:text-white/50">
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
		<div class="w-full card variant-glass-surface p-8 text-xl text-black/50 dark:text-white/50">
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
