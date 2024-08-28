<script lang="ts">
	import { hideLoginPopup, loginPopupPosition } from '$lib/stores/components';
	import { onDestroy, onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	import { signInWithPopup, getAuth, GoogleAuthProvider } from 'firebase/auth';
	import { app } from '$lib/firebase';
	import Contacts from './Contacts.svelte';

	let auth = getAuth(app);
	let provider = new GoogleAuthProvider();

	let popupElement: HTMLDivElement;

	function listentopointer(e: PointerEvent) {
		if (!popupElement.contains(e.target)) {
			hideLoginPopup();
		}
	}

	onMount(() => {
		window.addEventListener('pointerdown', listentopointer);
	});

	onDestroy(() => {
		window.removeEventListener('pointerdown', listentopointer);
	});
</script>

<div
	class="w-72 card p-3 rounded-container-token variant-surface-700 z-50 absolute"
	style="top: {$loginPopupPosition.y}px; right: {$loginPopupPosition.x}px;"
	bind:this={popupElement}
	in:fly={{ y: 10, duration: 300 }}
	out:fly={{ y: 10, duration: 300, delay: 200 }}
>
	<button
		class="text-xl btn rounded-container-token w-full justify-between hover:bg-primary-500/30 close"
		on:click={() => signInWithPopup(auth, provider)}
	>
		<span>Log In</span>
		<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
			/>
		</svg>
	</button>
	<Contacts />
</div>
