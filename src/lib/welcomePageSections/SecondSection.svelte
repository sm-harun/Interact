<script lang="ts">
	import WaveAnimation from './animations/WaveAnimation.svelte';

	import PhysicsEngineCard from '../../routes/simulations/physicsEngine2D/MainCard.svelte';

	import HumanSkeletonCard from '$lib/components/simulations/biology/humanskeleton/MainCard.svelte';
	import AiChat from '$lib/components/courses/workingSpaces/AIChat.svelte';

	import AddingTwoVectors from '$lib/welcomePageSections/sections/AddingTwoVectors.svelte';
	import ViewContainer from './sections/ViewContainer.svelte';
	import { setTheme, theme } from '$lib/stores/themes';
	import { onMount } from 'svelte';

	let viewThemes = [
		{ name: 'Crimson', theme: 'crimson', icon: '⭕' },
		{ name: 'Skeleton', theme: 'skeleton', icon: '💀' },
		{ name: 'Vintage', theme: 'vintage', icon: '🚀' },
		{ name: 'Modern', theme: 'modern', icon: '🤖' },
		{ name: 'Hamlindigo', theme: 'hamlindigo', icon: '👔' },
		{ name: 'Rocket', theme: 'rocket', icon: '🚀' }
	];

	onMount(() => {
		let observer2 = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('show');
				}
			});
		});

		let elements = document.querySelectorAll('.sec-observed');
		elements.forEach((element) => observer2.observe(element));
	});
</script>

<div
	class="bg-surface-200-700-token relative grid h-[500vh] w-full grid-cols-1 grid-rows-1 overflow-y-visible xl:grid-cols-2"
>
	<WaveAnimation position="bottom" />

	<div class="absolute top-0 grid h-full w-full items-start justify-center xl:static">
		<div
			class="sticky top-20 z-30 my-14 flex -translate-y-1/2 flex-col items-center xl:sticky xl:top-1/2 xl:my-96 xl:items-start"
		>
			<h1 class="main-opener sec-observed h1 font-bold opacity-0">Start learning</h1>
			<p
				class="description sec-observed text-surface-500-400-token w-[90%] text-center opacity-0 xl:text-start"
			>
				Take courses with a lot of interactive examples to boost your creativity
			</p>
		</div>
	</div>
	<div class="relative box-border flex flex-col items-center justify-start">
		<ViewContainer>
			<AddingTwoVectors />
		</ViewContainer>

		<ViewContainer animateBorder={true}>
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

		<!-- Third View (AI Chat) -->
		<!-- <div class="flex h-screen w-full flex-col items-center gap-10 px-14 py-36"> -->
		<!-- 	<div class="border-surface-300-600-token size-full border-2"> -->
		<ViewContainer>
			<AiChat />
		</ViewContainer>
		<!-- </div> -->
		<!-- </div> -->

		<!-- Forth View (Notes) -->
		<ViewContainer>
			<img
				src="/welcomePageAssets/notes-photo.png"
				alt="Notes Example image"
				class="size-full object-contain"
			/>
		</ViewContainer>

		<!-- Fifth View (Tests) -->
		<!-- <div class="grid w-[80%] grid-cols-2 grid-rows-2 gap-5"> -->
		<ViewContainer>
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
	<div class="show hidden"></div>

	<WaveAnimation position="top" />
</div>

<style>
	.show {
		animation: fadeIn var(--fade-time) ease-in-out forwards;
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
