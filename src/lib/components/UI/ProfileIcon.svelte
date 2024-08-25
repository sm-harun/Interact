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
	import ThemeToggler from './ThemeToggler.svelte';

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
		class="w-auto h-auto p-5 hover:brightness-125 active:scale-95 transition"
		use:popup={profilePopup}
	>
		<Avatar src={user.photoURL} width="w-8 lg:w-12" rounded="rounded-full" />
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
			class="size-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
			/>
		</svg>

		<span class="hidden lg:block">Log In</span>
	</a>
{/if}

<div
	class="w-60 p-3 rounded-xl variant-filled-primary border-2 border-primary-200/30"
	data-popup="profile-settings"
>
	<h1 class="text-xl font-bold px-3 mb-3 w-full grid place-items-center">{user?.displayName}</h1>
	<hr class="mt-2 mb-2" />
	<a
		href="/settings"
		class="text-xl btn rounded-full w-full justify-between hover:bg-secondary-500/30"
		><span>Settings</span><svg
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
				d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
			/>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
			/>
		</svg>
	</a>
	<button
		on:click={() => signOut(auth)}
		class="text-xl btn rounded-full w-full justify-between hover:bg-secondary-500/30"
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
