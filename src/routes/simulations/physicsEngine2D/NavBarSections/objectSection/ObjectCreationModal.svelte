<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { bodies } from '../../states.svelte';
	import Matter from 'matter-js';

	let { Bodies } = Matter;

	const modalStore = getModalStore();

	function createObject(type: string) {
		if (type == 'Circle') {
			let newBody = Bodies.circle(200, 200, 50);
			bodies.update((currrentBodies) => [...currrentBodies, newBody]);
		} else if (type == 'Rectangle') {
			let newBody = Bodies.rectangle(200, 200, 50, 50);
			bodies.update((currrentBodies) => [...currrentBodies, newBody]);
		}
		modalStore.close();
	}
</script>

{#if $modalStore[0]}
	<div class="w-[40rem] bg-surface-100-800-token rounded-container-token p-8">
		<h1 class="h3 mb-5">Body Type</h1>
		<div class="flex flex-col gap-5">
			<button
				class="btn variant-ringed-primary justify-start gap-6 text-4xl p-8"
				onclick={() => createObject('Circle')}
				><svg
					xmlns="http://www.w3.org/2000/svg"
					fill="#000000"
					class="size-12"
					viewBox="0 0 330 330"
				>
					<path
						id="XMLID_520_"
						d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.982,0,165,0z M165,300 C90.561,300,30,239.44,30,165S90.561,30,165,30c74.439,0,135,60.561,135,135S239.439,300,165,300z"
					></path>
				</svg> <span>Cricle</span></button
			>
			<button
				class="btn variant-ringed-primary justify-start gap-6 text-4xl p-8"
				onclick={() => createObject('Rectangle')}
				><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000" class="size-12"
					><path d="M1 21h22V3H1zM2 4h20v16H2z"></path><path fill="none" d="M0 0h24v24H0z"
					></path></svg
				> <span>Rectangle</span></button
			>
		</div>

		<h1 class="h3 mt-10 mb-5">Pre-Built Bodies</h1>
		<div class="flex flex-wrap gap-5">
			<button class="btn variant-glass-primary text-2xl p-5 px-8 justify-start">Ground</button>
			<button class="btn variant-glass-primary text-2xl p-5 px-8 justify-start">Ceiling</button>
			<button class="btn variant-glass-primary text-2xl p-5 px-8 justify-start">Left Wall</button>
			<button class="btn variant-glass-primary text-2xl p-5 px-8 justify-start">Right Wall</button>
		</div>
	</div>
{/if}
