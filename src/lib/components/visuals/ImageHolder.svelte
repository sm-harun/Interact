<script lang="ts">
	import { fly, slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	interface Props {
		src: string;
		section: any;
		showNextButton: boolean;
		showNextSection: () => void;
	}

	let {
		src,
		section,
		showNextButton,
		showNextSection
	}: Props = $props();

	let showButton = $state(showNextButton);

	function hideButton() {
		showButton = false;
	}
</script>

<div class="w-full xl:h-96 grid place-items-center">
	<div class="h-full aspect-video">
		<img
			{src}
			alt="Activation Energy Graph"
			class="size-full object-cover rounded-container-token"
		/>
	</div>
</div>
{#if showButton && !section.skip}
	<div class="w-full pb-2 flex justify-end items-center">
		<button
			class="btn variant-filled-primary mr-6 animate-bounce scale-110 shadow-lg shadow-primary-500"
			in:fly={{ y: 200, duration: 1000, easing: cubicInOut }}
			out:slide
			onclick={() => {
				showNextSection();
				hideButton();
			}}>Continue</button
		>
	</div>
{/if}
