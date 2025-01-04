<script lang="ts">
	import CardShadow from '$lib/components/general/cardComponents/CardShadow.svelte';
	import ClassContainer from './ClassContainer.svelte';
	import PartContainer from './PartContainer.svelte';

	// Status of the navbar whether it is opened or closed
	let navBarStatus = $state(false);
</script>

<div
	class="variant-glass-surface absolute right-0 top-1/2 h-[90%] w-[45rem] -translate-y-1/2 overflow-visible rounded-bl-3xl rounded-tl-3xl transition duration-1000 ease-in-out {navBarStatus
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
			<ClassContainer title="The Skull">
				<PartContainer title="Sternum">
					<p>
						This bony structure protects the brain and supports the facial structure. It consists of
						This bony structure protects the brain and supports the facial structure. It consists of
						This bony structure protects the brain and supports the facial structure. It consists of
						This bony structure protects the brain and supports the facial structure. It consists of
						This bony structure protects the brain and supports the facial structure. It consists of
						several bones fused together, including the frontal, parietal, occipital, and temporal
						several bones fused together, including the frontal, parietal, occipital, and temporal
						This bony structure protects the brain and supports the facial structure. It consists of
						several bones fused together, including the frontal, parietal, occipital, and temporal
						This bony structure protects the brain and supports the facial structure. It consists of
						several bones fused together, including the frontal, parietal, occipital, and temporal
						several bones fused together, including the frontal, parietal, occipital, and temporal
						This bony structure protects the brain and supports the facial structure. It consists of
						several bones fused together, including the frontal, parietal, occipital, and temporal
						several bones fused together, including the frontal, parietal, occipital, and temporal
						several bones fused together, including the frontal, parietal, occipital, and temporal
						bones.
					</p>
				</PartContainer>
				<PartContainer title="Sternum">
					<p>
						This bony structure protects the brain and supports the facial structure. It consists of
						several bones fused together, including the frontal, parietal, occipital, and temporal
						bones.
					</p>
				</PartContainer>
				<PartContainer title="Sternum">
					<p>
						This bony structure protects the brain and supports the facial structure. It consists of
						several bones fused together, including the frontal, parietal, occipital, and temporal
						bones.
					</p>
				</PartContainer>
				<PartContainer title="Sternum">
					<p>
						This bony structure protects the brain and supports the facial structure. It consists of
						several bones fused together, including the frontal, parietal, occipital, and temporal
						bones.
					</p>
				</PartContainer>
				<PartContainer title="Sternum">
					<p>
						This bony structure protects the brain and supports the facial structure. It consists of
						several bones fused together, including the frontal, parietal, occipital, and temporal
						bones.
					</p>
				</PartContainer>
				<PartContainer title="Sternum">
					<p>
						This bony structure protects the brain and supports the facial structure. It consists of
						several bones fused together, including the frontal, parietal, occipital, and temporal
						bones.
					</p>
				</PartContainer>
				<PartContainer title="Sternum">
					<p>
						This bony structure protects the brain and supports the facial structure. It consists of
						several bones fused together, including the frontal, parietal, occipital, and temporal
						bones.
					</p>
				</PartContainer>
				<PartContainer title="Sternum">
					<p>
						This bony structure protects the brain and supports the facial structure. It consists of
						several bones fused together, including the frontal, parietal, occipital, and temporal
						bones.
					</p>
				</PartContainer>
				<PartContainer title="Sternum">
					<p>
						This bony structure protects the brain and supports the facial structure. It consists of
						several bones fused together, including the frontal, parietal, occipital, and temporal
						bones.
					</p>
				</PartContainer>
			</ClassContainer>
			<ClassContainer title="The Thorax">
				<PartContainer title="Sternum">
					<p>
						This bony structure protects the brain and supports the facial structure. It consists of
						This bony structure protects the brain and supports the facial structure. It consists of
						This bony structure protects the brain and supports the facial structure. It consists of
						This bony structure protects the brain and supports the facial structure. It consists of
						This bony structure protects the brain and supports the facial structure. It consists of
						several bones fused together, including the frontal, parietal, occipital, and temporal
						several bones fused together, including the frontal, parietal, occipital, and temporal
						This bony structure protects the brain and supports the facial structure. It consists of
						several bones fused together, including the frontal, parietal, occipital, and temporal
						This bony structure protects the brain and supports the facial structure. It consists of
						several bones fused together, including the frontal, parietal, occipital, and temporal
						several bones fused together, including the frontal, parietal, occipital, and temporal
						This bony structure protects the brain and supports the facial structure. It consists of
						several bones fused together, including the frontal, parietal, occipital, and temporal
						several bones fused together, including the frontal, parietal, occipital, and temporal
						several bones fused together, including the frontal, parietal, occipital, and temporal
						bones.
					</p>
				</PartContainer>
				<PartContainer title="Sternum">
					<p>
						This bony structure protects the brain and supports the facial structure. It consists of
						several bones fused together, including the frontal, parietal, occipital, and temporal
						bones.
					</p>
				</PartContainer>
				<PartContainer title="Sternum">
					<p>
						This bony structure protects the brain and supports the facial structure. It consists of
						several bones fused together, including the frontal, parietal, occipital, and temporal
						bones.
					</p>
				</PartContainer>
				<PartContainer title="Sternum">
					<p>
						This bony structure protects the brain and supports the facial structure. It consists of
						several bones fused together, including the frontal, parietal, occipital, and temporal
						bones.
					</p>
				</PartContainer>
				<PartContainer title="Sternum">
					<p>
						This bony structure protects the brain and supports the facial structure. It consists of
						several bones fused together, including the frontal, parietal, occipital, and temporal
						bones.
					</p>
				</PartContainer>
				<PartContainer title="Sternum">
					<p>
						This bony structure protects the brain and supports the facial structure. It consists of
						several bones fused together, including the frontal, parietal, occipital, and temporal
						bones.
					</p>
				</PartContainer>
				<PartContainer title="Sternum">
					<p>
						This bony structure protects the brain and supports the facial structure. It consists of
						several bones fused together, including the frontal, parietal, occipital, and temporal
						bones.
					</p>
				</PartContainer>
				<PartContainer title="Sternum">
					<p>
						This bony structure protects the brain and supports the facial structure. It consists of
						several bones fused together, including the frontal, parietal, occipital, and temporal
						bones.
					</p>
				</PartContainer>
				<PartContainer title="Sternum">
					<p>
						This bony structure protects the brain and supports the facial structure. It consists of
						several bones fused together, including the frontal, parietal, occipital, and temporal
						bones.
					</p>
				</PartContainer>
			</ClassContainer>
		</div>
	</div>
	<CardShadow heightPercent={10} />
</div>
