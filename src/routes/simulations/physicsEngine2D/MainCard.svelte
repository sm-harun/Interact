<script>
	let { size = 'rigid' } = $props();
</script>

<a
	class="inside-shadow group card border-secondary-500-400-token relative flex
        flex-shrink-0 items-end bg-gradient-to-t from-primary-500 to-transparent
        p-5 transition duration-1000 border-token rounded-container-token {size == 'rigid'
		? 'size-60 sm:size-72'
		: size}"
	href="/simulations/physicsEngine2D"
	><h3 class="text-secondary-800-100-token h3 z-10 font-extrabold transition">Physics Engine 2D</h3>
	<div class="absolute right-0 top-0 size-full">
		<img
			src="/assets/ball-animation.gif"
			class="size-full rotate-45 scale-125"
			alt="A bouncing ball"
		/>
	</div>
</a>
