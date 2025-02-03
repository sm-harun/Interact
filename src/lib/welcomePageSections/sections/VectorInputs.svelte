<script>
	let { text, value = $bindable(), colorClass } = $props();
</script>

<div class="flex w-24 gap-2 sm:w-48 {colorClass} opacity-50">
	<span>{text}</span>
	<input
		class="flex-shrink-0 bg-primary-500 accent-primary-500"
		type="range"
		min="0"
		max="10"
		step={0.1}
		bind:value
	/>
	<p>{value}</p>
</div>
