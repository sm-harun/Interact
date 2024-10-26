<script lang="ts">
	import '../app.postcss';

	import ThemesPopup from '$lib/components/general/popups/ThemesPopup.svelte';
	import ProfileIconPopup from '$lib/components/general/popups/ProfileIconPopup.svelte';
	import LoginButtonPopup from '$lib/components/general/popups/LoginButtonPopup.svelte';

	import {
		themesPopupState,
		profilePopupState,
		loginPopupState,
		sectionPopupState,
		dictPopupState
	} from '$lib/stores/components';

	import { getAuth, onAuthStateChanged } from 'firebase/auth';
	import { app } from '$lib/firebase';
	import { setUser } from '$lib/stores/credentials';

	import { doc, getDoc } from 'firebase/firestore';
	import { DataBase } from '$lib/firebase';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import { initializeStores, Modal, Toast } from '@skeletonlabs/skeleton';

	import { onDestroy } from 'svelte';
	import { setTheme } from '$lib/stores/themes';
	import AddSectionPrompt from '$lib/components/create/popups/AddSectionPrompt.svelte';
	import DictionaryPopup from '$lib/components/courses/Sections/DictionaryPopup.svelte';

	import 'katex/dist/katex.min.css';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	initializeStores();
	let auth = getAuth(app);

	async function fetchThemesData() {
		let docSnap = await getDoc(doc(DataBase, 'users', auth.currentUser?.uid));
		let userData = docSnap.data();
		return userData?.theme;
	}

	let unsubscribe = onAuthStateChanged(auth, (currentUser) => {
		if (currentUser) {
			setUser(currentUser);
			fetchThemesData().then((theme) => {
				if (theme) setTheme(theme);
			});
		} else {
			setUser(null);
		}
	});

	onDestroy(() => {
		unsubscribe();
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

{#if $sectionPopupState}
	<AddSectionPrompt />
{/if}

{#if $dictPopupState}
	<DictionaryPopup />
{/if}

{@render children?.()}
