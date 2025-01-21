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

	import { doc, getDoc, disableNetwork, enableNetwork } from 'firebase/firestore';
	import { DataBase } from '$lib/firebase';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import {
		initializeStores,
		Modal,
		Toast,
		modeCurrent,
		setModeCurrent
	} from '@skeletonlabs/skeleton';

	import { onDestroy, onMount } from 'svelte';
	import { setTheme, theme } from '$lib/stores/themes';
	import AddSectionPrompt from '$lib/components/create/popups/AddSectionPrompt.svelte';
	import DictionaryPopup from '$lib/components/courses/Sections/DictionaryPopup.svelte';

	import 'katex/dist/katex.min.css';
	import { getCurrentThemeColor } from '$lib/utils';
	interface Props {
		children?: import('svelte').Snippet;
	}

	onMount(() => {
		setModeCurrent($modeCurrent);
	});

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

	window.addEventListener('online', async () => {
		await enableNetwork(DataBase);
	});

	window.addEventListener('offline', async () => {
		await disableNetwork(DataBase);
	});

	// This will change the meta tag based on the theme and dark mode for updating top and bottom bar for PWA users
	$effect(() => {
		$theme;

		const tone = $modeCurrent ? '200' : '700';
		const color = getComputedStyle(document.body).getPropertyValue(`--color-surface-${tone}`);

		const themeColorMetaTag = document.querySelector('meta[name="theme-color"]');
		if (themeColorMetaTag) {
			themeColorMetaTag.setAttribute('content', `rgb(${color})`);
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
