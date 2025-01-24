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

	import { popup } from '@skeletonlabs/skeleton';
	import { derived } from 'svelte/store';

	import { getPartsBeforeAndAfterLetter } from '$lib/utils';

	type ModalView = 'ObjectSelection' | 'ObjectSettings';

	interface Props {
		modalView: ModalView;
	}

	let { modalView = $bindable() }: Props = $props();

	let modalStore = getModalStore();

	let position: { x: number; y: number } = $state({ x: 100, y: 100 });
	let dimenstions: { width: number; height: number } = $state({ width: 50, height: 50 });
	let radius: number = $state(pickRandom<number>([20, 30, 40, 50, 60, 80, 100]));

	function pickRandom<T>(choices: T[]) {
		return Matter.Common.choose(choices);
	}

	let options: Matter.IChamferableBodyDefinition = $state({
		plugin: {
			name: pickRandom<string>([
				'Moving Object',
				'The Rocket',
				'Normal Object',
				'Gizmo',
				'Yussuf',
				'Blinker',
				'Arcane',
				'Yimrahane',
				'Widget'
			]),
			charge: 0,
			showCharge: false
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
			fillStyle: pickRandom<string>(['#f19648', '#f5d259', '#f55a3c', '#063e7b', '#ececd1']),
			strokeStyle: pickRandom<string>(['#f19648', '#f5d259', '#f55a3c', '#063e7b', '#ececd1'])
		}
	});

	let massCoefficent = $state(2.5);
	let massExponent = $state(1);

	let density = $derived.by(() => {
		let mass = massCoefficent * Math.pow(10, massExponent);

		return options.label == 'Rectangle Body'
			? mass / (dimenstions.width * dimenstions.height)
			: mass / (radius * radius * Math.PI);
	});

	let chargeCoefficent = $state(0);
	let chargeExponent = $state(1);

	function createObject() {
		options.plugin.charge = chargeCoefficent * Math.pow(10, chargeExponent);
		options.mass = massCoefficent * Math.pow(10, massExponent);

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

<div transition:fly={{ x: 200, delay: 300 }} class="flex flex-col gap-5 overflow-y-scroll">
	<div class="flex items-center justify-between">
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
		<FancyInput
			type="text"
			bind:value={options.plugin.name}
			description="Custom name for the object">Name</FancyInput
		>
	</MultipleInputsContainer>

	<!-- Position and Orientation -->
	<MultipleInputsContainer title={'Position and Orientation'}>
		<FancyMultipleInputContainer>
			<FancyMultipleInput
				bind:value={position.x}
				text="X"
				description="The X or horizontal position of the body"
			/>
			<FancyMultipleInput
				bind:value={position.y}
				text="Y"
				description="The Y or vertical position of the body"
			/>
		</FancyMultipleInputContainer>

		<FancySlider
			bind:value={options.angle}
			text="Angle"
			min="0"
			step="1"
			max="360"
			description="A number describing the angle of the body"
		/>
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

	<!-- Mass and Density -->
	<MultipleInputsContainer title={'Mass and Density'}>
		{#snippet customSideText()}
			<p>Mass: {massCoefficent} × 10<sup>{massExponent}</sup></p>
			<p>
				Density: {getPartsBeforeAndAfterLetter(density.toExponential(1), 'e').before} × 10<sup
					>{getPartsBeforeAndAfterLetter(density.toExponential(1), 'e').after}</sup
				>
			</p>
		{/snippet}

		<FancySlider
			text="Mass Coefficent"
			bind:value={massCoefficent}
			min="0"
			step="0.1"
			max="10"
			disabled={options.isStatic}
			description="Coefficent of the Scientfic notation for the mass of the body"
		/>
		<FancySlider
			text="Mass Exponent"
			bind:value={massExponent}
			min="-5"
			step="1"
			max="5"
			disabled={options.isStatic}
			description="Exponent of the Scientfic notation for the mass of the body"
		/>
	</MultipleInputsContainer>

	<!-- Friction and Restitution -->
	<MultipleInputsContainer title={'Friction and Restitution'}>
		<FancySlider
			text="Friction"
			bind:value={options.friction}
			min="0"
			step="0.01"
			max="1"
			description="A number from 0 to 1 measuring how far the object will slide without stopping"
		/>
		<FancySlider
			text="Air Resisitance"
			bind:value={options.frictionAir}
			min="0"
			step="0.01"
			max="1"
			description="A number from 0 to 1 describing the magnitude of air resistance to the body"
		/>
		<FancySlider
			text="Restitution"
			bind:value={options.restitution}
			min="0"
			step="0.01"
			max="1"
			description="A number from 0 to 1 measuring how much energy the body will keep after collision (bounciness)"
		/>
		<FancySlider
			text="Static Friction"
			bind:value={options.frictionStatic}
			min="0"
			description="Measures how hard it is to start moving the object (Inertia)"
		/>
	</MultipleInputsContainer>

	<!-- Static or Dynamic -->
	<MultipleInputsContainer title={'Static or Dynamic'}>
		<div class="flex">
			<!-- Dynamic Button -->
			<button
				class="btn flex-1 rounded-r-none {!options.isStatic
					? 'variant-filled-primary'
					: 'variant-glass-primary'}"
				onclick={() => (options.isStatic = false)}
				use:popup={{
					event: 'hover',
					target: 'popupHover: Dynamic Body',
					placement: 'top'
				}}>Dynamic</button
			>
			<!-- Dynamic Button popup -->
			<div
				data-popup={'popupHover: Dynamic Body'}
				class="card bg-surface-200-700-token border-surface-300-600-token border-2 p-3 px-6"
			>
				<p>A Body that can move</p>
				<div
					class="bg-surface-200-700-token border-surface-400-500-token arrow border-b-2 border-r-2"
				></div>
			</div>

			<!-- Static Button -->
			<button
				class="btn flex-1 rounded-l-none {options.isStatic
					? 'variant-filled-primary'
					: 'variant-glass-primary'}"
				onclick={() => (options.isStatic = true)}
				use:popup={{
					event: 'hover',
					target: 'popupHover: Static Body',
					placement: 'top'
				}}>Static</button
			>
			<!-- Static Button popup -->
			<div
				data-popup={'popupHover: Static Body'}
				class="card bg-surface-200-700-token border-surface-300-600-token border-2 p-3 px-6"
			>
				<p>A Body that never moves</p>
				<div
					class="bg-surface-200-700-token border-surface-400-500-token arrow border-b-2 border-r-2"
				></div>
			</div>
		</div>
	</MultipleInputsContainer>

	<!-- Charge Propeties -->
	<MultipleInputsContainer title="Charge">
		{#snippet customSideText()}
			<p>{chargeCoefficent} × 10<sup>{chargeExponent}</sup></p>
		{/snippet}

		<FancySlider
			text="Charge Coefficent"
			bind:value={chargeCoefficent}
			min="-9.9"
			max="9.9"
			step="0.1"
			description="The Coefficent of the charge in Scientific notation"
		/>

		<FancySlider
			text="Charge Exponent"
			bind:value={chargeExponent}
			min="-15"
			max="15"
			step="1"
			description="The Exponent of the charge in Scientific notation"
		/>
	</MultipleInputsContainer>

	<!-- Render Properties -->
	<MultipleInputsContainer title={'Render Properties'}>
		<FancySlider
			text="Opacity"
			bind:value={options.render.opacity}
			min="0"
			max="1"
			step="0.01"
			description="Visibility of the object"
		/>
		<!-- Fill and Stroke Style -->
		<div class="my-3 flex">
			<!-- Fill -->
			<div
				class="flex h-full flex-1 flex-col items-center justify-around gap-2"
				use:popup={{
					event: 'hover',
					target: 'popupHover: FillStyle',
					placement: 'top'
				}}
			>
				<p class="text-xl font-bold">Fill Style</p>
				<input type="color" class="input" bind:value={options.render.fillStyle} />
				<p>{options.render.fillStyle}</p>
			</div>
			<!-- Fill Button popup -->
			<div
				data-popup={'popupHover: FillStyle'}
				class="card bg-surface-200-700-token border-surface-300-600-token border-2 p-3 px-6"
			>
				<p>Color of the object</p>
				<div
					class="bg-surface-200-700-token border-surface-400-500-token arrow border-b-2 border-r-2"
				></div>
			</div>

			<div
				class="flex h-full flex-1 flex-col items-center justify-around gap-2"
				use:popup={{
					event: 'hover',
					target: 'popupHover: StrokeStyle',
					placement: 'top'
				}}
			>
				<p class="text-xl font-bold">Stroke Style</p>
				<input type="color" class="input" bind:value={options.render.strokeStyle} />
				<p>{options.render.strokeStyle}</p>
			</div>

			<!-- Stroke Button popup -->
			<div
				data-popup={'popupHover: StrokeStyle'}
				class="card bg-surface-200-700-token border-surface-300-600-token border-2 p-3 px-6"
			>
				<p>Border color of the object</p>
				<div
					class="bg-surface-200-700-token border-surface-400-500-token arrow border-b-2 border-r-2"
				></div>
			</div>
		</div>

		<FancyInput
			bind:value={options.render.lineWidth}
			min="0"
			description="Thickness of the border around the object">Stroke Width</FancyInput
		>
	</MultipleInputsContainer>
</div>
