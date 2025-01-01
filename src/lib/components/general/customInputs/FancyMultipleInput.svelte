<script lang="ts">
	interface Props {
		value: number;
		text: string;
		type?: 'text' | 'number';
		min?: string;
		max?: string;
		step?: string;
	}

	let {
		value = $bindable(),
		text,
		type,
		min = undefined,
		max = undefined,
		step = undefined
	}: Props = $props();
</script>

<div class="w-full relative">
	<input class="input" {type} {min} {max} {step} bind:value />
	<span class="absolute right-4 top-1/2 -translate-y-1/2 font-bold">{text}</span>
</div>
