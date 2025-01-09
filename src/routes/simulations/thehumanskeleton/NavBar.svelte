<script lang="ts">
	import CardShadow from '$lib/components/general/cardComponents/CardShadow.svelte';
	import ClassContainer from './ClassContainer.svelte';
	import PartContainer from './PartContainer.svelte';

	// Status of the navbar whether it is opened or closed
	let navBarStatus = $state(true);

	async function fetchSkeletonData() {
		return fetch('/assets/HumanSkeletonData.json').then((response) => response.json());
	}
</script>

<div
	class="variant-glass-surface absolute right-0 top-1/2 h-[90%] w-[20rem] -translate-y-1/2 overflow-visible rounded-bl-3xl rounded-tl-3xl transition duration-1000 ease-in-out sm:w-[30rem] xl:w-[45rem] {navBarStatus
		? ''
		: 'translate-x-full'}"
>
	<button
		class="variant-glass-surface absolute right-full top-24 rounded-l-xl px-3 py-7"
		aria-label="hide navbar"
		onclick={() => (navBarStatus = !navBarStatus)}
	>
		<svg
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="size-6 transition {navBarStatus ? 'rotate-180' : ''}"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
		</svg>
	</button>

	<div class="size-full overflow-y-auto p-4 rounded-container-token">
		<h1 class="h1 grid w-full place-items-center p-5 py-10">The Human Skeleton</h1>
		<div class="flex flex-col gap-10 rounded-container-token">
			{#await fetchSkeletonData() then data}
				{#each data.data as part}
					<ClassContainer title={part.region}>
						{#each part.bones as bone}
							<PartContainer title={bone.name} type={bone.bone_type}>{bone.function}</PartContainer>
						{/each}
					</ClassContainer>
				{/each}
			{/await}
		</div>
	</div>
	<CardShadow heightPercent={10} />
</div>
