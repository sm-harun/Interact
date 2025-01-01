<script lang="ts">
	import { shapes } from '../../states.svelte';
	import { engineSettings } from '../../states.svelte';
	import Matter from 'matter-js';
	import { fly } from 'svelte/transition';
	import { getModalStore } from '@skeletonlabs/skeleton';

	interface Props {
		bodyID: number;
		updateFunc: (name: string, x: number, y: number, fillStyle: string | undefined) => void;
	}

	let { bodyID, updateFunc }: Props = $props();

	let modalStore = getModalStore();

	let body = shapes.find((value) => value.id == bodyID) as Matter.Body;

	let options: Matter.IChamferableBodyDefinition = $state({
		plugin: { name: body?.plugin.name },
		label: body.label,
		mass: body.isStatic ? 50 : body.mass,
		friction: body.friction,
		frictionAir: body.frictionAir,
		frictionStatic: body.frictionStatic,
		restitution: body.restitution,
		isStatic: body.isStatic,
		render: {
			opacity: body.render.opacity,
			lineWidth: body.render.lineWidth,
			fillStyle: body.render.fillStyle,
			strokeStyle: body.render.strokeStyle
		}
	});

	let position: { x: number; y: number } = $state({
		x: body.position.x,
		y: body.position.y
	});

	let dimenstions = $state({
		width: Math.abs(body.vertices[1].x - body.vertices[0].x),
		height: Math.abs(body.vertices[3].y - body.vertices[0].y)
	});

	let radius = $state(body.circleRadius);

	let density = $derived.by(() => {
		let mass = options.mass as number;

		return options.label == 'Rectangle Body'
			? mass / (dimenstions.width * dimenstions.height)
			: mass / (radius * radius * Math.PI);
	});

	function saveBodySettings() {
		engineSettings.timeState = false;

		let index = shapes.findIndex((value) => value.id == bodyID);

		shapes[index].plugin.name = options.plugin.name;

		shapes[index].position.x = position.x;
		shapes[index].position.y = position.y;

		if (shapes[index].label == 'Rectangle Body') {
			updateRectVerticies(shapes[index], dimenstions);
		} else if (shapes[index].label == 'Circle Body') {
			shapes[index].circleRadius = radius;

			// Updating the Verctices of the circle for collision detection
			updateCircleVerticies(shapes[index]);
		}

		shapes[index].isStatic = options.isStatic as boolean;

		// Changes mass when an object turns from static to dynamic
		if (options.isStatic) {
			shapes[index].mass = Infinity;
		} else {
			shapes[index].mass = options.mass as number;
		}

		// Friction
		shapes[index].friction = options.friction as number;
		shapes[index].frictionAir = options.frictionAir as number;
		shapes[index].frictionStatic = options.frictionStatic as number;
		shapes[index].restitution = options.restitution as number;

		// Render
		shapes[index].render.fillStyle = options.render?.fillStyle;
		shapes[index].render.strokeStyle = options.render?.strokeStyle;
		shapes[index].render.lineWidth = options.render?.lineWidth;
		shapes[index].render.opacity = options.render?.opacity;

		updateFunc(
			shapes[index].plugin.name,
			shapes[index].position.x,
			shapes[index].position.y,
			shapes[index].render.fillStyle
		);
		modalStore.close();
	}

	function updateCircleVerticies(body: Matter.Body) {
		// Matter-js uses 26 as default for circles
		const verticesNum = 26;
		const angleStep = Math.PI / (verticesNum / 2);

		const newVertices: Matter.Vector[] = [];

		for (let i = 0; i < verticesNum; i++) {
			newVertices.push({
				x: body.position.x + body.circleRadius * Math.cos(angleStep * i),
				y: body.position.y + body.circleRadius * Math.sin(angleStep * i)
			});
		}

		Matter.Body.setVertices(body, newVertices);
	}

	function updateRectVerticies(body: Matter.Body, dimenstions: { width: number; height: number }) {
		let newVertices: Matter.Vector[] = [
			{ x: body.position.x - dimenstions.width / 2, y: position.y - dimenstions.height / 2 },
			{ x: position.x + dimenstions.width / 2, y: position.y - dimenstions.height / 2 },
			{ x: position.x + dimenstions.width / 2, y: position.y + dimenstions.height / 2 },
			{ x: position.x - dimenstions.width / 2, y: position.y + dimenstions.height / 2 }
		];

		Matter.Body.setVertices(body, newVertices);
	}
