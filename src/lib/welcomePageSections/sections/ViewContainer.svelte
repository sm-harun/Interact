<script>
	let { children } = $props();
</script>

<div class="flex h-screen w-full items-center justify-center">
	<div
		class="bg-surface-300-600-token relative box-border aspect-square w-[80%] p-2 rounded-container-token sm:w-[60%] lg:w-[50%] lg:p-5 xl:w-[80%] 2xl:w-[60%]"
	>
		{@render children()}
	</div>
</div>
