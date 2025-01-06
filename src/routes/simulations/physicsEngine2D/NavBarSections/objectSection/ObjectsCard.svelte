<script lang="ts">
	import { slide } from 'svelte/transition';
	import { shapes, engineSettings, removeObject, updateShapeStats } from '../../states.svelte';
	import { type ModalComponent, type ModalSettings, getModalStore } from '@skeletonlabs/skeleton';
	import Matter from 'matter-js';
	import ObjectEditingModal from './ObjectEditingModal.svelte';

	interface Props {
		body: { id: number; name: string; x: number; y: number; fillStyle: string };
	}

	let { body }: Props = $props();

	let realBody = shapes.find((shape) => shape.id == body.id);

	let xPosInput: HTMLInputElement;
	let yPosInput: HTMLInputElement;

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

	$effect(() => {
		if (engineSettings.timeState !== true) {
			shapes.forEach((shape: Matter.Body) => {
				if (shape.id == body.id) {
					xPosInput.value = Math.floor(shape.position.x).toString();
					yPosInput.value = Math.floor(shape.position.y).toString();
				}
			});
		}
	});

	function xValueChanged(e: Event) {
		shapes.forEach((shape: Matter.Body) => {
			if (shape.id == body.id) {
				Matter.Body.setPosition(shape, { x: e.target.value, y: shape.position.y });
			}
		});
	}

	function yValueChanged(e: Event) {
		shapes.forEach((shape: Matter.Body) => {
			if (shape.id == body.id) {
				Matter.Body.setPosition(shape, { x: shape.position.x, y: e.target.value });
			}
		});
	}

	function colorChange(e: Event) {
		shapes.forEach((shape: Matter.Body) => {
			if (shape.id == body.id) {
				shape.render.fillStyle = e.target.value;
			}
		});
	}

	function updateCardAfterEdit(
		id: number,
		name: string,
		x: number,
		y: number,
		fillStyle: string,
		isStatic: boolean
	) {
		body.name = name;
		body.x = x;
		body.y = y;
		body.fillStyle = fillStyle;

		let newType: 'Static' | 'Dynamic' = isStatic ? 'Static' : 'Dynamic';

		updateShapeStats({ id, x, y, name, fillStyle, type: newType });
	}

	let modalStore = getModalStore();

	function editBody() {
		const editingModal: ModalComponent = {
			ref: ObjectEditingModal,
			props: { bodyID: body.id, updateFunc: updateCardAfterEdit }
		};

		const editingModalSettings: ModalSettings = {
			type: 'component',
			component: editingModal
		};

		modalStore.trigger(editingModalSettings);
	}

	let flashing = $state(realBody?.plugin.showCharge);

	$effect(() => {
		shapes.forEach((shape: Matter.Body) => {
			if (shape.id == body.id) {
				shape.plugin.showCharge = flashing;
			}
		});
	});
</script>

<div class="variant-ghost-secondary card-hover w-full flex-shrink-0 p-6" transition:slide>
	<!-- Title and Color -->
	<div class="flex items-center justify-between">
		<h3 class="h3 pb-3">{body.name}</h3>
		<div class="flex items-center gap-5">
			<button
				class="btn-icon {flashing ? 'variant-filled animate-pulse' : ''}"
				onclick={() => (flashing = !flashing)}
				aria-label="Flash Position"
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
						d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
					/>
				</svg>
			</button>
			<input type="color" class="input" value={body.fillStyle} oninput={colorChange} />
		</div>
	</div>

	<hr class="my-3" />

	<!-- The Position Section -->
	<div class="flex items-center gap-2">
		<div class="flex max-w-40 items-center gap-4">
			<p class="text-secondary-700-200-token flex-shrink-0">X</p>
			<input
				class="input"
				type="number"
				min="0"
				step="1"
				bind:this={xPosInput}
				value={body.x}
				oninput={xValueChanged}
				disabled={engineSettings.timeState}
			/>
		</div>
		<div class="ml-5 flex max-w-40 items-center gap-4">
			<p class="text-secondary-700-200-token flex-shrink-0">Y</p>
			<input
				class="input"
				type="number"
				min="0"
				step="1"
				bind:this={yPosInput}
				value={body.y}
				oninput={yValueChanged}
				disabled={engineSettings.timeState}
			/>
		</div>
	</div>

	<hr class="my-3" />

	<!-- The Delete Button -->
	<div class="mt-5 flex w-full items-center justify-between">
		<button
			class="group variant-glass-primary btn"
			bind:this={deleteButton}
			onclick={() => removeObject(body.id)}
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
					d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
				/>
			</svg>
			{#if deleteButtonHovered}
				<span transition:slide={{ axis: 'x' }}>Delete</span>
			{/if}
		</button>

		<!-- Edit Button -->
		<button
			class="group variant-glass-primary btn"
			bind:this={editButton}
			onclick={editBody}
			disabled={engineSettings.timeState}
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
