<script lang="ts">
	import VectorScales from './multiplyingvectorsbyscalars/VectorScales.svelte';
	import ScalarQuantities from './vectorsandscalars/ScalarQuantities.svelte';
	import VectorQuantities from './vectorsandscalars/VectorQuantities.svelte';

	import PlotVectorQuestion from './representationofvectors/PlotVectorQuestion.svelte';
	import CalculateVectorQuestion from './representationofvectors/CalculateVectorQuestion.svelte';

	import TriangleLawOfAddition from './additionofvectors/TriangulerLawOfAddition.svelte';
	import AddingTwoVectors from './additionofvectors/AddingTwoVectors.svelte';
	import AddWithOnlyOneAxis from './additionofvectors/AddWithOnlyOneAxis.svelte';
	import CommutativeProperty from './additionofvectors/CommutativeProperty.svelte';
	import AssociativeProperty from './additionofvectors/AssociativeProperty.svelte';

	import type { VisualSection } from '$lib/stores/courses';

	export let section: VisualSection;
	export let showNextSection: () => void;
	export let showNextButton: boolean;
</script>

{#if section.title == 'vector-scales'}
	<VectorScales {section} />

	<!-- Vectors and Scalars -->
{:else if section.title == 'scalar-quantities'}
	<ScalarQuantities {section} {showNextSection} />
{:else if section.title == 'vector-quantities'}
	<VectorQuantities {section} {showNextSection} />

	<!-- Representation of Vectors -->
{:else if section.title == 'plot-vector-question'}
	<PlotVectorQuestion {section} {showNextSection} />
{:else if section.title == 'calculate-vector-question'}
	<CalculateVectorQuestion {section} {showNextSection} />

	<!-- Addition of Vectors -->
{:else if section.title == 'triangular-law-of-addition-figure'}
	<TriangleLawOfAddition {section} {showNextSection} />
{:else if section.title == 'adding-two-vectors-question'}
	<AddingTwoVectors {section} {showNextSection} />
{:else if section.title == 'commutative-property-of-vector-addition-figure'}
	<CommutativeProperty {section} {showNextSection} />
{:else if section.title == 'associative-property-of-vector-addition-figure'}
	<AssociativeProperty {section} {showNextSection} />
{:else if section.title == 'add-with-only-one-axis'}
	<AddWithOnlyOneAxis {section} {showNextSection} />
{:else}
	<p>
		The Vectors library didn't find the <strong class="mx-2 {showNextSection()}"
			>{section.title}</strong
		> visual
	</p>
{/if}
