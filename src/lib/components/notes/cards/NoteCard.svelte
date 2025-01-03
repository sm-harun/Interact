<script lang="ts">
	import { slide } from 'svelte/transition';

	interface Props {
		title: string;
		text: string;
		index: number;
		loadNote: (title: string) => void;
	}

	let { title, text, index, loadNote }: Props = $props();
</script>

<button
	class="card card-hover relative flex size-60 flex-col items-center gap-5 p-4"
	onclick={() => loadNote(title)}
	transition:slide={{ axis: 'x' }}
>
	<h1 class="h3 flex-shrink-0 text-center">{title}</h1>
	<p
		class="relative w-full flex-grow overflow-hidden text-start
    after:absolute after:bottom-0 after:left-0 after:h-2/3 after:w-full
    after:bg-gradient-to-t after:from-surface-100 after:to-transparent dark:after:from-surface-800"
	>
		{text}
	</p>
	<p class="text-surface-800-100-token absolute bottom-5 right-5">{index + 1}</p>
</button>
