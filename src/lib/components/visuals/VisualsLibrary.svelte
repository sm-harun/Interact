<script lang="ts">
	import { type VisualSection } from '$lib/stores/courses';
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	import VectorsCourseLibrary from '$lib/components/visuals/vectors/VectorsCourseLibrary.svelte';

	export let section: VisualSection;
	export let showNextSection = () => console.log('hello');
	export let showNextButton: boolean;

	let show = true;
</script>

{#if show}
	<div class="w-auto h-auto" in:fly={{ y: 200, duration: 1000, easing: cubicInOut }}>
		{#if section.course == 'Vectors'}
			<VectorsCourseLibrary {section} {showNextSection} />
		{/if}
	</div>
{/if}
