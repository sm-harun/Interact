<script lang="ts">
	import { showLoginPopup } from '$lib/stores/components';
	import { onMount } from 'svelte';

	let button: HTMLButtonElement = $state();

	onMount(() => {
		button.onclick = (e) => {
			showLoginPopup(e);
		};
	});
</script>

<button
	class="text-xl btn rounded-container-token hover:bg-primary-500/30 relative"
	bind:this={button}
>
	<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
		/>
	</svg>

	<span class="hidden sm:inline">Sign In</span>
</button>
