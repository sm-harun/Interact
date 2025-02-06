<script lang="ts">
	import WaveAnimation from './animations/WaveAnimation.svelte';
	import { fly } from 'svelte/transition';
	import { easeInOut } from '$lib/utils';

	import PhysicsEngineCard from '../../routes/simulations/physicsEngine2D/MainCard.svelte';

	import HumanSkeletonCard from '$lib/components/simulations/biology/humanskeleton/MainCard.svelte';
	import AiChat from '$lib/components/courses/workingSpaces/AIChat.svelte';

	import AddingTwoVectors from '$lib/welcomePageSections/sections/AddingTwoVectors.svelte';
	import ViewContainer from './sections/ViewContainer.svelte';
	import { setTheme, theme } from '$lib/stores/themes';
	import { onMount } from 'svelte';
	import Space from './sections/space.svelte';

	let viewThemes = [
		{ name: 'Crimson', theme: 'crimson', icon: '⭕' },
		{ name: 'Skeleton', theme: 'skeleton', icon: '💀' },
		{ name: 'Vintage', theme: 'vintage', icon: '🚀' },
		{ name: 'Modern', theme: 'modern', icon: '🤖' },
		{ name: 'Hamlindigo', theme: 'hamlindigo', icon: '👔' },
		{ name: 'Rocket', theme: 'rocket', icon: '🚀' }
	];

	let views: HTMLDivElement[] = [];

	let currentView = $state(0);

	onMount(() => {
		let titlesObserver = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('show');
				}
			});
		});

		let elements = document.querySelectorAll('.sec-observed');
		elements.forEach((element) => titlesObserver.observe(element));

		let viewsObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						currentView = parseInt(entry.target.dataset.index);
					}
				});
			},
			{
				threshold: 1
			}
		);

		views.forEach((view) => {
			viewsObserver.observe(view);
		});
	});

	const features = [
		{
			index: 2,
			title: 'Theme Customization',
			text: 'Personalize your learning environment with customizable themes to match your preferences and improve focus.'
		},
		{
			index: 3,
			title: 'AI Chatting',
			text: 'Get instant assistance and answers with an AI-powered chat system designed to enhance learning efficiency.'
		},
		{
			index: 4,
			title: 'Creating Courses',
			text: 'Easily design and structure courses and lessons with intuitive tools that cater to different learning styles.'
		},
		{
			index: 5,
			title: 'Notes and AI Curated Tests',
			text: 'Organize notes efficiently and generate AI-powered tests tailored to your learning progress for better retention.'
		}
	];
</script>

<div
	class="relative grid h-[700vh] w-full grid-cols-1 grid-rows-1 overflow-y-visible bg-gradient-to-b from-surface-200 from-10% via-surface-100 via-80% to-surface-200 xl:grid-cols-2 dark:from-surface-700 dark:via-surface-800 dark:to-surface-700"
>
	<WaveAnimation position="bottom" />

	<div class="absolute top-0 grid h-full w-full items-start xl:static xl:px-24">
		<div
			class="sticky top-20 z-30 my-14 grid w-full grid-cols-1 grid-rows-2 xl:sticky xl:top-1/2 xl:my-96"
		>
			{#if currentView < 2}
				<h1
					class="sec-observed h1 text-center font-bold xl:text-start"
					out:fly={{ y: -50, duration: 500, easing: easeInOut }}
				>
					Interactive Learning
				</h1>
				<p
					class="description sec-observed text-surface-500-400-token mx-auto h-10 w-[90%] text-center xl:mx-0 xl:text-start"
					out:fly={{ y: -50, duration: 500, easing: easeInOut }}
				>
					Engage with dynamic and hands-on educational experiences that enhance understanding
					through interactivity.
				</p>
			{/if}
			{#each features as feature}
				{#if currentView == feature.index}
					{console.log(feature.title)}
					<h1
						class="sec-observed h1 text-center font-bold xl:text-start"
						in:fly={{ y: 50, duration: 500, delay: 600, easing: easeInOut }}
						out:fly={{ y: -50, duration: 500, easing: easeInOut }}
					>
						{feature.title}
					</h1>
					<p
						class="description sec-observed text-surface-500-400-token mx-auto h-10 w-[90%] text-center xl:mx-0 xl:text-start"
						in:fly={{ y: 50, duration: 500, delay: 600, easing: easeInOut }}
						out:fly={{ y: -50, duration: 500, easing: easeInOut }}
					>
						{feature.text}
					</p>
				{/if}
			{/each}
		</div>
	</div>
	<div class="relative box-border flex flex-col items-center justify-start">
		<!-- First View (Visual) -->
		<ViewContainer bind:card={views[0]} index={1}>
			<AddingTwoVectors />
		</ViewContainer>

		<Space />

		<!-- Second View (themes) -->
		<ViewContainer animateBorder={true} bind:card={views[1]} index={2}>
			<div
				class="sec-observed absolute left-0 top-0 flex size-full flex-col items-stretch p-2 rounded-container-token lg:p-4"
				data-theme={$theme}
			>
				{#each viewThemes as currentTheme}
					<button
						class="variant-glass-primary btn flex h-20 w-full flex-1 items-center justify-between rounded-none px-10"
						onclick={() => setTheme(currentTheme.theme)}
						data-theme={currentTheme.theme}
					>
						<div class="flex items-center gap-4">
							<span>{currentTheme.icon}</span>
							<h3 class="h3">{currentTheme.name}</h3>
						</div>
						<div class="flex">
							<div class="size-4 rounded-full bg-primary-500 sm:size-8"></div>
							<div class="size-4 -translate-x-[30%] rounded-full bg-secondary-500 sm:size-8"></div>
							<div class="size-4 -translate-x-[60%] rounded-full bg-tertiary-500 sm:size-8"></div>
						</div>
					</button>
				{/each}
			</div>
		</ViewContainer>

		<Space />

		<!-- Third View (AI Chat) -->
		<ViewContainer bind:card={views[2]} index={3}>
			<AiChat />
		</ViewContainer>

		<Space />

		<!-- Forth View (Notes) -->
		<ViewContainer bind:card={views[3]} index={4}>
			<img
				src="/welcomePageAssets/notes-photo.png"
				alt="Notes Example image"
				class="size-full object-contain"
			/>
		</ViewContainer>

		<Space />

		<!-- Fifth View (Tests) -->
		<ViewContainer bind:card={views[4]} index={5}>
			<div class="grid size-full grid-cols-2 grid-rows-2 gap-5 p-14 pt-20 lg:pt-24">
				<img
					src="/welcomePageAssets/tests-image-1.png"
					class="col-span-1 row-span-2"
					alt="Tests Example 1 image"
				/>
				<img
					src="/welcomePageAssets/tests-image-2.png"
					class="col-span-1 row-span-1"
					alt="Tests Example 1 image"
				/>
				<img
					src="/welcomePageAssets/tests-image-3.png"
					class="col-span-1 row-span-1"
					alt="Tests Example 1 image"
				/>
			</div>
		</ViewContainer>
	</div>
	<div class="show absolute hidden"></div>
	<WaveAnimation position="top" />
</div>

<style>
	.show {
		animation: fadeIn 1s ease-in-out both;
	}

	.main-opener {
		--fade-time: 0.7s;
	}

	.description {
		--fade-time: 1s;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(100px);
		}

		to {
			transform: translateY(0);
			opacity: 1;
		}
	}
</style>
