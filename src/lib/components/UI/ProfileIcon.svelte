<script lang="ts">
	import { app } from '$lib/firebase';
	import {
		Avatar,
		getModalStore,
		getToastStore,
		popup,
		type ModalSettings,
		type PopupSettings,
		type ToastSettings
	} from '@skeletonlabs/skeleton';
	import type { User } from 'firebase/auth';
	import {
		getAuth,
		GoogleAuthProvider,
		onAuthStateChanged,
		signInWithPopup,
		signOut
	} from 'firebase/auth';
	import { onDestroy } from 'svelte';

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

	const profilePopup: PopupSettings = {
		event: 'click',
		target: 'profile-settings',
		placement: 'bottom',
		closeQuery: '.close'
	};

	const modalStore = getModalStore();
	const toastStore = getToastStore();

	function confirmLogout() {
		const modal: ModalSettings = {
			type: 'confirm',
			title: 'Logging Out',
			body: 'Are you sure you want to log out?',
			response: (r: boolean) => {
				if (r === true) {
					signOut(auth);

					const signOutToast: ToastSettings = {
						message: 'Successfully Logged Out.',
						hideDismiss: true,
						timeout: 3000
					};
					toastStore.trigger(signOutToast);
				}
			}
		};
		modalStore.trigger(modal);
	}

	onDestroy(() => {
		unsubscribeAuthListner();
	});
</script>

{#if user}
	<div
		class="w-auto h-auto hover:brightness-125 rounded-full border-2 border-surface-800-100-token active:scale-95 transition"
		use:popup={profilePopup}
	>
		<Avatar src={user.photoURL} width="w-8 lg:w-12" rounded="rounded-full" />
	</div>
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

<!-- Popup for a logged in user -->
<div
	class="w-72 card p-3 rounded-container-token variant-surface-700"
	data-popup="profile-settings"
>
	<h1 class="text-xl font-bold px-3 mb-3 w-full grid place-items-center">{user?.displayName}</h1>
	<hr class="mt-2 mb-2" />
	<a
		href="/settings"
		class="text-xl btn rounded-container-token w-full justify-between hover:bg-secondary-500/30 close"
		><span>Settings</span>
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
		on:click={confirmLogout}
		class="text-xl btn rounded-container-token w-full justify-between hover:bg-secondary-500/30 close"
	>
		<span>Log out</span>
		<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
			/>
		</svg>
	</button>

	<hr class="mt-2 mb-2" />
	<h1 class="w-full h-12 grid place-items-center text-lg">Contact</h1>

	<h2 class="text-base rounded-container-token w-full flex items-center gap-2 px-3">
		<svg role="img" viewBox="0 0 24 24" fill="currentColor" class="size-5"
			><title>Gmail</title><path
				d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
			/></svg
		>
		<span>Email</span>
	</h2>
	<p class="text-xs rounded-container-token w-full flex justify-start items-center mt-1 ml-2">
		interactlearningplatform@gmail.com
	</p>
	<br />
	<h2 class="text-base rounded-container-token w-full flex items-center gap-2 px-3">
		<svg role="img" viewBox="0 0 24 24" fill="currentColor" class="size-5"
			><path
				d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
			/></svg
		><span>Telegram</span>
	</h2>
	<a
		href="https://t.me/s_n_w_h"
		class="text-xs rounded-container-token w-full flex justify-start items-center mt-1 ml-2 underline"
		>t.me/s_n_w_h</a
	>
</div>
