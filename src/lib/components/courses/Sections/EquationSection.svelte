<script lang="ts">
	import type { BasicSection } from '$lib/stores/courses';
	import { onMount } from 'svelte';

	export let section: BasicSection;
	export let showNextSection: () => void;
	export let showNextButton: boolean;

	showNextSection();

	onMount(() => {
		if (section.skip) showNextSection();
	});
</script>

<div class="w-full">{section.title}</div>
