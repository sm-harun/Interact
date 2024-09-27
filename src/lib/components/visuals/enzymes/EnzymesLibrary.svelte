<script lang="ts">
	import { type VisualSection } from '$lib/stores/courses';
	import ImageHolder from '../ImageHolder.svelte';

	export let section: VisualSection;
	export let showNextSection: () => void;
	export let showNextButton: boolean;
</script>

{#if section.title == 'activation-energy-graph'}
	<ImageHolder
		{section}
		{showNextSection}
		{showNextButton}
		src={'/courses/enzymes/lowering-activation-energy-by-enzymes.webp'}
	/>
{:else}
	<p class="opacity-100 {showNextSection()}">
		The Enzymes library didn't find the <strong class="mx-2">{section.title}</strong> visual
	</p>
{/if}
