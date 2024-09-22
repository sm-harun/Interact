<script lang="ts">
	import { type VisualSection } from '$lib/stores/courses';
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	import VectorsLibrary from '$lib/components/visuals/vectors/VectorsLibrary.svelte';
	import EnzymesLibrary from '$lib/components/visuals/enzymes/EnzymesLibrary.svelte';

	export let section: VisualSection;
	export let showNextSection = () => console.log('hello');
	export let showNextButton: boolean;

	let show = true;
</script>

{#if show}
	<div class="w-auto h-auto" in:fly={{ y: 200, duration: 1000, easing: cubicInOut }}>
		{#if section.course == 'Vectors'}
			<VectorsLibrary {section} {showNextSection} {showNextButton} />
		{:else if section.course == 'Enzymes'}
			<EnzymesLibrary {section} {showNextSection} {showNextButton} />
		{:else}
			<p class="text-xl w-full flex justify-center items-center mt-10 mb-10 {showNextSection()}">
				The <strong class="mx-2">{section.course}</strong> course doesn't have a visuals library
			</p>
		{/if}
	</div>
{/if}
