<script lang="ts">
	import { type VisualSection } from '$lib/stores/courses';

	export let section: VisualSection;
	export let showNextSection: () => void;
	export let showNextButton: boolean;
</script>

{#if section.title == 'activation-energy-graph'}
	<div class="w-full xl:h-96 grid place-items-center {showNextSection()}">
		<div class="h-full aspect-video">
			<img
				src="/courses/enzymes/lowering-activation-energy-by-enzymes.webp"
				alt="Activation Energy Graph"
				class="size-full object-cover rounded-container-token"
			/>
		</div>
	</div>
{:else}
	<p class="opacity-100 {showNextSection()}">
		The Enzymes library didn't find the <strong class="mx-2">{section.title}</strong> visual
	</p>
{/if}
