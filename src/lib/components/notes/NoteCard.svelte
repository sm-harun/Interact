<script lang="ts">
	export let title: string;
	export let text: string;
</script>

<div class="card card-hover size-60 flex flex-col items-center gap-5 p-4">
	<h1 class="h3 text-center flex-shrink-0">{title}</h1>
	<p
		class="flex-grow overflow-hidden w-full relative
    after:absolute after:w-full after:h-2/3 after:left-0 after:bottom-0
    after:bg-gradient-to-t after:from-surface-100 dark:after:from-surface-800 after:to-transparent"
	>
		{text}
	</p>
</div>
