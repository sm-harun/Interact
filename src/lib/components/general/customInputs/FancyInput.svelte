<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		value: number | string | undefined;
		type?: string;
		min?: string;
		max?: string;
		step?: string;
	}

	let {
		children,
		value = $bindable(),
		type = typeof value,
		min = undefined,
		max = undefined,
		step = undefined
	}: Props = $props();
</script>

<div class="w-auto relative">
	<input class="input" {type} {min} {max} {step} bind:value />
	<span class="absolute right-4 top-1/2 -translate-y-1/2 font-bold">
		{@render children()}
	</span>
</div>
