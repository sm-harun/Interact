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
		showIcon?: boolean;
		showFlagIcon?: boolean;
		showSlidder?: boolean;
	}

	let {
		title = $webTitle,
		showMainRoutes = true,
		showBackButton = false,
		showHomeButton = false,
		showIcon = false,
		showFlagIcon = false,
		showSlidder = false
	}: Props = $props();

	function goBack() {
		window.history.back();
	}

	let slidderPosition = $state(false);

	let routeState = $state($page.url.pathname);
</script>

<header
	class="{showMainRoutes ? 'h-36 xl:h-24' : 'h-24'} {slidderPosition && showSlidder
		? '-translate-y-full'
		: ''} header-shadow sticky top-0 z-40 flex w-screen flex-shrink-0 flex-col transition duration-500"
>
	<section
		class="bg-surface-100-800-token flex flex-[2_1_0] items-center justify-between p-3 lg:px-2 xl:px-5"
	>
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
			{#if showIcon}
				<div>
					<svg viewBox="0 0 295 295" class="size-16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<circle cx="147" cy="143" r="101" stroke="url(#paint0_linear_0_1)" stroke-width="10" />
						<circle
							cx="147.5"
							cy="143.5"
							r="74.5"
							transform="rotate(-180 147.5 143.5)"
							stroke="url(#paint1_linear_0_1)"
							stroke-width="10"
						/>
						<circle
							cx="147.5"
							cy="143.5"
							r="48.5"
							stroke="url(#paint2_linear_0_1)"
							stroke-width="10"
						/>
						<defs>
							<filter
								id="filter0_d_0_1"
								x="0"
								y="0"
								width="295"
								height="295"
								filterUnits="userSpaceOnUse"
								color-interpolation-filters="sRGB"
							>
								<feFlood flood-opacity="0" result="BackgroundImageFix" />
								<feColorMatrix
									in="SourceAlpha"
									type="matrix"
									values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
									result="hardAlpha"
								/>
								<feOffset dy="4" />
								<feGaussianBlur stdDeviation="2" />
								<feComposite in2="hardAlpha" operator="out" />
								<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
								<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
								<feBlend
									mode="normal"
									in="SourceGraphic"
									in2="effect1_dropShadow_0_1"
									result="shape"
								/>
							</filter>
							<linearGradient
								id="paint0_linear_0_1"
								x1="147"
								y1="37"
								x2="147"
								y2="249"
								gradientUnits="userSpaceOnUse"
							>
								<stop style="stop-color: rgb(var(--color-primary-500));" />
								<stop offset="1" style="stop-color: rgb(var(--color-surface-800));" />
							</linearGradient>
							<linearGradient
								id="paint1_linear_0_1"
								x1="147.5"
								y1="64"
								x2="147.5"
								y2="223"
								gradientUnits="userSpaceOnUse"
							>
								<stop style="stop-color: rgb(var(--color-primary-500));" />
								<stop offset="1" style="stop-color: rgb(var(--color-surface-800));" />
							</linearGradient>
							<linearGradient
								id="paint2_linear_0_1"
								x1="147.5"
								y1="90"
								x2="147.5"
								y2="197"
								gradientUnits="userSpaceOnUse"
							>
								<stop style="stop-color: rgb(var(--color-primary-500));" />
								<stop offset="1" style="stop-color: rgb(var(--color-surface-800));" />
							</linearGradient>
						</defs>
					</svg>
				</div>
			{/if}
			<h1
				class="text-primary-800-100-token flex items-center text-3xl font-bold sm:text-4xl xl:text-5xl"
			>
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
			class="header-shadow bg-surface-100-800-token -z-10 flex flex-[2_1_0] items-center justify-around overflow-x-auto px-5 text-xl xl:absolute
      xl:left-1/2 xl:top-full xl:-translate-x-1/2 xl:p-4 xl:px-10 xl:rounded-bl-container-token xl:rounded-br-container-token"
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
