<script lang="ts">
	import { slide } from 'svelte/transition';

	interface Props {
		title: string;
		notes: number;
		todo: () => void;
	}

	let { title, notes, todo }: Props = $props();
</script>

<button
	class="variant-glass-secondary flex h-24 w-96 items-center justify-around border-[0.1rem]
                border-transparent transition rounded-container-token hover:scale-[1.02] hover:brightness-110"
	onclick={todo}
>
	<h3 class="ellipsis-text h2">{title}</h3>
	<p>{notes} notes</p>
</button>
