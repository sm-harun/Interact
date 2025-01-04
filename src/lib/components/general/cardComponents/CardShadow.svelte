<script lang="ts">
	interface Props {
		cardColor: string;
		heightPercent: number;
		position: 'top' | 'bottom';
	}

	let { heightPercent, position = 'bottom' }: Props = $props();
</script>

<div
	class="absolute {position == 'bottom' ? 'bottom-0 bg-gradient-to-t' : ''} {position == 'top'
		? 'top-0 bg-gradient-to-b'
		: ''} right-0 w-full rounded-b-3xl from-surface-100 to-transparent dark:from-surface-800"
	style={`height: ${heightPercent}%;`}
></div>
