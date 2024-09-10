<script lang="ts">
	import VectorScales from './VectorScales.svelte';

	export let section;
</script>

{#if section.title == 'vector-scales'}
	<VectorScales {section} />
{/if}
