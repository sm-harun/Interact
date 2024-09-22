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
	<p>The Vectors library didn't find the <strong class="mx-2">{section.title}</strong> visual</p>
{/if}
