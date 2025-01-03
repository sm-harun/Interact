<script lang="ts">
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		value: number | string | undefined;
		description?: string;
		type?: string;
		min?: string;
		max?: string;
		step?: string;
	}

	let {
		children,
		value = $bindable(),
		type = typeof value,
		description = undefined,
		min = undefined,
		max = undefined,
		step = undefined
	}: Props = $props();
</script>

<div
	class="relative w-auto"
	use:popup={{
		event: 'hover',
		target: 'popupHover: ' + description,
		placement: 'top'
	}}
>
	<input class="input" {type} {min} {max} {step} bind:value />
	<span class="absolute right-4 top-1/2 -translate-y-1/2 font-bold">
		{@render children()}
	</span>
</div>

{#if description}
	<div
		data-popup={'popupHover: ' + description}
		class="card bg-surface-200-700-token border-surface-300-600-token border-2 p-3 px-6"
	>
		<p>{description}</p>
		<div
			class="bg-surface-200-700-token border-surface-400-500-token arrow border-b-2 border-r-2"
		></div>
	</div>
{/if}
