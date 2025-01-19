<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls, Grid } from '@threlte/extras';
	import HumanSkeletonModel from './HumanSkeletonModel.svelte';
	import { theme } from '$lib/stores/themes';
	import { getCurrentThemeColor } from '$lib/utils';
	import { modeUserPrefers } from '@skeletonlabs/skeleton';
	import HumanSkeletonModel2 from './HumanSkeletonModel2.svelte';
	import { onMount } from 'svelte';

	let lightColor = $state('rgb(0, 0, 0)');

	let { loaded = $bindable() } = $props();

	let startLoading = $state(false);

	onMount(() => {
		setTimeout(() => {
			startLoading = true;
		}, 1000);
	});

	$effect(() => {
		$theme;

		lightColor = getCurrentThemeColor('primary', '500');
	});
</script>

<T.PerspectiveCamera makeDefault position={[0, 0, 2.5]}>
	<OrbitControls target={[0, 0, 0]} maxDistance={10} minDistance={0.3} />
</T.PerspectiveCamera>

<!-- <Grid /> -->

<T.AmbientLight position={[0, 10, 10]} intensity={$modeUserPrefers ? 1 : 0.2} />

<T.DirectionalLight
	position={[3, -10, 0]}
	color={[lightColor]}
	intensity={$modeUserPrefers ? 2 : 1}
/>

<!-- <HumanSkeletonModel position={[0, -1, 0]} /> -->
{#if startLoading}
	<HumanSkeletonModel2 bind:loaded />
{/if}
