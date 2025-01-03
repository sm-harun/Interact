<script lang="ts">
	import { engineSettings } from './states.svelte';

	function convertToEarthGravity(value: number) {
		return (value * 9800).toFixed(1);
	}
</script>

<div class="bg-surface-100-800-token flex h-16 w-full items-center justify-end">
	<!-- Gravity Controls -->
	<div class="flex h-full items-center gap-5 border-l-2 border-surface-400 px-5">
		<div>
			<div class="flex w-full justify-around">
				<p class="font-bold">Gravity Scale</p>
				<p>{convertToEarthGravity(engineSettings.gravityScale)} m/s<sup>2</sup></p>
			</div>
			<input
				type="range"
				class="w-64"
				min="0.0001"
				max="0.0306"
				step="0.00001"
				bind:value={engineSettings.gravityScale}
			/>
		</div>

		<span class="divider-vertical h-10 border-surface-400"></span>

		<div>
			<div class="flex w-full justify-around">
				<p class="font-bold">X</p>
				<p>{engineSettings.gravityX}</p>
			</div>
			<input
				type="range"
				class="w-32"
				min="-1"
				max="1"
				step="0.1"
				bind:value={engineSettings.gravityX}
			/>
		</div>

		<span class="divider-vertical h-10 border-surface-400"></span>

		<div>
			<div class="flex w-full justify-around">
				<p class="font-bold">Y</p>
				<p>{engineSettings.gravityY}</p>
			</div>
			<input
				type="range"
				class="w-32"
				min="-1"
				max="1"
				step="0.1"
				bind:value={engineSettings.gravityY}
			/>
		</div>
	</div>

	<!-- Time Controls -->
	<div class="flex h-full items-center gap-5 border-l-2 border-surface-400 px-5">
		<button
			aria-label="Pause and Play button"
			class="btn-icon"
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
		<div class="flex flex-col items-center">
			<div class="flex w-full justify-around">
				<p class="font-bold">Time Scale</p>
				<p>{engineSettings.timeScale} s/s</p>
			</div>
			<input
				type="range"
				class="w-64"
				min="0"
				max="5"
				step="0.1"
				bind:value={engineSettings.timeScale}
			/>
		</div>
	</div>
</div>
