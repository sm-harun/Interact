<script lang="ts">
	import { cubicInOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import ObjectsSection from './NavBarSections/objectSection/ObjectsSection.svelte';
	import RecordingsSection from './NavBarSections/RecordingsSection.svelte';
	import StatesSection from './NavBarSections/StatesSection.svelte';
	import WorldSettings from './NavBarSections/WorldSettings.svelte';

	interface Props {
		navBarStatus: boolean;
	}

	let { navBarStatus = $bindable() }: Props = $props();

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
	class="variant-glass border-surface-300-600-token absolute bottom-0 left-0 flex h-[90%] w-[20rem] flex-col border-2 transition duration-1000 min-[470px]:w-[25rem] sm:w-[30rem] {navBarStatus
		? ''
		: '-translate-x-full'}"
>
	<button
		class="bg-surface-200-700-token absolute left-full top-24 rounded-r-xl px-3 py-7"
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
	<header class="relative z-30 grid h-24 w-full flex-shrink-0 grid-cols-4">
		<button
			class="border-surface-300-600-token grid place-items-center border-b-2 border-r-2"
			aria-label="Record Objects"
			onclick={() => {
				navSectionsStatus.set(0);
				headerSectionIndicator.set(0);
			}}
		>
			<svg viewBox="0 0 36 36" class="size-[60%]" xmlns="http://www.w3.org/2000/svg">
				<path
					class="clr-i-outline clr-i-outline-path-1 fill-secondary-500"
					d="M16.08,14.9a10.41,10.41,0,0,1,1.87-.71l-4-10.77a2,2,0,0,0-3.75,0L2,25.26A2,2,0,0,0,3.92,28h6.94a10,10,0,0,1-.52-2H3.92L12.06,4.12Z"
				></path><path
					class="clr-i-outline clr-i-outline-path-2 fill-primary-500"
					d="M32,9H22a2,2,0,0,0-2,2v2.85c.23,0,.46,0,.69,0A10.51,10.51,0,0,1,22,13.9V11H32V21H30.65a10.42,10.42,0,0,1,.45,2H32a2,2,0,0,0,2-2V11A2,2,0,0,0,32,9Z"
				></path><path
					class="clr-i-outline clr-i-outline-path-3 fill-tertiary-500"
					d="M20.69,15.81a8.5,8.5,0,1,0,8.5,8.5A8.51,8.51,0,0,0,20.69,15.81Zm0,15a6.5,6.5,0,1,1,6.5-6.5A6.51,6.51,0,0,1,20.69,30.81Z"
				></path> <rect x="0" y="0" width="36" height="36" fill-opacity="0"></rect>
			</svg>
		</button>
		<button
			class="border-surface-300-600-token grid place-items-center border-b-2 border-r-2"
			aria-label="Record Objects"
			onclick={() => {
				navSectionsStatus.set(100);
				headerSectionIndicator.set(25);
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-[50%]"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
				/>
			</svg>
		</button>
		<button
			class="border-surface-300-600-token grid place-items-center border-b-2 border-r-2"
			aria-label="Record Objects"
			onclick={() => {
				navSectionsStatus.set(200);
				headerSectionIndicator.set(50);
			}}
		>
			<svg viewBox="0 0 1024 1024" class="size-[50%]"
				><path
					d="M714 762.2h-98.2c-16.6 0-30 13.4-30 30s13.4 30 30 30H714c16.6 0 30-13.4 30-30s-13.4-30-30-30zM487.4 762.2H147.1c-16.6 0-30 13.4-30 30s13.4 30 30 30h340.3c16.6 0 30-13.4 30-30s-13.4-30-30-30z"
					class="fill-secondary-500"
				></path><path
					d="M838.253 130.023l65.548 65.548-57.982 57.983-65.549-65.549z"
					class="fill-primary-500"
				></path><path
					d="M743.7 955.9H195.8c-53.7 0-97.4-43.7-97.4-97.4V174.8c0-53.7 43.7-97.4 97.4-97.4H615c16.6 0 30 13.4 30 30s-13.4 30-30 30H195.8c-20.6 0-37.4 16.8-37.4 37.4v683.7c0 20.6 16.8 37.4 37.4 37.4h547.9c20.6 0 37.4-16.8 37.4-37.4v-395c0-16.6 13.4-30 30-30s30 13.4 30 30v395.1c0 53.6-43.7 97.3-97.4 97.3z"
					class="fill-tertiary-500"
				></path><path
					d="M907.7 122.1l-39.2-39.2c-24-24-65.1-21.9-91.7 4.7L419.5 445 347 643.6l198.6-72.4L903 213.8c12.1-12.1 19.6-27.7 21.1-44 1.8-18.1-4.3-35.5-16.4-47.7zM512.6 519.3L447.5 543l23.7-65.1 264.7-264.7 40.9 41.7-264.2 264.4z m348-347.9l-41.3 41.3-40.9-41.7 40.9-40.9c3.1-3.1 6.2-3.9 7.6-3.9l37.6 37.6c-0.1 1.3-0.9 4.5-3.9 7.6z"
					class="fill-primary-500"
				></path></svg
			>
		</button>
		<button
			class="border-surface-300-600-token grid place-items-center border-b-2"
			aria-label="Record Objects"
			onclick={() => {
				navSectionsStatus.set(300);
				headerSectionIndicator.set(75);
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-[40%]"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
				/>
			</svg>
		</button>
		<div
			class="absolute top-0 -z-20 h-full w-1/4 bg-primary-500/30"
			style="left: {$headerSectionIndicator}%"
		></div>
	</header>
	<section class="relative w-full flex-grow overflow-hidden">
		<ObjectsSection {navSectionsStatus} />
		<RecordingsSection {navSectionsStatus} />
		<StatesSection {navSectionsStatus} />
		<WorldSettings {navSectionsStatus} />
	</section>
</nav>
