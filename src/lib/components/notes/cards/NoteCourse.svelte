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
	class="w-96 h-24 rounded-container-token variant-glass-secondary flex justify-around items-center
                border-[0.1rem] border-transparent hover:scale-[1.02] hover:brightness-110 transition"
	onclick={todo}
>
	<h3 class="h2 text-overflow">{title}</h3>
	<p>{notes} notes</p>
</button>

<style>
	.text-overflow {
		line-clamp: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 250px;
	}
</style>
