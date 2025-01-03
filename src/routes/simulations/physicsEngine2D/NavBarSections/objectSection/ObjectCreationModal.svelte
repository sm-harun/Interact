<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { fly } from 'svelte/transition';
	import ObjectSettings from './ObjectSettings.svelte';
	import { createBarrier } from '../../states.svelte';

	const modalStore = getModalStore();

	type ModalView = 'ObjectSelection' | 'ObjectSettings';
	let modalView: ModalView = $state('ObjectSelection');
</script>

{#if $modalStore[0]}
	<div
		class="bg-surface-100-800-token h-[50rem] w-[40rem] overflow-y-auto p-8 rounded-container-token"
	>
		{#if modalView == 'ObjectSelection'}
			<div class="h-full w-full" transition:fly={{ x: -200 }}>
				<button
					class="variant-glass-primary btn w-full rounded-none py-5 text-xl"
					onclick={() => (modalView = 'ObjectSettings')}
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
					<span>Create new</span></button
				>

				<h1 class="h3 mb-5 mt-10">Pre-Built Bodies</h1>
				<div class="flex flex-wrap gap-5">
					<button
						class="variant-ghost-secondary btn size-full justify-start rounded-none p-5 px-8 text-2xl"
						onclick={() => {
							createBarrier('ground');
							modalStore.close();
						}}>Ground</button
					>
					<button
						class="variant-ghost-secondary btn size-full justify-start rounded-none p-5 px-8 text-2xl"
						onclick={() => {
							createBarrier('ceiling');
							modalStore.close();
						}}>Ceiling</button
					>
					<button
						class="variant-ghost-secondary btn size-full justify-start rounded-none p-5 px-8 text-2xl"
						onclick={() => {
							createBarrier('wall-right');
							modalStore.close();
						}}>Right Wall</button
					>
					<button
						class="variant-ghost-secondary btn size-full justify-start rounded-none p-5 px-8 text-2xl"
						onclick={() => {
							createBarrier('wall-left');
							modalStore.close();
						}}>Left Wall</button
					>
				</div>
			</div>
		{:else if modalView == 'ObjectSettings'}
			<ObjectSettings bind:modalView />
		{/if}
	</div>
{/if}
