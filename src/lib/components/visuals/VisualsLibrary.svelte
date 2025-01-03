<script lang="ts">
	import { type VisualSection } from '$lib/stores/courses';
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	import VectorsLibrary from '$lib/components/visuals/vectors/VectorsLibrary.svelte';
	import EnzymesLibrary from '$lib/components/visuals/enzymes/EnzymesLibrary.svelte';

	interface Props {
		section: VisualSection;
		showNextSection?: any;
		showNextButton: boolean;
	}

	let { section, showNextSection = () => console.log('hello'), showNextButton }: Props = $props();

	let show = true;
</script>

{#if show}
	<div class="h-auto w-auto" in:fly={{ y: 200, duration: 1000, easing: cubicInOut }}>
		{#if section.course == 'Vectors'}
			<VectorsLibrary {section} {showNextSection} {showNextButton} />
		{:else if section.course == 'Enzymes'}
			<EnzymesLibrary {section} {showNextSection} {showNextButton} />
		{:else}
			<p class="mb-10 mt-10 flex w-full items-center justify-center text-xl {showNextSection()}">
				The <strong class="mx-2">{section.course}</strong> course doesn't have a visuals library
			</p>
		{/if}
	</div>
{/if}
