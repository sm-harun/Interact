<script lang="ts">
	export let title: string;
	export let notes: number;
	export let todo: () => void;
</script>

<button
	class="w-96 h-24 rounded-container-token variant-glass-secondary flex justify-around items-center
                border-[0.1rem] border-transparent hover:scale-[1.02] hover:brightness-110 transition"
	on:click={todo}
>
	<h3 class="h2">{title}</h3>
	<p>{notes} notes</p>
</button>
