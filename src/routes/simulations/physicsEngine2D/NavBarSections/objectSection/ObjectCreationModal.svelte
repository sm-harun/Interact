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
		class="w-[40rem] h-[50rem] bg-surface-100-800-token rounded-container-token p-8 overflow-y-auto"
	>
		{#if modalView == 'ObjectSelection'}
			<div class="w-full h-full" transition:fly={{ x: -200 }}>
				<button
					class="w-full btn variant-glass-primary py-5 text-xl rounded-none"
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

				<h1 class="h3 mt-10 mb-5">Pre-Built Bodies</h1>
				<div class="flex flex-wrap gap-5">
					<button
						class="btn variant-ghost-secondary text-2xl size-full p-5 px-8 justify-start rounded-none"
						onclick={() => {
							createBarrier('ground');
							modalStore.close();
						}}>Ground</button
					>
					<button
						class="btn variant-ghost-secondary text-2xl size-full p-5 px-8 justify-start rounded-none"
						onclick={() => {
							createBarrier('ceiling');
							modalStore.close();
						}}>Ceiling</button
					>
					<button
						class="btn variant-ghost-secondary text-2xl size-full p-5 px-8 justify-start rounded-none"
						onclick={() => {
							createBarrier('wall-right');
							modalStore.close();
						}}>Right Wall</button
					>
					<button
						class="btn variant-ghost-secondary text-2xl size-full p-5 px-8 justify-start rounded-none"
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
