<script lang="ts">
	import { shapes } from '../../states.svelte';
	import { engineSettings } from '../../states.svelte';
	import Matter from 'matter-js';
	import { fly } from 'svelte/transition';
	import { getModalStore } from '@skeletonlabs/skeleton';

	import MultipleInputsContainer from '$lib/components/general/customInputs/MultipleInputsContainer.svelte';
	import FancyInput from '$lib/components/general/customInputs/FancyInput.svelte';
	import FancyMultipleInputContainer from '$lib/components/general/customInputs/FancyMultipleInputContainer.svelte';
	import FancyMultipleInput from '$lib/components/general/customInputs/FancyMultipleInput.svelte';
	import FancySlider from '$lib/components/general/customInputs/FancySlider.svelte';

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
		angle: Math.round(body.angle),
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
		x: Math.round(body.position.x),
		y: Math.round(body.position.y)
	});

	let dimenstions = $state({
		width: Math.round(Math.abs(body.vertices[1].x - body.vertices[0].x)),
		height: Math.round(Math.abs(body.vertices[3].y - body.vertices[0].y))
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

		Matter.Body.setPosition(shapes[index], { x: position.x, y: position.y });
		Matter.Body.setAngle(shapes[index], options.angle as number);

		if (shapes[index].label == 'Rectangle Body') {
			updateRectVerticies(shapes[index], dimenstions);
		} else if (shapes[index].label == 'Circle Body') {
			shapes[index].circleRadius = radius;

			// Updating the Verctices of the circle for collision detection
			updateCircleVerticies(shapes[index]);
		}

		// Changes mass when an object turns from static to dynamic
		if (options.isStatic) {
			Matter.Body.setStatic(shapes[index], options.isStatic);
		} else {
			Matter.Body.setStatic(shapes[index], options.isStatic as boolean);
			Matter.Body.setMass(shapes[index], options.mass as number);
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
		<MultipleInputsContainer title={'Name'}>
			<FancyInput type="text" bind:value={options.plugin.name}>Name</FancyInput>
		</MultipleInputsContainer>

		<!-- Position -->
		<MultipleInputsContainer title={'Position and Orientation'}>
			<FancyMultipleInputContainer>
				<FancyMultipleInput bind:value={position.x} text="X" />
				<FancyMultipleInput bind:value={position.y} text="Y" />
			</FancyMultipleInputContainer>

			<FancySlider bind:value={options.angle} text="Angle" min="0" step="1" max="360" />
		</MultipleInputsContainer>

		{#if options.label == 'Circle Body'}
			<!-- Radius and Area -->
			<MultipleInputsContainer
				title={'Radius and Area'}
				sideText="Area: "
				sideValue={parseInt((Math.PI * Math.pow(radius, 2)).toFixed(0))}
			>
				<FancyInput type="number" bind:value={radius}>Radius</FancyInput>
			</MultipleInputsContainer>
		{:else if options.label == 'Rectangle Body'}
			<!-- Dimensions and Area -->
			<MultipleInputsContainer
				title={'Dimensions'}
				sideText="Area: "
				sideValue={(dimenstions.width * dimenstions.height).toExponential(2)}
			>
				<FancyInput type="number" bind:value={dimenstions.width}>Width</FancyInput>
				<FancyInput type="number" bind:value={dimenstions.height}>Height</FancyInput>
			</MultipleInputsContainer>
		{/if}

		<!-- Mass and Density -->
		<MultipleInputsContainer
			title={'Mass and Density'}
			sideText="Density: "
			sideValue={density.toExponential(2)}
		>
			<FancyInput bind:value={options.mass}>Mass</FancyInput>
		</MultipleInputsContainer>

		<!-- Friction and Restitution -->
		<MultipleInputsContainer title={'Friction and Restitution'}>
			<FancySlider text="Friction" bind:value={options.friction} min="0" step="0.01" max="1" />
			<FancySlider
				text="Air Resisitance"
				bind:value={options.frictionAir}
				min="0"
				step="0.01"
				max="1"
			/>
			<FancySlider
				text="Restitution"
				bind:value={options.restitution}
				min="0"
				step="0.01"
				max="1"
			/>
			<FancySlider text="Static Friction" bind:value={options.frictionStatic} min="0" />
		</MultipleInputsContainer>

		<!-- Static or Dynamic -->
		<MultipleInputsContainer title={'Static or Dynamic'}>
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
		</MultipleInputsContainer>

		<!-- Render Properties -->
		<MultipleInputsContainer title={'Render Properties'}>
			<FancySlider text="Opacity" bind:value={options.render.opacity} min="0" max="1" step="0.01" />
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

			<FancyInput bind:value={options.render.lineWidth} min="0">Stroke Width</FancyInput>
		</MultipleInputsContainer>
	</div>
</div>
