<script lang="ts">
	import { app } from '$lib/firebase';
	import type { User } from 'firebase/auth';
	import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
	import { onDestroy } from 'svelte';
	import ProfileIcon from './ProfileIcon.svelte';
	import LoginButton from './LoginButton.svelte';

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

	let button: HTMLButtonElement;
</script>

{#if user}
	<ProfileIcon {user} />
{:else}
	<LoginButton />
{/if}
