<script lang="ts">
	import { type VisualSection } from '$lib/stores/courses';

	import VectorsCourseLibrary from '$lib/components/visuals/vectors/VectorsCourseLibrary.svelte';

	export let section: VisualSection;
	export let showNextSection: () => void;
	export let showNextButton: boolean;

	showNextSection();
</script>

{#if section.course == 'Vectors'}
	<VectorsCourseLibrary {section} />
{/if}
