<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	import { drawCircle, rotatePoint, drawLine, Ball } from '../functions';

	let { section, showNextSection } = $props();

	let showButton = $state(true);
	function hideButton() {
		showButton = false;
	}

	// This will hold all the balls
	let balls: any = [];

	let launch = $state(() => {});

	let clear = () => (balls = []);

	let magnitude: number = $state(10);
	let direction: number = $state(30);

	let canvas: HTMLCanvasElement = $state();
	let ctx: CanvasRenderingContext2D;

	onMount(() => {
		ctx = canvas.getContext('2d')!;
		let parent = canvas.parentElement;

		if (parent) {
			canvas.width = parent.clientWidth;
			canvas.height = parent.clientHeight;

			window.addEventListener('resize', () => {
				canvas.width = parent.clientWidth;
				canvas.height = parent.clientHeight;
			});
		}

		launch = () => {
			let newBall = new Ball(canvas, ctx, magnitude, direction, drawCircle);
			balls.push(newBall);
		};

		function loop(canvas: HTMLCanvasElement) {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			let rotatedPoint = rotatePoint(
				canvas.width / 2,
				canvas.height / 3,
				direction,
				canvas.width / 2,
				canvas.height / 2
			);

			drawCircle(ctx, canvas.width / 2, canvas.height / 2, 50, true);
			drawCircle(ctx, rotatedPoint.x, rotatedPoint.y, 1, false);

			drawLine(ctx, canvas.width / 2, canvas.height / 2, rotatedPoint.x, rotatedPoint.y);

			balls.forEach((ball: any) => ball.update());

			requestAnimationFrame(() => loop(canvas));
		}

		requestAnimationFrame(() => loop(canvas));
	});
</script>

<section class="flex w-full flex-col">
	<div class="h-[40rem] border-2 border-primary-500">
		<canvas bind:this={canvas}></canvas>
	</div>
	<section class="bg-surface-300-600-token flex h-full flex-col p-10">
		<div>
			<h3 class="h3">Magnitude</h3>
			<div class="w-60 flex-col">
				<span class="flex w-full justify-end">{magnitude}</span>
				<input type="range" bind:value={magnitude} min="0" max="100" step={1} />
			</div>
			<h3 class="h3 mt-5">Direction (in degrees)</h3>
			<div class="w-60 flex-col">
				<span class="flex w-full justify-end">{direction}</span>
				<input type="range" bind:value={direction} min="0" max="360" step={1} />
			</div>
		</div>
		<div class="flex w-full items-center justify-between gap-10 py-5">
			<button class="variant-filled-primary btn text-xl" onclick={launch}>Launch</button>
			<button class="variant-filled-primary btn text-xl" onclick={clear}>Clear</button>
		</div>
		<blockquote class="blockquote mt-5">
			The magnitude and direction combined give the ball the power and direction, in this case they
			give the ball <strong>Velocity</strong>
		</blockquote>
	</section>
</section>
{#if showButton}
	<div class="mt-5 flex w-full items-center justify-end pb-2">
		<button
			class="variant-filled-primary btn mr-6 scale-110 animate-bounce shadow-lg shadow-primary-500"
			in:fly={{ y: 200, duration: 1000, easing: cubicInOut }}
			out:slide
			onclick={() => {
				showNextSection();
				hideButton();
			}}>Continue</button
		>
	</div>
{/if}
