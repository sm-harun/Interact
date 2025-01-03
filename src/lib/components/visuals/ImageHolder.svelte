<script lang="ts">
	import { fly, slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	interface Props {
		src: string;
		section: any;
		showNextButton: boolean;
		showNextSection: () => void;
	}

	let { src, section, showNextButton, showNextSection }: Props = $props();

	let showButton = $state(showNextButton);

	function hideButton() {
		showButton = false;
	}
</script>

<div class="grid w-full place-items-center xl:h-96">
	<div class="aspect-video h-full">
		<img
			{src}
			alt="Activation Energy Graph"
			class="size-full object-cover rounded-container-token"
		/>
	</div>
</div>
{#if showButton && !section.skip}
	<div class="flex w-full items-center justify-end pb-2">
		<button
			class="variant-filled-primary btn mr-6 scale-110 animate-bounce shadow-lg shadow-primary-500"
			in:fly={{ y: 200, duration: 1000, easing: cubicInOut }}
			out:slide
			onclick={() => {
				showNextSection();
				hideButton();
			}}>Continue</button
		>
	</div>
{/if}
