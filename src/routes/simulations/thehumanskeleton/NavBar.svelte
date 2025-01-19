<script lang="ts">
	import CardShadow from '$lib/components/general/cardComponents/CardShadow.svelte';
	import { tweened } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';
	import ClassContainer from './ClassContainer.svelte';
	import PartContainer from './PartContainer.svelte';
	import MultipleInputsContainer from '$lib/components/general/customInputs/MultipleInputsContainer.svelte';
	import FancyMultipleInput from '$lib/components/general/customInputs/FancyMultipleInput.svelte';
	import FancyMultipleInputContainer from '$lib/components/general/customInputs/FancyMultipleInputContainer.svelte';
	import FancySlider from '$lib/components/general/customInputs/FancySlider.svelte';
	import { popup } from '@skeletonlabs/skeleton';

	interface Props {
		settings: HumanSkeleonSettings;
	}

	let { settings = $bindable() }: Props = $props();

	// Status of the navbar whether it is opened or closed
	let navBarStatus = $state(true);

	let innerSectionsStatus = $state(false);
	let leftPadding = tweened(0, {
		duration: 1000,
		easing: cubicInOut
	});

	$effect(() => {
		leftPadding.set(innerSectionsStatus ? 100 : 0);
	});

	async function fetchSkeletonData() {
		return fetch('/assets/HumanSkeletonData.json').then((response) => response.json());
	}
</script>

<div
	class="variant-glass-surface absolute right-0 top-1/2 h-[90%] w-[25rem] -translate-y-1/2 overflow-visible rounded-bl-3xl rounded-tl-3xl transition duration-1000 ease-in-out sm:w-[30rem] md:w-[35rem] {navBarStatus
		? ''
		: 'translate-x-full'}"
>
	<button
		class="variant-glass-surface absolute right-full top-24 rounded-l-xl px-3 py-7"
		aria-label="hide navbar"
		onclick={() => (navBarStatus = !navBarStatus)}
	>
		<svg
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="size-6 transition {navBarStatus ? 'rotate-180' : ''}"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
		</svg>
	</button>

	<div class="size-full overflow-hidden p-4 rounded-container-token">
		<div class="flex justify-around">
			<h2 class="h2 grid w-full place-items-center p-5 py-5">The Human Skeleton</h2>
			<div class="grid place-items-center">
				<button
					class="btn-icon {innerSectionsStatus ? 'variant-filled' : ''}"
					aria-label="Settings"
					onclick={() => (innerSectionsStatus = !innerSectionsStatus)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
						/>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
						/>
					</svg>
				</button>
			</div>
		</div>

		<div class="relative size-full overflow-hidden">
			<!-- Information Section -->
			<div
				class="absolute right-0 top-0 flex size-full flex-col gap-10 overflow-y-auto pb-20 rounded-container-token"
				style={`right: ${$leftPadding}%`}
			>
				{#await fetchSkeletonData() then data}
					{#each data.data as part}
						<ClassContainer title={part.region}>
							{#each part.bones as bone}
								<PartContainer title={bone.name} type={bone.bone_type}
									>{bone.function}</PartContainer
								>
							{/each}
						</ClassContainer>
					{/each}
				{/await}
			</div>

			<!-- Settings Section -->
			<div
				class="absolute right-0 top-0 flex size-full flex-col gap-5 overflow-y-auto p-4 pb-40 rounded-container-token"
				style={`left: ${100 - $leftPadding}%`}
			>
				<MultipleInputsContainer title="Camera">
					<FancyMultipleInputContainer title="Camera Position">
						<FancyMultipleInput
							bind:value={settings.cameraPosition[0]}
							text="X"
							min="-10"
							max="10"
							step="0.1"
						/>
						<FancyMultipleInput
							bind:value={settings.cameraPosition[1]}
							text="Y"
							min="-10"
							max="10"
							step="0.1"
						/>
						<FancyMultipleInput
							bind:value={settings.cameraPosition[2]}
							text="Z"
							min="-10"
							max="10"
							step="0.1"
						/>
					</FancyMultipleInputContainer>
					<div class="my-1"></div>
					<FancyMultipleInputContainer title="Watch Target">
						<FancySlider
							bind:value={settings.watchTarget[0]}
							text="X"
							min="-1"
							max="1"
							step="0.01"
						/>
						<FancySlider
							bind:value={settings.watchTarget[1]}
							text="Y"
							min="-1"
							max="1"
							step="0.01"
						/>
						<FancySlider
							bind:value={settings.watchTarget[2]}
							text="Z"
							min="-1"
							max="1"
							step="0.01"
						/>
					</FancyMultipleInputContainer>
				</MultipleInputsContainer>
				<MultipleInputsContainer title="Lighting">
					<FancyMultipleInputContainer title="Direction Light Position">
						<FancySlider
							bind:value={settings.directionLightPosition[0]}
							text="X"
							min="-15"
							max="15"
							step="0.1"
						/>
						<FancySlider
							bind:value={settings.directionLightPosition[1]}
							text="Y"
							min="-15"
							max="15"
							step="0.1"
						/>
						<FancySlider
							bind:value={settings.directionLightPosition[2]}
							text="Z"
							min="-15"
							max="15"
							step="0.1"
						/>
					</FancyMultipleInputContainer>
					<FancySlider
						bind:value={settings.directionLightIntensity}
						text="Direction Light Intensity"
						min="0"
						max="5"
						step="0.01"
					/>
					<FancySlider
						bind:value={settings.ambientLightIntensity}
						text="Ambient Light Intensity"
						min="0"
						max="5"
						step="0.01"
					/>

					<h3 class="h4">Direction light Color</h3>
					<div class="flex gap-2">
						<button
							class="btn flex-grow rounded-r-none {settings.lightColorSettings
								? 'variant-filled-primary'
								: 'variant-ghost-primary'}"
							onclick={() => (settings.lightColorSettings = true)}>Auto</button
						>
						<button
							class="btn flex-grow rounded-l-none {settings.lightColorSettings
								? 'variant-ghost-primary'
								: 'variant-filled-primary'}"
							onclick={() => (settings.lightColorSettings = false)}>Custom</button
						>
					</div>

					{#if !settings.lightColorSettings}
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
								<p class="text-xl font-bold">Direction Light</p>
								<input type="color" class="input" bind:value={settings.directionLightColor} />
								<p>{settings.directionLightColor}</p>
							</div>
							<!-- Fill Button popup -->
							<div
								data-popup={'popupHover: FillStyle'}
								class="card bg-surface-200-700-token border-surface-300-600-token border-2 p-3 px-6"
							>
								<p>Light Beams that generate from a source and go in one direction</p>
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
								<p class="text-xl font-bold">Ambient Light</p>
								<input type="color" class="input" bind:value={settings.ambientLightColor} />
								<p>{settings.ambientLightColor}</p>
							</div>

							<!-- Stroke Button popup -->
							<div
								data-popup={'popupHover: StrokeStyle'}
								class="card bg-surface-200-700-token border-surface-300-600-token border-2 p-3 px-6"
							>
								<p>Light that will cover every open surface</p>
								<div
									class="bg-surface-200-700-token border-surface-400-500-token arrow border-b-2 border-r-2"
								></div>
							</div>
						</div>
					{/if}
				</MultipleInputsContainer>
			</div>
		</div>
	</div>
	<CardShadow heightPercent={10} />
</div>
