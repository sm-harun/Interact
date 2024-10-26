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
	class="card card-hover size-full p-5 py-5 flex flex-col justify-center"
	onclick={todo}
	transition:slide={{ axis: 'x' }}
>
	<h2 class="h3">{title}</h2>
	<p>{notes} notes</p>
</button>
