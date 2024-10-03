<script lang="ts">
	let phrase = '';

	let bracketsOpened = 0;

	// This will show the reverse function for some buttons.
	let inversed: boolean = false;

	function sqrtPhrase(char: string) {
		if (char == '(' && bracketsOpened !== 0) {
			char = ')';
			bracketsOpened--;
		}

		let bracketCheck =
			char == 'log(' ||
			char == '(' ||
			char == 'ln(' ||
			char == 'sin(' ||
			char == 'cos(' ||
			char == 'tan(';

		if (bracketCheck) bracketsOpened++;

		phrase = phrase.concat(char);
	}

	function clear() {
		phrase = '';
	}
</script>

<main class="size-full p-5 flex flex-col gap-3 pt-16 2xl:pt-5 overflow-hidden">
	<input
		type="text"
		class="h-[15%] w-full flex-shrink-0 bg-black/40 text-5xl p-5 tracking-wide overflow-auto"
		bind:value={phrase}
	/>

	<div class="flex-grow w-full grid grid-cols-4 grid-rows-8 gap-1 lg:gap-3">
		<button
			class="size-full bg-surface-500/20 text-3xl grid place-items-center rounded-container-token hover:brightness-125"
			on:click={() => sqrtPhrase('√')}
		>
			{#if inversed}
				<span>x<sup>2</sup></span>
			{:else}
				√
			{/if}
		</button>
		<button
			class="size-full bg-surface-500/20 text-3xl grid place-items-center rounded-container-token hover:brightness-125"
			on:click={() => sqrtPhrase('π')}
		>
			π
		</button>
		<button
			class="size-full bg-surface-500/20 text-3xl grid place-items-center rounded-container-token hover:brightness-125"
			on:click={() => sqrtPhrase('^')}
		>
			^
		</button>
		<button
			class="size-full bg-surface-500/20 text-3xl grid place-items-center rounded-container-token hover:brightness-125"
			on:click={() => sqrtPhrase('!')}
		>
			!
		</button>
		<button
			class="size-full bg-surface-500/20 text-3xl grid place-items-center rounded-container-token hover:brightness-125"
			on:click={() => sqrtPhrase('')}
		>
			RAD
		</button>
		<button
			class="size-full bg-surface-500/20 text-3xl grid place-items-center rounded-container-token hover:brightness-125"
			on:click={() => sqrtPhrase('sin(')}
		>
			<span>
				sin
				{#if inversed}
					<sup>-1</sup>
				{/if}
			</span>
		</button>
		<button
			class="size-full bg-surface-500/20 text-3xl grid place-items-center rounded-container-token hover:brightness-125"
			on:click={() => sqrtPhrase('cos(')}
		>
			<span>
				cos
				{#if inversed}
					<sup>-1</sup>
				{/if}
			</span>
		</button>
		<button
			class="size-full bg-surface-500/20 text-3xl grid place-items-center rounded-container-token hover:brightness-125"
			on:click={() => sqrtPhrase('tan(')}
		>
			<span>
				tan
				{#if inversed}
					<sup>-1</sup>
				{/if}
			</span>
		</button>
		<button
			class="size-full {inversed
				? 'bg-surface-500'
				: 'bg-surface-500/20'} text-3xl grid place-items-center rounded-container-token hover:brightness-125"
			on:click={() => (inversed = !inversed)}
		>
			INV
		</button>
		<button
			class="size-full bg-surface-500/20 text-3xl grid place-items-center rounded-container-token hover:brightness-125"
			on:click={() => sqrtPhrase('e')}
		>
			e
		</button>
		<button
			class="size-full bg-surface-500/20 text-3xl grid place-items-center rounded-container-token hover:brightness-125"
			on:click={() => sqrtPhrase('ln(')}
		>
			{#if inversed}
				<span>e<sup>x</sup></span>
			{:else}
				ln
			{/if}
		</button>
		<button
			class="size-full bg-surface-500/20 text-3xl grid place-items-center rounded-container-token hover:brightness-125"
			on:click={() => sqrtPhrase('log(')}
		>
			{#if inversed}
				<span>10<sup>x</sup></span>
			{:else}
				log
			{/if}
		</button>
		<button
			class="size-full bg-tertiary-500/20 text-3xl grid place-items-center rounded-container-token hover:brightness-125"
			on:click={clear}
		>
			AC
		</button>
		<button
			class="size-full bg-secondary-500/20 text-3xl grid place-items-center rounded-container-token hover:brightness-125"
			on:click={() => sqrtPhrase('(')}
		>
			( )
		</button>
		<button
			class="size-full bg-secondary-500/20 text-3xl grid place-items-center rounded-container-token hover:brightness-125"
			on:click={() => sqrtPhrase('%')}
		>
			%
		</button>
		<button
			class="size-full bg-secondary-500/20 text-3xl grid place-items-center rounded-container-token hover:brightness-125"
			on:click={() => sqrtPhrase('÷')}
		>
			÷
		</button>
		<button
			class="size-full bg-primary-500/20 text-3xl grid place-items-center rounded-container-token hover:brightness-125"
			on:click={() => sqrtPhrase('7')}
		>
			7
		</button>
		<button
			class="size-full bg-primary-500/20 text-3xl grid place-items-center rounded-container-token hover:brightness-125"
			on:click={() => sqrtPhrase('8')}
		>
			8
		</button>
		<button
			class="size-full bg-primary-500/20 text-3xl grid place-items-center rounded-container-token hover:brightness-125"
			on:click={() => sqrtPhrase('9')}
		>
			9
		</button>
		<button
			class="size-full bg-secondary-500/20 text-3xl grid place-items-center rounded-container-token hover:brightness-125"
			on:click={() => sqrtPhrase('×')}
		>
			×
		</button>
		<button
			class="size-full bg-primary-500/20 text-3xl grid place-items-center rounded-container-token hover:brightness-125"
			on:click={() => sqrtPhrase('4')}
		>
			4
		</button>
		<button
			class="size-full bg-primary-500/20 text-3xl grid place-items-center rounded-container-token hover:brightness-125"
			on:click={() => sqrtPhrase('5')}
		>
			5
		</button>
		<button
			class="size-full bg-primary-500/20 text-3xl grid place-items-center rounded-container-token hover:brightness-125"
			on:click={() => sqrtPhrase('6')}
		>
			6
		</button>
		<button
			class="size-full bg-secondary-500/20 text-3xl grid place-items-center rounded-container-token hover:brightness-125"
			on:click={() => sqrtPhrase('-')}
		>
			-
		</button>
		<button
			class="size-full bg-primary-500/20 text-3xl grid place-items-center rounded-container-token hover:brightness-125"
			on:click={() => sqrtPhrase('1')}
		>
			1
		</button>
		<button
			class="size-full bg-primary-500/20 text-3xl grid place-items-center rounded-container-token hover:brightness-125"
			on:click={() => sqrtPhrase('2')}
		>
			2
		</button>
		<button
			class="size-full bg-primary-500/20 text-3xl grid place-items-center rounded-container-token hover:brightness-125"
			on:click={() => sqrtPhrase('3')}
		>
			3
		</button>
		<button
			class="size-full bg-secondary-500/20 text-3xl grid place-items-center rounded-container-token hover:brightness-125"
			on:click={() => sqrtPhrase('+')}
		>
			+
		</button>
		<button
			class="size-full bg-primary-500/20 text-3xl grid place-items-center rounded-container-token hover:brightness-125"
			on:click={() => sqrtPhrase('0')}
		>
			0
		</button>
		<button
			class="size-full bg-primary-500/20 text-3xl grid place-items-center rounded-container-token hover:brightness-125"
			on:click={() => sqrtPhrase('.')}
		>
			.
		</button>
		<button
			class="size-full bg-primary-500/20 text-3xl grid place-items-center rounded-container-token hover:brightness-125"
			on:click={() => sqrtPhrase('T')}
		>
			DT
		</button>
		<button
			class="size-full bg-secondary-500 text-3xl grid place-items-center rounded-container-token hover:brightness-125 active:scale-95 transition"
			on:click={() => sqrtPhrase('=')}
		>
			=
		</button>
	</div>
</main>
