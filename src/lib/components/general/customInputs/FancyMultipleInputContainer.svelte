<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title?: string | undefined;
		children: Snippet;
	}

	let { title = undefined, children }: Props = $props();
</script>

{#if title != undefined}
	<h4 class="h4">{title}</h4>
{/if}

<div class="flex items-center justify-between gap-5">
	{@render children()}
</div>
