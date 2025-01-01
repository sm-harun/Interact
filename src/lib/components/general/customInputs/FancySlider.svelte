<script lang="ts">
	import { popup } from '@skeletonlabs/skeleton';

	interface Props {
		value: number | undefined;
		text: string;
		description?: string;
		min?: string;
		max?: string;
		step?: string;
	}

	let {
		text,
		value = $bindable(undefined),
		description = undefined,
		min = undefined,
		max = undefined,
		step = undefined
	}: Props = $props();
</script>

<div
	class="flex flex-col gap-2 mt-2"
	use:popup={{
		event: 'hover',
		target: 'popupHover: ' + description,
		placement: 'top'
	}}
>
	<div class="size-full flex justify-between items-end">
		<h4 class="h4">{text}</h4>
		<p>{value}</p>
	</div>
	<div class="size-full">
		<input class="input" type="range" {min} {max} {step} bind:value />
	</div>
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
