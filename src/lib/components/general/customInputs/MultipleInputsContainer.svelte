<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		title: string;
		sideText?: string;
		sideValue?: number | undefined;
	}

	let { children, title, sideText, sideValue = $bindable(undefined) }: Props = $props();
</script>

<div class="w-auto flex flex-col gap-2 border-2 border-surface-500 rounded-container-token p-5">
	<div class="size-full flex justify-between items-end">
		<h4 class="h4">{title}</h4>
		<p>
			{#if sideValue != undefined}
				<span>{sideText}</span>
				<span>{sideValue}</span>
			{/if}
		</p>
	</div>

	<hr class="my-3" />

	{@render children?.()}
</div>
