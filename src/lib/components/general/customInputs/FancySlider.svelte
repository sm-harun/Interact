<script lang="ts">
	import { popup } from '@skeletonlabs/skeleton';

	interface Props {
		value: number | undefined;
		text: string;
		description?: string;
		min?: string;
		max?: string;
		step?: string;
		disabled?: boolean;
	}

	let {
		text,
		value = $bindable(undefined),
		description = undefined,
		min = undefined,
		max = undefined,
		step = undefined,
		disabled = $bindable(false)
	}: Props = $props();
</script>

<div
	class="mt-2 flex flex-col gap-2"
	use:popup={{
		event: 'hover',
		target: 'popupHover: ' + description,
		placement: 'top'
	}}
>
	<div class="flex size-full items-end justify-between">
		<h4 class="h4">{text}</h4>
		<p>{value}</p>
	</div>
	<div class="size-full">
		<input class="input" type="range" {min} {max} {step} bind:value {disabled} />
	</div>
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
