<script lang="ts">
	import VectorScales from './VectorScales.svelte';
	import ScalarQuantities from './ScalarQuantities.svelte';
	import VectorQuantities from './VectorQuantities.svelte';

	export let section;
</script>

{#if section.title == 'vector-scales'}
	<VectorScales {section} />
{:else if section.title == 'scalar-quantities'}
	<ScalarQuantities {section} />
{:else if section.title == 'vector-quantities'}
	<VectorQuantities {section} />
{/if}