</script>

<div
	class="w-[40rem] h-[50rem] bg-surface-100-800-token rounded-container-token p-8 overflow-y-auto"
>
	<div transition:fly={{ x: 200, delay: 300 }} class="flex flex-col gap-5">
		<div class="flex justify-between items-center">
			<button class="btn-icon" aria-label="Back button"
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
			<h3 class="h3">Edit Body</h3>
			<button class="variant-filled-primary btn" onclick={saveBodySettings}>Save</button>
		</div>

		<!-- Name -->
		<div class="w-auto flex flex-col gap-2 border-2 border-surface-500 rounded-container-token p-5">
			<h4 class="h4">Name</h4>

			<hr class="my-3" />

			<div class="w-full relative">
				<input class="input" type="text" bind:value={options.plugin.name} />
				<span class="absolute right-4 top-1/2 -translate-y-1/2 font-bold">Name</span>
			</div>
		</div>

		<!-- Position -->
		<div class="w-auto flex flex-col gap-2 border-2 border-surface-500 rounded-container-token p-5">
			<h4 class="h4">Position</h4>

			<hr class="my-3" />

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
		</div>

		{#if options.label == 'Circle Body'}
			<!-- Radius and Area -->
			<div
				class="w-auto flex flex-col gap-2 border-2 border-surface-500 rounded-container-token p-5"
			>
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
			<div
				class="w-auto flex flex-col gap-2 border-2 border-surface-500 rounded-container-token p-5"
			>
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
			<div class="flex justify-between items-center">
				<h4 class="h4">Mass and Density</h4>
				<p>Density: {density.toExponential(2)}</p>
			</div>

			<hr class="my-3" />

			<div class="w-auto relative">
				<input
					class="input"
					type="number"
					min="0"
					step="1"
					bind:value={options.mass}
					disabled={options.isStatic}
				/>
				<span class="absolute right-4 top-1/2 -translate-y-1/2 font-bold">Mass</span>
			</div>
		</div>

		<!-- Friction and Restitution -->
		<div class="w-auto flex flex-col gap-2 border-2 border-surface-500 rounded-container-token p-5">
			<h4 class="h4">Friction and Restitution</h4>

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

			<!-- Restitution -->
			<div class="flex flex-col gap-2 mt-2">
				<div class="size-full flex justify-between items-end">
					<h4 class="h4">Restitution</h4>
					<p>{options.restitution}</p>
				</div>
				<div class="size-full">
					<input
						class="input"
						type="range"
						min="0"
						max="1"
						step="0.01"
						bind:value={options.restitution}
					/>
				</div>
			</div>
		</div>

		<!-- Static or Dynamic -->
		<div class="w-auto flex flex-col gap-2 border-2 border-surface-500 rounded-container-token p-5">
			<h4 class="h4">Static or Dynamic</h4>

			<hr class="my-3" />

			<div class="flex">
				<button
					class="btn flex-1 rounded-r-none {!options.isStatic
						? 'variant-filled-primary'
						: 'variant-glass-primary'}"
					onclick={() => (options.isStatic = false)}>Dynamic</button
				>
				<button
					class="btn flex-1 rounded-l-none {options.isStatic
						? 'variant-filled-primary'
						: 'variant-glass-primary'}"
					onclick={() => (options.isStatic = true)}>Static</button
				>
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
</div>
