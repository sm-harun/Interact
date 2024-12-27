<script lang="ts">
	import Matter from 'matter-js';
	import { fly } from 'svelte/transition';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { addNewObject } from '../../states.svelte';

	type ModalView = 'ObjectSelection' | 'ObjectSettings';

	interface Props {
		modalView: ModalView;
	}

	let { modalView = $bindable() }: Props = $props();

	let modalStore = getModalStore();

	let position: { x: number; y: number } = $state({ x: 100, y: 100 });
	let dimenstions: { width: number; height: number } = $state({ width: 50, height: 50 });
	let radius: number = $state(50);

	let options: Matter.IChamferableBodyDefinition = $state({
		plugin: { name: 'New Object' },
		angle: 0,
		label: 'Circle Body',
		mass: 2.5,
		density: 0.001,
		friction: 0.1,
		frictionAir: 0.01,
		frictionStatic: 0.5,
		render: {
			opacity: 1,
			lineWidth: 0,
			fillStyle: '#FFFFF',
			strokeStyle: '#FFFFF'
		}
	});

	function createObject() {
		if (options.label == 'Circle Body') {
			let newBody = Matter.Bodies.circle(position.x, position.y, radius, options);
			addNewObject([newBody]);
		} else if (options.label == 'Rectangle Body') {
			let newBody = Matter.Bodies.rectangle(
				position.x,
				position.y,
				dimenstions.width,
				dimenstions.height,
				options
			);
			addNewObject([newBody]);
		}

		modalStore.close();
	}
</script>

