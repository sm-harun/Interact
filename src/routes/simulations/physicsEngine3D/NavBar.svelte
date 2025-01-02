<script lang="ts">
	import { cubicInOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import ObjectsSection from './NavBarSections/ObjectsSection.svelte';
	import RecordingsSection from './NavBarSections/RecordingsSection.svelte';
	import StatesSection from './NavBarSections/StatesSection.svelte';

	// Status of the navbar whether it is opened or closed
	let navBarStatus = $state(false);

	let navSectionsStatus = tweened<number>(0, {
		duration: 1000,
		easing: cubicInOut
	});

	let headerSectionIndicator = tweened<number>(0, {
		duration: 1000,
		easing: cubicInOut
	});
</script>

<nav
	class="variant-glass absolute top-0 left-0 w-[30rem] h-full transition duration-1000 flex flex-col border-2 border-surface-300-600-token {navBarStatus
		? ''
		: '-translate-x-full'}"
>
	<button
		class="absolute left-full top-24 bg-surface-200-700-token px-3 py-7 rounded-r-xl"
		aria-label="hide navbar"
		onclick={() => (navBarStatus = !navBarStatus)}
	>
		<svg
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="size-6 transition {navBarStatus ? '' : 'rotate-180'}"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
		</svg>
	</button>
	<header class="flex-shrink-0 h-24 w-full grid grid-cols-3 z-30 relative">
		<button
			class="border-r-2 border-b-2 border-surface-300-600-token grid place-items-center"
			aria-label="Record Objects"
			onclick={() => {
				navSectionsStatus.set(0);
				headerSectionIndicator.set(0);
			}}
		>
			<svg fill="currentColor" viewBox="0 0 36 36" class="size-[60%]">
				<path
					class="clr-i-outline clr-i-outline-path-1"
					d="M16.08,14.9a10.41,10.41,0,0,1,1.87-.71l-4-10.77a2,2,0,0,0-3.75,0L2,25.26A2,2,0,0,0,3.92,28h6.94a10,10,0,0,1-.52-2H3.92L12.06,4.12Z"
				></path><path
					class="clr-i-outline clr-i-outline-path-2"
					d="M32,9H22a2,2,0,0,0-2,2v2.85c.23,0,.46,0,.69,0A10.51,10.51,0,0,1,22,13.9V11H32V21H30.65a10.42,10.42,0,0,1,.45,2H32a2,2,0,0,0,2-2V11A2,2,0,0,0,32,9Z"
				></path><path
					class="clr-i-outline clr-i-outline-path-3"
					d="M20.69,15.81a8.5,8.5,0,1,0,8.5,8.5A8.51,8.51,0,0,0,20.69,15.81Zm0,15a6.5,6.5,0,1,1,6.5-6.5A6.51,6.51,0,0,1,20.69,30.81Z"
				></path> <rect x="0" y="0" width="36" height="36" fill-opacity="0"></rect>
			</svg>
		</button>
		<button
			class="border-r-2 border-b-2 border-surface-300-600-token grid place-items-center"
			aria-label="Record Objects"
			onclick={() => {
				navSectionsStatus.set(100);
				headerSectionIndicator.set(33.3);
			}}
		>
			<svg
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-[60%]"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
				/>
			</svg>
		</button>
		<button
			class="border-b-2 border-surface-300-600-token grid place-items-center"
			aria-label="Record Objects"
			onclick={() => {
				navSectionsStatus.set(200);
				headerSectionIndicator.set(66.6);
			}}
		>
			<svg viewBox="0 0 1024 1024" fill="currentColor" class="size-[60%] stroke-surface-500"
				><path
					d="M714 762.2h-98.2c-16.6 0-30 13.4-30 30s13.4 30 30 30H714c16.6 0 30-13.4 30-30s-13.4-30-30-30zM487.4 762.2H147.1c-16.6 0-30 13.4-30 30s13.4 30 30 30h340.3c16.6 0 30-13.4 30-30s-13.4-30-30-30z"
					class="fill-primary-500"
				></path><path
					d="M838.253 130.023l65.548 65.548-57.982 57.983-65.549-65.549z"
					class="fill-primary-500"
				></path><path
					d="M743.7 955.9H195.8c-53.7 0-97.4-43.7-97.4-97.4V174.8c0-53.7 43.7-97.4 97.4-97.4H615c16.6 0 30 13.4 30 30s-13.4 30-30 30H195.8c-20.6 0-37.4 16.8-37.4 37.4v683.7c0 20.6 16.8 37.4 37.4 37.4h547.9c20.6 0 37.4-16.8 37.4-37.4v-395c0-16.6 13.4-30 30-30s30 13.4 30 30v395.1c0 53.6-43.7 97.3-97.4 97.3z"
					class="fill-surface-400-600-token"
				></path><path
					d="M907.7 122.1l-39.2-39.2c-24-24-65.1-21.9-91.7 4.7L419.5 445 347 643.6l198.6-72.4L903 213.8c12.1-12.1 19.6-27.7 21.1-44 1.8-18.1-4.3-35.5-16.4-47.7zM512.6 519.3L447.5 543l23.7-65.1 264.7-264.7 40.9 41.7-264.2 264.4z m348-347.9l-41.3 41.3-40.9-41.7 40.9-40.9c3.1-3.1 6.2-3.9 7.6-3.9l37.6 37.6c-0.1 1.3-0.9 4.5-3.9 7.6z"
					class="fill-secondary-500"
				></path></svg
			>
		</button>
		<div
			class="absolute top-0 w-1/3 h-full bg-primary-500/30 -z-20"
			style="left: {$headerSectionIndicator}%"
		></div>
	</header>
	<section class="flex-grow w-full relative overflow-hidden">
		<ObjectsSection {navSectionsStatus} />
		<RecordingsSection {navSectionsStatus} />
		<StatesSection {navSectionsStatus} />
	</section>
</nav>
