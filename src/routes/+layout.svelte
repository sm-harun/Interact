<script lang="ts">
	import '../app.postcss';

	import ThemesPopup from '$lib/components/UI/popups/ThemesPopup.svelte';
	import ProfileIconPopup from '$lib/components/UI/popups/ProfileIconPopup.svelte';
	import LoginButtonPopup from '$lib/components/UI/popups/LoginButtonPopup.svelte';

	import { themesPopupState, profilePopupState, loginPopupState } from '$lib/stores/components';

	import { getAuth, onAuthStateChanged } from 'firebase/auth';
	import { app } from '$lib/firebase';
	import { setUser } from '$lib/stores/credentials';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import { initializeStores, Modal, Toast } from '@skeletonlabs/skeleton';

	import { onDestroy } from 'svelte';

	initializeStores();

	let auth = getAuth(app);
	let unsubscribe = onAuthStateChanged(auth, (currentUser) => {
		if (currentUser) {
			setUser(currentUser);
		} else {
			setUser(null);
		}
	});

	onDestroy(() => {
		unsubscribe;
	});
</script>

<Modal padding="p-7" />
<Toast />

{#if $themesPopupState}
	<ThemesPopup />
{/if}

{#if $profilePopupState}
	<ProfileIconPopup />
{/if}

{#if $loginPopupState}
	<LoginButtonPopup />
{/if}

<slot />