<div transition:fly={{ x: 200, delay: 300 }} class="flex flex-col gap-5">
	<div class="flex justify-between items-center">
		<button
			class="btn-icon"
			aria-label="Back button"
			onclick={() => (modalView = 'ObjectSelection')}
			><svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-8"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
				/>
			</svg>
		</button>
		<h3 class="h3">Object Settings</h3>
		<button class="variant-filled-primary btn" onclick={createObject}>Create</button>
	</div>

	<div class="w-auto flex flex-col gap-2 border-2 border-surface-500 rounded-container-token p-5">
		<h4 class="h4">Type</h4>

		<hr class="my-3" />

		<div class="flex">
			<button
				class="btn flex-1 rounded-r-none {options.label == 'Circle Body'
					? 'variant-filled-primary'
					: 'variant-glass-primary'}"
				onclick={() => (options.label = 'Circle Body')}>Circle</button
			>
			<button
				class="btn flex-1 rounded-l-none {options.label == 'Rectangle Body'
					? 'variant-filled-primary'
					: 'variant-glass-primary'}"
				onclick={() => (options.label = 'Rectangle Body')}>Rectangle</button
			>
		</div>
	</div>

	<!-- Name and ID -->
	<div class="w-auto flex flex-col gap-2 border-2 border-surface-500 rounded-container-token p-5">
		<h4 class="h4">Name and ID</h4>

		<hr class="my-3" />

		<div class="w-full relative">
			<input class="input" type="text" bind:value={options.plugin.name} />
			<span class="absolute right-4 top-1/2 -translate-y-1/2 font-bold">Name</span>
		</div>
	</div>

	<!-- Position and Orientation -->
	<div class="w-auto flex flex-col gap-2 border-2 border-surface-500 rounded-container-token p-5">
		<h4 class="h4">Position and Orientation</h4>

		<hr class="my-3" />

		<h4 class="h4">Position</h4>
		<div class="flex justify-start items-center gap-5">
			<div class="w-full relative">
				<input class="input" type="number" min="0" step="1" bind:value={position.x} />
				<span class="absolute right-4 top-1/2 -translate-y-1/2 font-bold">X</span>
			</div>
			<div class="w-full relative">
				<input class="input" type="number" min="0" step="1" bind:value={position.y} />
				<span class="absolute right-4 top-1/2 -translate-y-1/2 font-bold">Y</span>
			</div>
		</div>

		<div class="flex flex-col gap-2 mt-2">
			<div class="size-full flex justify-between items-end">
				<h4 class="h4">Angle</h4>
				<p>{options.angle}</p>
			</div>
			<div class="size-full">
				<input class="input" type="range" min="0" max="360" step="1" bind:value={options.angle} />
			</div>
		</div>
	</div>

	{#if options.label == 'Circle Body'}
		<!-- Radius and Area -->
		<div class="w-auto flex flex-col gap-2 border-2 border-surface-500 rounded-container-token p-5">
			<div class="flex justify-between items-center">
				<h4 class="h4">Radius and Area</h4>
				<p>Area: {(Math.PI * Math.pow(radius, 2)).toFixed(0)}</p>
			</div>

			<hr class="my-3" />

			<div class="w-auto relative">
				<input class="input" type="number" min="0" step="1" bind:value={radius} />
				<span class="absolute right-4 top-1/2 -translate-y-1/2 font-bold">Radius</span>
			</div>
		</div>
	{:else if options.label == 'Rectangle Body'}
		<!-- Dimensions and Area -->
		<div class="w-auto flex flex-col gap-2 border-2 border-surface-500 rounded-container-token p-5">
			<div class="flex justify-between items-center">
				<h4 class="h4">Dimensions</h4>
				<p>Area: {dimenstions.width * dimenstions.height}</p>
			</div>

			<div class="w-auto relative">
				<input class="input" type="number" min="0" step="1" bind:value={dimenstions.width} />
				<span class="absolute right-4 top-1/2 -translate-y-1/2 font-bold">Width</span>
			</div>

			<div class="w-auto relative">
				<input class="input" type="number" min="0" step="1" bind:value={dimenstions.height} />
				<span class="absolute right-4 top-1/2 -translate-y-1/2 font-bold">Height</span>
			</div>
		</div>
	{/if}

	<!-- Mass and Density -->
	<div class="w-auto flex flex-col gap-2 border-2 border-surface-500 rounded-container-token p-5">
		<h4 class="h4">Mass and Density</h4>

		<hr class="my-3" />

		<div class="w-auto relative">
			<input class="input" type="number" min="0" step="1" bind:value={options.mass} />
			<span class="absolute right-4 top-1/2 -translate-y-1/2 font-bold">Mass</span>
		</div>

		<div class="w-auto relative">
			<input class="input" type="number" min="0" step="1" bind:value={options.density} />
			<span class="absolute right-4 top-1/2 -translate-y-1/2 font-bold">Density</span>
		</div>
	</div>

	<!-- Friction and Resisitance -->
	<div class="w-auto flex flex-col gap-2 border-2 border-surface-500 rounded-container-token p-5">
		<h4 class="h4">Friction and Resisitance</h4>

		<hr class="my-3" />

		<!-- Sliding Friction -->
		<div class="flex flex-col gap-2 mt-2">
			<div class="size-full flex justify-between items-end">
				<h4 class="h4">Friction</h4>
				<p>{options.friction}</p>
			</div>
			<div class="size-full">
				<input
					class="input"
					type="range"
					min="0"
					max="1"
					step="0.01"
					bind:value={options.friction}
				/>
			</div>
		</div>

		<!-- Air Resisitance -->
		<div class="flex flex-col gap-2 mt-2">
			<div class="size-full flex justify-between items-end">
				<h4 class="h4">Air Resisitance</h4>
				<p>{options.frictionAir}</p>
			</div>
			<div class="size-full">
				<input
					class="input"
					type="range"
					min="0"
					max="1"
					step="0.01"
					bind:value={options.frictionAir}
				/>
			</div>
		</div>

		<!-- Static Friction -->
		<div class="flex flex-col gap-2 mt-2">
			<div class="size-full flex justify-between items-end">
				<h4 class="h4">Static Friction</h4>
				<p>{options.frictionStatic}</p>
			</div>
			<div class="size-full">
				<input
					class="input"
					type="range"
					min="0"
					max="1"
					step="0.01"
					bind:value={options.frictionStatic}
				/>
			</div>
		</div>
	</div>

	<!-- Render Properties -->
	<div class="w-auto flex flex-col gap-2 border-2 border-surface-500 rounded-container-token p-5">
		<h4 class="h4">Render Properites</h4>

		<hr class="my-3" />

		<!-- Opacity -->
		<div class="flex flex-col gap-2 mt-2">
			<div class="size-full flex justify-between items-end">
				<h4 class="h4">Opacity</h4>
				<p>{options.render?.opacity}</p>
			</div>
			<div class="size-full">
				<input
					class="input"
					type="range"
					min="0"
					max="1"
					step="0.01"
					bind:value={options.render.opacity}
				/>
			</div>
		</div>

		<!-- Fill and Stroke Style -->
		<div class="flex my-3">
			<div class="flex-1 h-full flex flex-col gap-2 items-center justify-around">
				<p class="text-xl font-bold">Fill Style</p>
				<input type="color" class="input" bind:value={options.render.fillStyle} />
				<p>{options.render.fillStyle}</p>
			</div>
			<div class="flex-1 h-full flex flex-col gap-2 items-center justify-around">
				<p class="text-xl font-bold">Stroke Style</p>
				<input type="color" class="input" bind:value={options.render.strokeStyle} />
				<p>{options.render.strokeStyle}</p>
			</div>
		</div>

		<!-- Line Width -->
		<div class="w-auto relative">
			<input class="input" type="number" min="0" step="1" bind:value={options.render.lineWidth} />
			<span class="absolute right-4 top-1/2 -translate-y-1/2 font-bold">Stroke Width</span>
		</div>
	</div>
</div>
