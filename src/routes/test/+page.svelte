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

<div class="w-1/2 h-full bg-surface-500 p-6 flex flex-col">
	<!-- <VisualsLibrary {section2} showNextSection={test} showNextButton={true} /> -->
	<VisualsLibrary {section} showNextSection={test} showNextButton={true} />
</div>
