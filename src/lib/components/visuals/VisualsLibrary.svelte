<script lang="ts">
	import { type VisualSection } from '$lib/stores/courses';

	import VectorsCourseLibrary from '$lib/components/visuals/vectors/VectorsCourseLibrary.svelte';

	export let section: VisualSection;
</script>

{#if section.course == 'Kenetics'}
	<VectorsCourseLibrary {section} />
{/if}
