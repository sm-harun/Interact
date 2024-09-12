<script lang="ts">
	import VectorScales from './VectorScales.svelte';
	import ScalarQuantities from './ScalarQuantities.svelte';
	import VectorQuantities from './VectorQuantities.svelte';
	import type { VisualSection } from '$lib/stores/courses';

	export let section: VisualSection;
	export let showNextSection: () => void;
</script>

{#if section.title == 'vector-scales'}
	<VectorScales {section} />
{:else if section.title == 'scalar-quantities'}
	<ScalarQuantities {section} {showNextSection} />
{:else if section.title == 'vector-quantities'}
	<VectorQuantities {section} {showNextSection} />
{/if}
