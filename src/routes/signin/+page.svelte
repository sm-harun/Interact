<script lang="ts">
	import { fly } from 'svelte/transition';

	import Google from '$lib/components/authentication/Google.svelte';
	import ThemesButton from '$lib/components/general/header/ThemesButton.svelte';
	import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

	import { DataBase } from '$lib/firebase';
	import { doc, getDoc } from 'firebase/firestore';

	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';

	import { setTheme } from '$lib/stores/themes';
	import HomeButton from '$lib/components/general/header/HomeButton.svelte';

	const toastStore = getToastStore();

	let email: string = $state();
	let password: string = $state();

	let auth = getAuth();

	function signInWithEmail() {
		signInWithEmailAndPassword(auth, email, password)
			.then(async (result) => {
				const docRef = doc(DataBase, 'users', result.user.uid);
				const userData = await getDoc(docRef);

				if (userData.exists()) {
					setTheme(userData.data().theme);
				}

				goto('/home');

				const signInToast: ToastSettings = {
					message: `Successfully Signed in as: ${result.user.displayName}`,
					background: `variant-filled-success`,
					hideDismiss: true,
					timeout: 3000
				};
				toastStore.trigger(signInToast);
			})
			.catch((error) => {
				const signInErrorToast: ToastSettings = {
					message: `Sign Up error: ${error.message}`,
					background: `variant-filled-error`,
					hideDismiss: true,
					timeout: 6000
				};
				toastStore.trigger(signInErrorToast);
			});
	}
</script>

<main
	class="w-screen h-screen flex flex-col items-center relative"
	in:fly={{ x: -100, duration: 1000 }}
>
	<div class="absolute top-5 right-5 flex items-center">
		<HomeButton />
		<ThemesButton />
	</div>
	<h1 class="text-8xl w-full h-72 grid place-items-center text-primary-500 font-bold">Interact</h1>
	<section
		class="w-96 bg-surface-200-700-token p-8 border-token border-primary-500 rounded-container-token"
	>
		<h1 class="h2 font-bold text-primary-500">Sign In</h1>
		<br />
		<div class="flex flex-col gap-4 rounded-container-token">
			<label class="label">
				<span>Email: </span>
				<input class="input" type="text" placeholder="Email" bind:value={email} />
			</label>
			<label class="label">
				<span>Password: </span>
				<input class="input" type="text" placeholder="password" bind:value={password} />
			</label>
			<button class="btn variant-filled" onclick={signInWithEmail}>Sign In</button>
			<a href="/signup" class="anchor text-sm">I don't have an account?</a>
		</div>
	</section>
	<Google />
</main>
