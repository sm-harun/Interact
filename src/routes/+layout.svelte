<script lang="ts">
	import '../app.postcss';

	import ThemesPopup from '$lib/components/UI/popups/ThemesPopup.svelte';
	import ProfileIconPopup from '$lib/components/UI/popups/ProfileIconPopup.svelte';

	import { themesPopupState, profilePopupState, loginPopupState } from '$lib/stores/components';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import { initializeStores, Modal, Toast } from '@skeletonlabs/skeleton';
	import LoginButtonPopup from '$lib/components/UI/popups/LoginButtonPopup.svelte';

	initializeStores();
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
