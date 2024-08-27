<script lang="ts">
	import { app } from '$lib/firebase';
	import type { User } from 'firebase/auth';
	import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
	import { onDestroy } from 'svelte';
	import ProfileIcon from './ProfileIcon.svelte';

	const auth = getAuth(app);
	let user: User | undefined = undefined;

	let provider = new GoogleAuthProvider();

	// This will hold the onAuthStateChanged to destroy it later.
	let unsubscribeAuthListner = onAuthStateChanged(auth, (currentUser) => {
		if (currentUser) {
			user = currentUser;
		} else if (!currentUser) {
			user = undefined;
		}
	});

	onDestroy(() => {
		unsubscribeAuthListner();
	});
</script>

{#if user}
	<ProfileIcon {user} />
{:else}
	<button
		class="text-xl btn rounded-container-token hover:bg-primary-500/30 relative"
		on:click={() => signInWithPopup(auth, provider)}
	>
		<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
			/>
		</svg>

		<span class="hidden lg:inline">Log In</span>
	</button>
{/if}
