<script lang="ts">
	let {
		changeGravity = $bindable(),
		playing = $bindable(),
		changePlaying = $bindable()
	} = $props();

	let gravityValue = $state({ x: 0, y: -1, z: 0, scale: 9.8 });

	$effect(() => {
		if (changeGravity)
			changeGravity(gravityValue.x, gravityValue.y, gravityValue.z, gravityValue.scale);
	});
</script>

<div
	class="w-full h-16 bg-surface-100-800-token flex justify-end items-center absolute left-0 bottom-0"
>
	<!-- Gravity Controls -->
	<div class="h-full flex items-center gap-5 border-l-2 border-surface-400 px-5">
		<div>
			<div class="flex justify-around w-full">
				<p class="font-bold">Gravity Scale</p>
				<p>{gravityValue.scale} m/s <sup>2</sup></p>
			</div>
			<input type="range" class="w-64" min="0" max="100" step="1" bind:value={gravityValue.scale} />
		</div>

		<span class="divider-vertical h-10 border-surface-400"></span>

		<div>
			<div class="flex justify-around w-full">
				<p class="font-bold">X</p>
				<p>{gravityValue.x}</p>
			</div>
			<input type="range" class="w-32" min="-1" max="1" step="0.1" bind:value={gravityValue.x} />
		</div>

		<span class="divider-vertical h-10 border-surface-400"></span>

		<div>
			<div class="flex justify-around w-full">
				<p class="font-bold">Y</p>
				<p>{gravityValue.y}</p>
			</div>
			<input type="range" class="w-32" min="-1" max="1" step="0.1" bind:value={gravityValue.y} />
		</div>

		<span class="divider-vertical h-10 border-surface-400"></span>

		<div>
			<div class="flex justify-around w-full">
				<p class="font-bold">Z</p>
				<p>{gravityValue.z}</p>
			</div>
			<input type="range" class="w-32" min="-1" max="1" step="0.1" bind:value={gravityValue.z} />
		</div>
	</div>

	<!-- Time Controls -->
	<div class="h-full flex items-center gap-5 border-l-2 border-surface-400 px-5">
		<button aria-label="Pause and Play button" class="btn-icon" onclick={changePlaying}>
			{#if !playing}
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
</div>
