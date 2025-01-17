<script lang="ts">
	import { page } from '$app/stores';

	import { slide } from 'svelte/transition';

	import { webTitle } from '$lib/stores/themes';

	import ThemeToggler from './ThemesButton.svelte';
	import TopIcon from './TopIcon.svelte';
	import HomeButton from './HomeButton.svelte';

	interface Props {
		title?: any;
		showMainRoutes?: boolean;
		showBackButton?: boolean;
		showHomeButton?: boolean;
		showSlidder?: boolean;
	}

	let {
		title = $webTitle,
		showMainRoutes = true,
		showBackButton = false,
		showHomeButton = false,
		showSlidder = false
	}: Props = $props();

	function goBack() {
		window.history.back();
	}

	let slidderPosition = $state(false);

	let routeState = $state($page.url.pathname);

	$effect(() => {
		// routeState = $page.url.pathname;
	});
</script>

<header
	class="{showMainRoutes ? '36 h-24' : 'h-24'} {slidderPosition && showSlidder
		? '-translate-y-full'
		: ''} header-shadow sticky top-0 z-40 flex w-screen flex-shrink-0 flex-col transition duration-500"
>
	<section class="bg-surface-100-800-token flex flex-[2_1_0] items-center justify-between p-3 px-5">
		<div class="flex items-center justify-between gap-4 pl-4">
			{#if showBackButton}
				<button onclick={goBack} aria-label="Back Button">
					<svg
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="mr-6 size-9"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
						/>
					</svg>
				</button>
			{/if}
			<h1 class="text-primary-800-100-token flex items-center text-3xl font-bold lg:text-5xl">
				{title}
			</h1>
		</div>
		<nav
			class="flex h-full list-none items-center justify-end gap-1 text-2xl lg:justify-evenly lg:gap-2 lg:pr-4"
		>
			{#if showHomeButton}
				<li>
					<HomeButton />
				</li>
			{/if}
			<li>
				<ThemeToggler />
			</li>
			<li>
				<TopIcon />
			</li>
		</nav>
	</section>

	<!-- Main Routes -->
	{#if showMainRoutes}
		<section
			class="header-shadow bg-surface-100-800-token absolute left-1/2 top-full -z-10 flex flex-[2_1_0] -translate-x-1/2 items-center justify-around
      overflow-x-auto p-4 px-10 text-xl rounded-bl-container-token rounded-br-container-token"
		>
			<ol class="flex gap-4">
				<li class="crumb">
					<a
						href="/home"
						class="relative grid place-items-center overflow-visible transition hover:text-secondary-500"
					>
						<span>Home</span>
						{#if routeState === '/home'}
							<div
								class="bg-primary-500-400-token absolute top-full -z-10 h-[3px] w-full rounded-container-token"
								transition:slide
							></div>
						{/if}
					</a>
				</li>
				<li class="crumb-separator" aria-hidden="true">&rsaquo;</li>
				<li class="crumb">
					<a
						href="/courses"
						class="relative grid place-items-center transition hover:text-secondary-500"
						><span>Courses</span>
						{#if routeState === '/courses'}
							<div
								class="bg-primary-500-400-token absolute top-full -z-10 h-[3px] w-full rounded-container-token"
								transition:slide
							></div>
						{/if}
					</a>
				</li>
				<li class="crumb-separator" aria-hidden="true">&rsaquo;</li>
				<li class="crumb">
					<a
						href="/notes"
						class="relative grid place-items-center transition hover:text-secondary-500"
						><span>Notes</span>
						{#if routeState === '/notes'}
							<div
								class="bg-primary-500-400-token absolute top-full -z-10 h-[3px] w-full rounded-container-token"
								transition:slide
							></div>
						{/if}
					</a>
				</li>
				<li class="crumb-separator" aria-hidden="true">&rsaquo;</li>
				<li class="crumb">
					<a
						href="/tests"
						class="relative grid place-items-center transition hover:text-secondary-500"
						><span>Tests</span>
						{#if routeState === '/tests'}
							<div
								class="bg-primary-500-400-token absolute top-full -z-10 h-[3px] w-full rounded-container-token"
								transition:slide
							></div>
						{/if}
					</a>
				</li>
				<li class="crumb-separator" aria-hidden="true">&rsaquo;</li>
				<li class="crumb">
					<a
						href="/simulations"
						class="relative grid place-items-center transition hover:text-secondary-500"
						><span>Simulations</span>
						{#if routeState === '/simulations'}
							<div
								class="bg-primary-500-400-token absolute top-full -z-10 h-[3px] w-full rounded-container-token"
								transition:slide
							></div>
						{/if}
					</a>
				</li>
			</ol>
		</section>
	{/if}

	<!-- Slidder Button -->
	{#if showSlidder}
		<button
			class="bg-surface-200-700-token absolute right-64 top-full rounded-b-xl px-8 py-3"
			aria-label="slide up the header"
			onclick={() => (slidderPosition = !slidderPosition)}
		>
			<svg
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-6 {slidderPosition ? '' : 'rotate-180'} transition"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
			</svg>
		</button>
	{/if}
</header>

<style>
	.header-shadow {
		box-shadow: 0 -0.5rem 2rem 0.1rem black;
	}
</style>
