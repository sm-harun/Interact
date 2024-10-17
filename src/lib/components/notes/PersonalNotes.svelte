<script lang="ts">
	export let title: string;
	export let notes: number;
	export let todo: () => void;
</script>

<button class="card card-hover size-full p-5 py-5 flex flex-col justify-center" on:click={todo}>
	<h2 class="h3">{title}</h2>
	<p>{notes} notes</p>
</button>
