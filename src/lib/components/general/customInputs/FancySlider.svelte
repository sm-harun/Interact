<script lang="ts">
	interface Props {
		value: number | undefined;
		text: string;
		min?: string;
		max?: string;
		step?: string;
	}

	let {
		text,
		value = $bindable(undefined),
		min = undefined,
		max = undefined,
		step = undefined
	}: Props = $props();
</script>

<div class="flex flex-col gap-2 mt-2">
	<div class="size-full flex justify-between items-end">
		<h4 class="h4">{text}</h4>
		<p>{value}</p>
	</div>
	<div class="size-full">
		<input class="input" type="range" {min} {max} {step} bind:value />
	</div>
</div>
