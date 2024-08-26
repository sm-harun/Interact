<script>
	import MainHeader from '$lib/components/UI/MainHeader.svelte';
	import { fly } from 'svelte/transition';
</script>

<div class="h-screen flex flex-col">
	<MainHeader />

	<main class="p-5">
		<p
			class="text-4xl"
			in:fly={{ x: -100, duration: 500, delay: 500 }}
			out:fly={{ x: -100, duration: 500 }}
		>
			This is the <strong>Home</strong> Page.
		</p>
	</main>
</div>
