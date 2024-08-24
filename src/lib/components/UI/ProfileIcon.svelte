<script lang="ts">
	import { Avatar, popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import {
		getAuth,
		onAuthStateChanged,
		GoogleAuthProvider,
		signInWithPopup,
		signOut
	} from 'firebase/auth';
	import { app } from '$lib/firebase';
	import type { User } from 'firebase/auth';

	const auth = getAuth(app);
	let user: User | null = null;

	let provider = new GoogleAuthProvider();

	onAuthStateChanged(auth, (currentUser) => {
		if (currentUser) {
			user = currentUser; // User is signed in
		} else {
			user = null; // User is signed out
		}
	});

	const profilePopup: PopupSettings = {
		event: 'click',
		target: 'profile-settings',
		placement: 'bottom',
		closeQuery: '*'
	};
</script>

{#if user}
	<div
		class="w-auto h-auto hover:brightness-125 active:scale-95 transition"
		use:popup={profilePopup}
	>
		<Avatar src={user?.photoURL} width="w-12" rounded="rounded-full" />
	</div>
{:else}
	<a
		class="text-xl btn rounded-full hover:bg-secondary-500/30"
		href="/"
		on:click={() => signInWithPopup(auth, provider)}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="size-6 mr-2"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
			/>
		</svg>
		<span>Log In</span>
	</a>
{/if}

<div class="w-60 p-3 rounded-xl variant-glass-primary" data-popup="profile-settings">
	<h1 class="text-xl font-bold px-3 mb-3">{user?.displayName}</h1>
	<button
		on:click={() => signOut(auth)}
		class="text-xl btn rounded-full w-full justify-between hover:bg-secondary-500/30 closer"
	>
		<span>Log out</span>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="size-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
			/>
		</svg>
	</button>
</div>
