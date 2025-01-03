<script lang="ts">
	import { popup } from '@skeletonlabs/skeleton';

	interface Props {
		value: number;
		text: string;
		description?: string;
		type?: 'text' | 'number';
		min?: string;
		max?: string;
		step?: string;
	}

	let {
		value = $bindable(),
		text,
		description = undefined,
		type,
		min = undefined,
		max = undefined,
		step = undefined
	}: Props = $props();
</script>

<div
	class="relative w-full"
	use:popup={{
		event: 'hover',
		target: 'popupHover: ' + description,
		placement: 'top'
	}}
>
	<input class="input" {type} {min} {max} {step} bind:value />
	<span class="absolute right-4 top-1/2 -translate-y-1/2 font-bold">{text}</span>
</div>

{#if description}
	<div
		data-popup={'popupHover: ' + description}
		class="card bg-surface-200-700-token border-surface-300-600-token max-w-80 border-2 p-3 px-6"
	>
		<p>{description}</p>
		<div
			class="bg-surface-200-700-token border-surface-400-500-token arrow border-b-2 border-r-2"
		></div>
	</div>
{/if}
