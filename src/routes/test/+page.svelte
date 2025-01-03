<script lang="ts">
	import VisualsLibrary from '$lib/components/visuals/VisualsLibrary.svelte';
	import type { VisualSection } from '$lib/stores/courses';

	let section: VisualSection = {
		type: 'Visual',
		title: 'calculate-vector-question',
		index: 2,
		skip: false,
		course: 'Vectors'
	};
	let section2: VisualSection = {
		type: 'Visual',
		title: ' plot-vector-question ',
		index: 2,
		skip: false,
		course: 'Vectors'
	};
	function test() {
		console.log('Showing next section');
	}
</script>

<div class="sketchfab-embed-wrapper h-screen w-screen p-10">
	<iframe
		title="Human Skeleton"
		class="size-full"
		frameborder="0"
		allowfullscreen
		mozallowfullscreen="true"
		webkitallowfullscreen="true"
		allow="autoplay; fullscreen; xr-spatial-tracking"
		xr-spatial-tracking
		execution-while-out-of-viewport
		execution-while-not-rendered
		web-share
		src="https://sketchfab.com/models/acf6b25134d945f8b0bc8ae5e04861df/embed"
	>
	</iframe>
</div>
