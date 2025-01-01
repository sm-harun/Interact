<script lang="ts">
	import Matter from 'matter-js';
	import { fly } from 'svelte/transition';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { addNewObject } from '../../states.svelte';
	import MultipleInputsContainer from '$lib/components/general/customInputs/MultipleInputsContainer.svelte';
	import FancyInput from '$lib/components/general/customInputs/FancyInput.svelte';
	import FancyMultipleInputContainer from '$lib/components/general/customInputs/FancyMultipleInputContainer.svelte';
	import FancyMultipleInput from '$lib/components/general/customInputs/FancyMultipleInput.svelte';
	import FancySlider from '$lib/components/general/customInputs/FancySlider.svelte';

	type ModalView = 'ObjectSelection' | 'ObjectSettings';

	interface Props {
		modalView: ModalView;
	}

	let { modalView = $bindable() }: Props = $props();

	let modalStore = getModalStore();

	let position: { x: number; y: number } = $state({ x: 100, y: 100 });
	let dimenstions: { width: number; height: number } = $state({ width: 50, height: 50 });
	let radius: number = $state(pickRandom([20, 30, 40, 50, 60, 80, 100]));

	function pickRandom(choices: any[]) {
		return Matter.Common.choose(choices);
	}

	let options: Matter.IChamferableBodyDefinition = $state({
		plugin: {
			name: pickRandom([
				'Moving Object',
				'The Rocket',
				'Normal Object',
				'Gizmo',
				'Yussuf',
				'Blinker',
				'Arcane',
				'Yimrahane',
				'Widget'
			])
		},
		angle: 0,
		label: 'Circle Body',
		mass: 2.5,
		friction: 0.1,
		frictionAir: 0.01,
		frictionStatic: 1,
		restitution: 0.5,
		isStatic: false,
		render: {
			opacity: 1,
			lineWidth: 0,
			fillStyle: pickRandom(['#f19648', '#f5d259', '#f55a3c', '#063e7b', '#ececd1']),
			strokeStyle: pickRandom(['#f19648', '#f5d259', '#f55a3c', '#063e7b', '#ececd1'])
		}
	});

	let density = $derived.by(() => {
		let mass = options.mass as number;

		return options.label == 'Rectangle Body'
			? mass / (dimenstions.width * dimenstions.height)
			: mass / (radius * radius * Math.PI);
	});

	function createObject() {
		if (options.label == 'Circle Body') {
			addNewObject([
				Matter.Bodies.circle(Math.round(position.x), Math.round(position.y), radius, options)
			]);
		} else if (options.label == 'Rectangle Body') {
			addNewObject([
				Matter.Bodies.rectangle(
					Math.round(position.x),
					Math.round(position.y),
					Math.round(dimenstions.width),
					Math.round(dimenstions.height),
					options
				)
			]);
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

	<!-- Type of Object -->
	<MultipleInputsContainer title={'Type'}>
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
	</MultipleInputsContainer>

	<!-- Name -->
	<MultipleInputsContainer title={'Name'}>
		<FancyInput type="text" bind:value={options.plugin.name}>Name</FancyInput>
	</MultipleInputsContainer>

	<!-- Position and Orientation -->
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
			sideValue={dimenstions.width * dimenstions.height}
		>
			<FancyInput type="number" bind:value={dimenstions.width}>Width</FancyInput>
			<FancyInput type="number" bind:value={dimenstions.height}>Height</FancyInput>
		</MultipleInputsContainer>
	{/if}

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
		<FancySlider text="Restitution" bind:value={options.restitution} min="0" step="0.01" max="1" />
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
