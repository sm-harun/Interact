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
	class="w-full relative"
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
		class="card bg-surface-200-700-token p-3 px-6 border-2 max-w-80 border-surface-300-600-token"
	>
		<p>{description}</p>
		<div
			class="arrow bg-surface-200-700-token border-b-2 border-r-2 border-surface-400-500-token"
		></div>
	</div>
{/if}
