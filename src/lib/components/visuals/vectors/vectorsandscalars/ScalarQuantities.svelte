<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	export let section;
	export let showNextSection;

	let showButton = true;
	function hideButton() {
		showButton = false;
	}

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	function lauchFirstBall() {
		ball1.vyi = -1 / ball1Resistance;
	}

	function launchSecondBall() {
		ball2.vyi = -1 / ball2Resistance;
	}

	let adjustBall1 = (radius: number) => {};
	let adjustBall2 = (radius: number) => {};

	let ball1Radius = 50;
	let ball1Resistance = 0.1;

	$: adjustBall1(ball1Radius);
	$: adjustBall2(ball2Radius);

	let ball1 = {
		xi: 0,
		yi: 0,
		x: 0,
		y: 0,
		vxi: 5,
		vyi: -1 / ball1Resistance,
		ax: 0,
		ay: 0,
		mass: 10,
		time: 0,
		friction: 0.65
	};

	let ball2Radius = 50;
	let ball2Resistance = 0.1;

	let ball2 = {
		xi: 0,
		yi: 0,
		x: 0,
		y: 0,
		vxi: 5,
		vyi: -1 / ball2Resistance,
		ax: 0,
		ay: 0,
		mass: 10,
		time: 0,
		friction: 0.65
	};

	let timeDelay = 0.1;

	function kenematicEquation(acc: number, ct: number, vi: number, yi: number) {
		return (acc * ct * ct) / 2 + vi * ct + yi;
	}

	function addGravity() {
		return 0.5;
	}
	onMount(() => {
		canvas = document.querySelector<HTMLCanvasElement>('#main-canvas')!;
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

		ball1.xi = canvas.width / 4;
		ball1.yi = canvas.height - ball1Radius;

		ball2.xi = (canvas.width * 3) / 4;
		ball2.yi = canvas.height - ball2Radius;

		adjustBall1 = (radius: number) => {
			ball1.xi = canvas.width / 4;
			ball1.yi = canvas.height - ball1Radius;
		};

		adjustBall2 = (radius: number) => {
			ball2.xi = (canvas.width * 3) / 4;
			ball2.yi = canvas.height - ball2Radius;
		};

		requestAnimationFrame(loop);
	});

	function getBallOneRadius() {
		return ball1Radius;
	}

	function getBallTwoRadius() {
		return ball2Radius;
	}

	function loop(t: number) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		if (ball1.time == 0) ball1.time = t;

		ball1.x = kenematicEquation(ball1.ax, (t - ball1.time) * timeDelay, ball1.vxi, ball1.xi);
		ball1.y = kenematicEquation(ball1.ay, (t - ball1.time) * timeDelay, ball1.vyi, ball1.yi);

		ball1.ay = addGravity();

		if (ball1.y + getBallOneRadius() > canvas.height) {
			ball1.vyi *= ball1.friction;
			ball1.time = 0;

			// Automatically stops the ball if it is to low to have visual effects
			if (Math.abs(ball1.vyi) < 1) ball1.vyi = 0;
		}

		drawCircle(ctx, ball1.xi, ball1.y, getBallOneRadius());

		if (ball2.time == 0) ball2.time = t;

		ball2.x = kenematicEquation(ball2.ax, (t - ball2.time) * timeDelay, ball2.vxi, ball2.xi);
		ball2.y = kenematicEquation(ball2.ay, (t - ball2.time) * timeDelay, ball2.vyi, ball2.yi);

		ball2.ay = addGravity();

		if (ball2.y + getBallTwoRadius() > canvas.height) {
			ball2.time = 0;
			ball2.vyi *= ball2.friction;

			// Automatically stops the ball if it is to low to have visual effects
			if (Math.abs(ball2.vyi) < 1) ball2.vyi = 0;
		}

		drawCircle(ctx, ball2.xi, ball2.y, getBallTwoRadius());

		requestAnimationFrame(loop);
	}

	function drawCircle(ctx: CanvasRenderingContext2D, xCord: number, yCord: number, r: number) {
		ctx.beginPath();
		ctx.fillStyle = '#a13856';
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 3;
		ctx.arc(xCord, yCord, r, 0, Math.PI * 2, false);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	}
</script>

<div class="w-full h-[60rem] lg:h-[40rem] flex flex-col lg:flex-row" id="canvas-parent">
	<div class="lg:flex-[2_1_0] h-[40rem] border-2 border-primary-500">
		<canvas id="main-canvas"></canvas>
	</div>

	<section class="flex-1 h-full p-10 bg-surface-700 flex lg:flex-col flex-wrap gap-4 lg:gap-0">
		<div class="w-full flex-1">
			<h3 class="h3 ml-3 mb-3">Ball 1</h3>
			<div class="w-48">
				<span>Area: </span>
				<input type="range" bind:value={ball1Radius} min="0" max="100" step={1} />
			</div>
			<div class="w-48">
				<span>Mass: </span>
				<input type="range" bind:value={ball1Resistance} min="0.001" max="0.2" step={0.001} />
			</div>
			<button class="btn variant-filled-primary mt-5" on:click={lauchFirstBall}>Launch</button>
		</div>

		<div class="w-full flex-1">
			<h3 class="h3 ml-3 mb-3">Ball 2</h3>
			<div class="w-48">
				<span>Area: </span>
				<input type="range" bind:value={ball2Radius} min="0" max="100" step={1} />
			</div>
			<div class="w-48">
				<span>Mass: </span>
				<input type="range" bind:value={ball2Resistance} min="0.001" max="0.2" step={0.001} />
			</div>
			<button class="btn variant-filled-primary mt-5" on:click={launchSecondBall}>Launch</button>
		</div>

		<blockquote class="blockquote mt-4 lg:mt-0">
			The force applied to both balls is the same.
		</blockquote>
	</section>
</div>
{#if showButton}
	<div class="w-full pb-2 flex justify-end items-center mt-5">
		<button
			class="btn variant-filled-primary mr-6 animate-bounce scale-110 shadow-lg shadow-primary-500"
			in:fly={{ y: 200, duration: 1000, easing: cubicInOut }}
			out:slide
			on:click={() => {
				showNextSection();
				hideButton();
			}}>Continue</button
		>
	</div>
{/if}
