<script lang="ts">
	import { type VisualSection } from '$lib/stores/courses';
	import ImageHolder from '../ImageHolder.svelte';

	interface Props {
		section: VisualSection;
		showNextSection: () => void;
		showNextButton: boolean;
	}

	let { section, showNextSection, showNextButton }: Props = $props();
</script>

{#if section.title == 'activation-energy-graph'}
	<ImageHolder
		{section}
		{showNextSection}
		{showNextButton}
		src={'/courses/enzymes/lowering-activation-energy-by-enzymes.webp'}
	/>
{:else}
	{showNextSection()}
	<p class="opacity-100">
		The Enzymes library didn't find the <strong class="mx-2">{section.title}</strong> visual
	</p>
{/if}
