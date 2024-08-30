<script lang="ts">
	import { fly } from 'svelte/transition';

	import ThemesButton from '$lib/components/UI/header/ThemesButton.svelte';
	import Google from '$lib/components/authentication/Google.svelte';

	import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
	import { app } from '$lib/firebase';

	let auth = getAuth(app);

	let email: string;
	let password: string;
	let username: string;

	function signUpWithEmail() {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredentials) => {
				console.log('Successfully Signed in', userCredentials);
			})
			.catch((error) => {
				console.log('Error ', error.code, ' ', error.message);
			});
	}
</script>

<main
	class="w-screen h-screen flex flex-col items-center relative"
	in:fly={{ x: 100, duration: 1000 }}
>
	<div class="absolute top-5 right-5 flex items-center">
		<a
			href="/"
			class="text-xl btn rounded-container-token hover:text-primary-500 justify-center lg:justify-between relative"
			>Home</a
		>
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
