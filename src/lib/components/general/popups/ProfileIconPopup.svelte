<script lang="ts">
	import { hideProfilePopup, profilePopupPosition } from '$lib/stores/components';
	import { onDestroy, onMount } from 'svelte';

	import { signOut, getAuth } from 'firebase/auth';

	import { fly } from 'svelte/transition';

	import {
		getModalStore,
		getToastStore,
		type ModalSettings,
		type ToastSettings
	} from '@skeletonlabs/skeleton';
	import Contacts from './Contacts.svelte';

	import { user } from '$lib/stores/credentials';

	let auth = getAuth();

	const modalStore = getModalStore();
	const toastStore = getToastStore();

	function confirmLogout() {
		const modal: ModalSettings = {
			type: 'confirm',
			title: 'Logging Out',
			body: 'Are you sure you want to log out?',
			response: (r: boolean) => {
				if (r === true) {
					signOut(auth)
						.then(() => {
							const signOutToast: ToastSettings = {
								message: 'Successfully Logged Out',
								hideDismiss: true,
								timeout: 3000
							};
							toastStore.trigger(signOutToast);
						})
						.catch((error) => {
							const signOutErrorToast: ToastSettings = {
								message: `Sign Out error: ${error.message}`,
								background: `variant-filled-error`,
								hideDismiss: true,
								timeout: 6000
							};
							toastStore.trigger(signOutErrorToast);
						});
				}
			}
		};
		modalStore.trigger(modal);
	}

	let popupElement: HTMLDivElement;

	function listentopointer(e: PointerEvent) {
		if (!popupElement.contains(e.target)) {
			hideProfilePopup();
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
	class="w-72 card p-3 rounded-container-token variant-surface-700 z-50 fixed"
	style="top: {$profilePopupPosition.y}px; right: {$profilePopupPosition.x}px;"
	bind:this={popupElement}
	in:fly={{ y: 10, duration: 300 }}
	out:fly={{ y: 10, duration: 300, delay: 200 }}
>
	<!-- Even if this component won't render, it will still be there, thats why ths if statement is needed. -->
	{#if $user}
		<h1 class="text-xl font-bold px-3 mb-3 w-full grid place-items-center">
			{$user.displayName}
		</h1>
		<hr class="mt-2 mb-2" />
	{/if}
	<a
		href="/create"
		class="text-xl btn rounded-container-token w-full justify-between hover:bg-primary-500/30"
		on:click={hideProfilePopup}
		><span>Create</span>
		<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
			/>
		</svg>
	</a>
	<a
		href="/settings"
		class="text-xl btn rounded-container-token w-full justify-between hover:bg-primary-500/30"
		on:click={hideProfilePopup}
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
	<a
		href="/test"
		class="text-xl btn rounded-container-token w-full justify-between hover:bg-primary-500/30"
		on:click={hideProfilePopup}
		><span>Test</span>
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
		on:click={() => {
			confirmLogout();
			hideProfilePopup();
		}}
		class="text-xl btn rounded-container-token w-full justify-between hover:bg-primary-500/30 close"
	>
		<span>Sign out</span>
		<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
			/>
		</svg>
	</button>
	<Contacts />
</div>
