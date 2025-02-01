<script lang="ts">
	import WaveAnimation from './animations/WaveAnimation.svelte';
</script>

<div
	class="bg-surface-200-700-token relative grid w-full grid-cols-1 grid-rows-2 overflow-y-visible xl:grid-cols-2 xl:grid-rows-1"
>
	<WaveAnimation position="bottom" />

	<div class="absolute top-0 grid h-full w-full items-start justify-center xl:static">
		<div
			class="sticky top-20 my-14 flex flex-col items-center xl:sticky xl:top-1/2 xl:my-80 xl:items-start"
		>
			<h1 class="h1">Start learning</h1>
			<p class="text-surface-500-400-token w-[90%] text-center xl:text-start">
				Take courses with a lot of interactive examples to boost your creativity
			</p>
		</div>
	</div>
	<div class="h-[200vh]"></div>

	<WaveAnimation position="top" />
</div>
