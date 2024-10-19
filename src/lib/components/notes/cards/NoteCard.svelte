<script lang="ts">
	import { slide } from 'svelte/transition';

	export let title: string;
	export let text: string;
	export let index: number;
	export let loadNote: (title: string) => void;
</script>

<button
	class="card card-hover size-60 flex flex-col items-center gap-5 p-4 relative"
	on:click={() => loadNote(title)}
	transition:slide={{ axis: 'x' }}
>
	<h1 class="h3 text-center flex-shrink-0">{title}</h1>
	<p
		class="flex-grow overflow-hidden w-full text-start relative
    after:absolute after:w-full after:h-2/3 after:left-0 after:bottom-0
    after:bg-gradient-to-t after:from-surface-100 dark:after:from-surface-800 after:to-transparent"
	>
		{text}
	</p>
	<p class="absolute bottom-5 right-5 text-surface-800-100-token">{index + 1}</p>
</button>
