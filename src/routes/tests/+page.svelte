<script lang="ts">
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';
	import { fly } from 'svelte/transition';
</script>

<div class="h-screen flex flex-col">
	<MainHeader />
	<main
		class="flex-grow p-6 overflow-y-auto overflow-x-hidden"
		in:fly={{ x: 100, duration: 500, delay: 500 }}
		out:fly={{ x: -100, duration: 500 }}
	>
		<h1 class="h1 mb-3 bg-transparent">All Tests</h1>
		<div class="p-3 flex gap-4 flex-wrap">
			<a
				class="card card-hover variant-ghost-primary size-60 grid place-items-center"
				aria-label="Add Test Button"
				href="/tests/create-test"
			>
				<svg
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-[50%] aspect-square"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
				</svg>
			</a>
		</div>
	</main>
</div>
