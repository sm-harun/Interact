<script lang="ts">
	import { page } from '$app/stores';

	import { fly, slide } from 'svelte/transition';

	import { webTitle } from '$lib/stores/themes';

	import ThemeToggler from './ThemesButton.svelte';
	import TopIcon from './TopIcon.svelte';
	import HomeButton from './HomeButton.svelte';

	interface Props {
		title?: any;
		showMainRoutes?: boolean;
		showBackButton?: boolean;
		showHomeButton?: boolean;
	}

	let {
		title = $webTitle,
		showMainRoutes = true,
		showBackButton = false,
		showHomeButton = false
	}: Props = $props();

	function goBack() {
		window.history.back();
	}
</script>

<header
	class="{showMainRoutes
		? 'h-36'
		: 'h-24'} flex-shrink-0 w-screen bg-surface-100-800-token sticky top-0 flex flex-col overflow-hidden header-shadow z-40"
>
	<section class="flex-[2_1_0] p-3 flex items-center justify-between">
		<div class="flex justify-between items-center gap-4 pl-4">
			{#if showBackButton}
				<button onclick={goBack} aria-label="Back Button">
					<svg
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-9 mr-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
						/>
					</svg>
				</button>
			{/if}
			<h1 class="text-3xl lg:text-5xl text-primary-800-100-token font-bold flex items-center">
				{title}
			</h1>
		</div>
		<nav
			class="h-full list-none text-2xl flex justify-end lg:justify-evenly items-center lg:pr-4 gap-1 lg:gap-2"
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

	{#if showMainRoutes}
		<section class="flex-[2_1_0] px-4 flex items-center overflow-x-auto">
			<ol class="flex gap-4">
				<li class="crumb">
					<a
						href="/home"
						class="text-lg hover:text-secondary-500 transition grid place-items-center relative overflow-visible"
					>
						<span>Home</span>
						{#if $page.url.pathname === '/home'}
							<div
								class="w-full h-[1px] bg-primary-500-400-token rounded-container-token absolute bottom-0 -z-10"
								transition:slide
							></div>
						{/if}
					</a>
				</li>
				<li class="crumb-separator" aria-hidden="true">&rsaquo;</li>
				<li class="crumb">
					<a
						href="/courses"
						class="text-lg hover:text-secondary-500 transition grid place-items-center relative"
						><span>Courses</span>
						{#if $page.url.pathname === '/courses'}
							<div
								class="w-full h-[1px] bg-primary-500-400-token rounded-container-token absolute bottom-0 -z-10"
								transition:slide
							></div>
						{/if}
					</a>
				</li>
				<li class="crumb-separator" aria-hidden="true">&rsaquo;</li>
				<li class="crumb">
					<a
						href="/notes"
						class="text-lg hover:text-secondary-500 transition grid place-items-center relative"
						><span>Notes</span>
						{#if $page.url.pathname === '/notes'}
							<div
								class="w-full h-[1px] bg-primary-500-400-token rounded-container-token absolute bottom-0 -z-10"
								transition:slide
							></div>
						{/if}
					</a>
				</li>
				<li class="crumb-separator" aria-hidden="true">&rsaquo;</li>
				<li class="crumb">
					<a
						href="/tests"
						class="text-lg hover:text-secondary-500 transition grid place-items-center relative"
						><span>Tests</span>
						{#if $page.url.pathname === '/tests'}
							<div
								class="w-full h-[1px] bg-primary-500-400-token rounded-container-token absolute bottom-0 -z-10"
								transition:slide
							></div>
						{/if}
					</a>
				</li>
				<li class="crumb-separator" aria-hidden="true">&rsaquo;</li>
				<li class="crumb">
					<a
						href="/simulations"
						class="text-lg hover:text-secondary-500 transition grid place-items-center relative"
						><span>Simulations</span>
						{#if $page.url.pathname === '/simulations'}
							<div
								class="w-full h-[1px] bg-primary-500-400-token rounded-container-token absolute bottom-0 -z-10"
								transition:slide
							></div>
						{/if}
					</a>
				</li>
			</ol>
		</section>
	{/if}
</header>

<style>
	.header-shadow {
		box-shadow: 0 -0.5rem 2rem 0.1rem black;
	}
</style>
