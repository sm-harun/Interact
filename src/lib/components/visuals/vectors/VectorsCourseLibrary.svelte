<script lang="ts">
	import VectorScales from './multiplyingvectorsbyscalars/VectorScales.svelte';
	import ScalarQuantities from './vectorsandscalars/ScalarQuantities.svelte';
	import VectorQuantities from './vectorsandscalars/VectorQuantities.svelte';

	import PlotVectorQuestion from './representationofvectors/PlotVectorQuestion.svelte';
	import CalculateVectorQuestion from './representationofvectors/CalculateVectorQuestion.svelte';

	import type { VisualSection } from '$lib/stores/courses';

	export let section: VisualSection;
	export let showNextSection: () => void;
	export let showNextButton: boolean;
</script>

{#if section.title == 'vector-scales'}
	<VectorScales {section} />
{:else if section.title == 'scalar-quantities'}
	<ScalarQuantities {section} {showNextSection} />
{:else if section.title == 'vector-quantities'}
	<VectorQuantities {section} {showNextSection} />
{:else if section.title == 'plot-vector-question'}
	<PlotVectorQuestion {section} {showNextSection} />
{:else if section.title == 'calculate-vector-question'}
	<CalculateVectorQuestion {section} {showNextSection} />
{:else}
	<p class="text-xl w-full flex justify-center items-center mt-10 mb-10 {showNextSection()}">
		The visual for <strong class="mx-3">{section.title}</strong> has not been found in the vectors visuals.
	</p>
{/if}
