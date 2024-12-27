<script lang="ts">
	import { slide } from 'svelte/transition';
	import { shapes, engineSettings } from '../../states.svelte';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import Matter from 'matter-js';

	interface Props {
		body: { id: number; name: string; x: number; y: number; fillStyle: string };
	}

	let { body }: Props = $props();

	let toastStore = getToastStore();

	let editButtonHovered = $state(false);
	let deleteButtonHovered = $state(false);

	let editButton: HTMLButtonElement;
	let deleteButton: HTMLButtonElement;

	$effect(() => {
		editButton.onmouseover = () => {
			editButtonHovered = true;
		};

		editButton.onmouseout = () => {
			editButtonHovered = false;
		};

		deleteButton.onmouseover = () => {
			deleteButtonHovered = true;
		};

		deleteButton.onmouseout = () => {
			deleteButtonHovered = false;
		};
	});

	function xValueChanged(e: Event) {
		if (engineSettings.timeState == false) {
			shapes.forEach((shape: Matter.Body) => {
				if (shape.id == body.id) {
					Matter.Body.setPosition(shape, { x: e.target.value, y: shape.position.y });
				}
			});
		} else {
			e.target.value = body.x;

			// Falied Toast
			const toastSettings: ToastSettings = {
				message: `Pause Engine to change positon directly`,
				background: `variant-filled-error`,
				hideDismiss: true,
				timeout: 3000
			};
			toastStore.trigger(toastSettings);
		}
	}

	function yValueChanged(e: Event) {
		if (engineSettings.timeState == false) {
			shapes.forEach((shape: Matter.Body) => {
				if (shape.id == body.id) {
					Matter.Body.setPosition(shape, { x: shape.position.x, y: e.target.value });
				}
			});
		} else {
			e.target.value = body.y;

			// Falied Toast
			const toastSettings: ToastSettings = {
				message: `Pause Engine to change positon directly`,
				background: `variant-filled-error`,
				hideDismiss: true,
				timeout: 3000
			};
			toastStore.trigger(toastSettings);
		}
	}

	function colorChange(e: Event) {
		shapes.forEach((shape: Matter.Body) => {
			if (shape.id == body.id) {
				shape.render.fillStyle = e.target.value;
			}
		});
	}
</script>

<div class="flex-shrink-0 w-full variant-ghost-secondary p-6 card-hover" transition:slide>
	<!-- Title and Color -->
	<div class="flex justify-between items-center">
		<h3 class="h3 pb-3">{body.name}</h3>
		<input type="color" class="input" value={body.fillStyle} oninput={colorChange} />
	</div>

	<hr class="my-3" />

	<!-- The Position Section -->
	<div class="flex items-center gap-2">
		<div class="flex items-center gap-4 max-w-40">
			<p class="flex-shrink-0 text-secondary-700-200-token">X</p>
			<input class="input" type="number" min="0" step="1" value={body.x} oninput={xValueChanged} />
		</div>
		<div class="flex items-center gap-4 max-w-40 ml-5">
			<p class="flex-shrink-0 text-secondary-700-200-token">Y</p>
			<input class="input" type="number" min="0" step="1" value={body.y} oninput={yValueChanged} />
		</div>
	</div>

	<hr class="my-3" />

	<!-- Edit Button -->
	<div class="w-full flex justify-between items-center mt-5">
		<button class="group btn variant-glass-primary" bind:this={deleteButton}>
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
					d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
				/>
			</svg>
			{#if deleteButtonHovered}
				<span transition:slide={{ axis: 'x' }}>Delete</span>
			{/if}
		</button>
		<button class="group btn variant-glass-primary" bind:this={editButton}
			>{#if editButtonHovered}
				<span transition:slide={{ axis: 'x' }}>Edit</span>
			{/if}
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
					d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
				/>
			</svg>
		</button>
	</div>
</div>
