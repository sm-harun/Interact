<script>
	let { children, animateBorder = false } = $props();
</script>

<div class="sticky top-0 flex h-screen w-full items-center justify-center">
	<div
		class="{animateBorder
			? 'animate-border'
			: ''} relative z-20 box-border aspect-square w-[80%] rounded-container-token sm:w-[60%] lg:w-[50%] xl:w-[80%] 2xl:w-[60%]"
	>
		<div class="bg-surface-300-600-token size-full p-2 rounded-container-token lg:p-5">
			{@render children()}
		</div>
	</div>
</div>

<style>
	@property --angle {
		syntax: '<angle>';
		initial-value: 0deg;
		inherits: false;
	}

	.animate-border::after,
	.animate-border::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: red;
		z-index: -1;
		border-radius: var(--theme-rounded-container);
		background-image: conic-gradient(
			from var(--angle),
			rgb(var(--color-primary-500)),
			rgb(var(--color-secondary-500)),
			rgb(var(--color-tertiary-500)),
			rgb(var(--color-primary-500))
		);
		transform: scale(1.01);
		animation: animateBorder 4s ease-in-out infinite;
	}

	.animate-border::after {
		filter: blur(2rem);
	}

	@keyframes animateBorder {
		from {
			--angle: 0deg;
		}

		to {
			--angle: 360deg;
		}
	}
</style>
