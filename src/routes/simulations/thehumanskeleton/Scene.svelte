<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls, Grid } from '@threlte/extras';
	import HumanSkeletonModel from './HumanSkeletonModel.svelte';
	import { theme } from '$lib/stores/themes';
	import { getCurrentThemeColor } from '$lib/utils';
	import { modeUserPrefers } from '@skeletonlabs/skeleton';
	// import HumanSkeletonModel2 from './HumanSkeletonModel2.svelte';
	import { onMount } from 'svelte';
	import { AmbientLight } from 'three';

	let lightColor = $state('rgb(0, 0, 0)');

	interface Props {
		loaded: boolean;
		settings: HumanSkeleonSettings;
	}

	let { loaded = $bindable(), settings = $bindable() }: Props = $props();

	let startLoading = $state(false);

	let intervalValue: Timeout;

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

<T.PerspectiveCamera makeDefault position={settings.cameraPosition}>
	<OrbitControls
		oncreate={(ref) => {
			intervalValue = setInterval(() => {
				ref.update();
			}, 100);
		}}
		onend={() => {
			clearInterval(intervalValue);
		}}
		target={settings.watchTarget}
		maxDistance={10}
		minDistance={0.3}
	/>
</T.PerspectiveCamera>

<!-- <Grid /> -->

<T.AmbientLight
	position={[0, 0, 0]}
	color={settings.ambientLightColor}
	intensity={settings.ambientLightIntensity}
/>

<T.DirectionalLight
	position={settings.directionLightPosition}
	color={settings.lightColorSettings ? [lightColor] : [settings.directionLightColor]}
	intensity={settings.directionLightIntensity}
/>

<HumanSkeletonModel position={[0, -1, 0]} />
<!-- {#if startLoading} -->
<!-- 	<HumanSkeletonModel2 bind:loaded /> -->
<!-- {/if} -->
