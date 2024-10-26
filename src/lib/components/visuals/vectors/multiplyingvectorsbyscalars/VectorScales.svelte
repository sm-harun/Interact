<script lang="ts">
	import { type VisualSection } from '$lib/stores/courses';

	interface Props {
		section: VisualSection;
	}

	let { section }: Props = $props();
</script>
