<script lang="ts">
	import type { Writable } from 'svelte/store';
	import ObjectCreationModal from './ObjectCreationModal.svelte';
	import { getModalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';

	import { bodies } from '../../states.svelte';
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
</script>

<section
	class="w-full h-full p-5 absolute top-0 flex flex-col gap-8 overflow-y-auto border-2 border-green-500"
	style="right: {$navSectionsStatus}%"
>
	{#each $bodies as body}
		<ObjectsCard {body} />
	{/each}

	<button
		class="flex-shrink-0 btn variant-ghost-primary w-full h-32 text-2xl gap-4"
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
</section>
