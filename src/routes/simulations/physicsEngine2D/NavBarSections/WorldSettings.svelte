<script lang="ts">
	import FancyMultipleInputContainer from '$lib/components/general/customInputs/FancyMultipleInputContainer.svelte';
	import FancySlider from '$lib/components/general/customInputs/FancySlider.svelte';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import type { Writable } from 'svelte/store';

	import { engineSettings } from '../states.svelte';

	interface Props {
		navSectionsStatus: Writable<number>;
	}

	let { navSectionsStatus }: Props = $props();

	let enableGravity = $state(true);

	$effect(() => {
		if (!enableGravity) {
			engineSettings.gravityX = 0;
			engineSettings.gravityY = 0;
		}
	});

	function convertToEarthGravity(value: number) {
		return (value * 9800).toFixed(1);
	}
</script>

<div
	class="absolute top-0 flex h-full w-full flex-col gap-5 p-5"
	style="right: {$navSectionsStatus - 300}%"
>
	<!-- Time Settings Section -->
	<div class="border-surface-200-700-token border-2 p-5 rounded-container-token">
		<div class="flex items-center justify-between">
			<h2 class="h2">Time</h2>
			<button
				class="btn-icon"
				aria-label="Pause button"
				onclick={() => (engineSettings.timeState = !engineSettings.timeState)}
			>
				{#if !engineSettings.timeState}
					<svg
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
						/>
					</svg>
				{:else}
					<svg
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M15.75 5.25v13.5m-7.5-13.5v13.5"
						/>
					</svg>
				{/if}
			</button>
		</div>
		<hr class="my-5" />
		<div>
			<FancySlider
				text="Time Scale"
				bind:value={engineSettings.timeScale}
				min="0"
				step="0.1"
				max="5"
			/>
		</div>
	</div>

	<!-- Gravity Section -->
	<div class="border-surface-200-700-token border-2 p-5 rounded-container-token">
		<div class="flex items-center justify-between">
			<h2 class="h2">Gravity</h2>
			<SlideToggle bind:checked={enableGravity} active="bg-primary-500" size="md" />
		</div>
		<hr class="my-5" />
		<div>
			<FancySlider
				text="Gravity Scale"
				bind:value={engineSettings.gravityScale}
				min="0.0001"
				max="0.03061"
				step="0.00001"
				disabled={!enableGravity}
			>
				{#snippet customValue()}
					<p>{convertToEarthGravity(engineSettings.gravityScale)} m/s<sup>2</sup></p>
				{/snippet}
			</FancySlider>
			<FancyMultipleInputContainer>
				<FancySlider
					text="X"
					bind:value={engineSettings.gravityX}
					min="-1"
					step="0.01"
					max="1"
					disabled={!enableGravity}
				/>
				<FancySlider
					text="Y"
					bind:value={engineSettings.gravityY}
					min="-1"
					step="0.01"
					max="1"
					disabled={!enableGravity}
				/>
			</FancyMultipleInputContainer>
		</div>
	</div>
</div>
