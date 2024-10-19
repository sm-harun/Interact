<script lang="ts">
	import { evaluate } from 'mathjs';

	let phrase = '';
	let filteredPhrase = '';
	let result = '';

	$: {
		try {
			if (filteredPhrase != '') result = evaluate(filteredPhrase);
		} catch (error) {
			result = '';
		}
	}

	let bracketsOpened = 0;

	// This will show the reverse function for some buttons.
	let inversed: boolean = false;

	function sqrtPhrase(char: string) {
		let finalChar = char;

		switch (char) {
			case '×':
				filteredPhrase = filteredPhrase.concat('*');
				break;
			case '÷':
				filteredPhrase = filteredPhrase.concat('/');
				break;
			case '(':
				if (bracketsOpened == 0) {
					bracketsOpened++;
					filteredPhrase = filteredPhrase.concat('(');
				} else {
					bracketsOpened--;
					filteredPhrase = filteredPhrase.concat(')');
					finalChar = ')';
				}
				break;
			case 'sin(':
				bracketsOpened++;
				filteredPhrase = filteredPhrase.concat('sin(');
				break;
			case 'cos(':
				bracketsOpened++;
				filteredPhrase = filteredPhrase.concat('cos(');
				break;
			case 'tan(':
				bracketsOpened++;
				filteredPhrase = filteredPhrase.concat('tan(');
				break;
			case 'log(':
				bracketsOpened++;
				filteredPhrase = filteredPhrase.concat('log10(');
				break;
			case 'ln(':
				bracketsOpened++;
				filteredPhrase = filteredPhrase.concat('log(');
				break;
			case 'π':
				filteredPhrase = filteredPhrase.concat('pi');
				break;
			case '√':
				bracketsOpened++;
				filteredPhrase = filteredPhrase.concat('sqrt(');
				finalChar = '√(';
				break;
			default:
				filteredPhrase = filteredPhrase.concat(char);
		}

		phrase = phrase.concat(finalChar);
	}

	function equalTo() {
		phrase = evaluate(filteredPhrase).toString();
		filteredPhrase = phrase;
	}

	function clear() {
		phrase = '';
		filteredPhrase = '';
	}
</script>

<main class="size-full p-5 flex flex-col gap-3 pt-16 2xl:pt-5 overflow-hidden">
	<div
		class="h-[15%] w-full flex-shrink-0 bg-black/40 p-5 tracking-wide overflow-hidden flex flex-col justify-between items-end"
	>
		<p class="text-5xl overflow-hidden">{phrase}</p>
		<p class="text-">{result}</p>
	</div>

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
			on:click={equalTo}
		>
			=
		</button>
	</div>
</main>
