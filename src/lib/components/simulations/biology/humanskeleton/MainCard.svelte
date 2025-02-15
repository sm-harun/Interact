<script>
	let { size = 'rigid' } = $props();
</script>

<a
	class="inside-shadow group card border-secondary-500-400-token relative flex flex-shrink-0 items-end p-5 transition duration-1000 border-token rounded-container-token {size ==
	'rigid'
		? 'size-60 sm:size-72'
		: size} "
	href="/simulations/thehumanskeleton"
>
	<h3 class="h3 z-10 text-surface-200 transition">The Human Skeleton</h3>
	<div
		class="absolute bottom-0 left-0 z-0 flex size-full items-center justify-center transition duration-1000 group-hover:scale-110"
	>
		<img
			src="/assets/human-skull.png"
			alt="Human Skull"
			class="h-full scale-95 transition duration-1000 group-hover:scale-110"
		/>
	</div>
</a>

<style>
	.inside-shadow {
		transition-duration: 1s;
		box-shadow: inset 0 0 3rem 1rem black;
	}

	.inside-shadow:hover {
		box-shadow: inset 0 0 10rem 1rem black;
	}
</style>
