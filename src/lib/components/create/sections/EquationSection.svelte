<script lang="ts">
	import type { BasicSection } from '$lib/stores/courses';

	export let section: BasicSection;
</script>

<div class="w-full">
	{section.title}
</div>
