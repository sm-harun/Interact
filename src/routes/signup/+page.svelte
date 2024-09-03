<script lang="ts">
	import { fly } from 'svelte/transition';

	import { theme } from '$lib/stores/themes';

	import ThemesButton from '$lib/components/UI/header/ThemesButton.svelte';
	import Google from '$lib/components/authentication/Google.svelte';

	import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
	import { app, DataBase } from '$lib/firebase';
	import { goto } from '$app/navigation';

	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { doc, setDoc } from 'firebase/firestore';
	import HomeButton from '$lib/components/UI/header/HomeButton.svelte';

	let auth = getAuth(app);

	let email: string;
	let password: string;
	let username: string;

	const toastStore = getToastStore();

	async function signUpWithEmail() {
		await createUserWithEmailAndPassword(auth, email, password)
			.then(async (userCredentials) => {
				await updateProfile(userCredentials.user, {
					displayName: username
				});

				const docRef = doc(DataBase, 'users', userCredentials.user.uid);
				const userData = {
					theme: $theme
				};
				await setDoc(docRef, userData);

				goto('/home');

				const signInToast: ToastSettings = {
					message: `Successfully Signed in as: ${username}`,
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
	in:fly={{ x: 100, duration: 1000 }}
>
	<div class="absolute top-5 right-5 flex items-center">
		<HomeButton />
		<ThemesButton />
	</div>
	<h1 class="text-8xl w-full h-72 grid place-items-center text-primary-500 font-bold">Interact</h1>
	<section
		class="w-96 bg-surface-200-700-token p-8 border-token border-primary-500 rounded-container-token"
	>
		<h1 class="h2 font-bold text-primary-500">Sign Up</h1>
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
			<label class="label">
				<span>Username: </span>
				<input class="input" type="text" placeholder="username" bind:value={username} />
			</label>
			<a class="btn variant-filled" on:click={signUpWithEmail} href="/">Sign up</a>
			<a href="/signin" class="anchor text-sm">I have an account?</a>
		</div>
	</section>
	<Google />
</main>
