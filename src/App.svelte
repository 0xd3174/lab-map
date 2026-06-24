<script lang="ts">
	import Header from './components/Header.svelte';
	import LabMap from './components/LabMap.svelte';
	import ZonePopup from './components/ZonePopup.svelte';
	import colors from './lib/colors';
	import { mapState } from './lib/state.svelte';

	let mapComponent: ReturnType<typeof LabMap> | null = $state(null);
	let currentZoom = $state(Number(localStorage.getItem('zoom')) || 1);

	$effect(() => {
		localStorage.setItem('zoom', currentZoom.toString());
	});
</script>

<svelte:head>
	{@html `<style>
    :root {
      /* Base colors */
      --color-white: ${colors.white};

      /* Slate Palette */
      --color-slate-50: ${colors.slate50};
      --color-slate-100: ${colors.slate100};
      --color-slate-200: ${colors.slate200};
      --color-slate-300: ${colors.slate300};
      --color-slate-400: ${colors.slate400};
      --color-slate-500: ${colors.slate500};
      --color-slate-600: ${colors.slate600};
      --color-slate-700: ${colors.slate700};
      --color-slate-900: ${colors.slate800};

      /* Zone Colors */
      --color-zone-1: ${colors.zone1};
      --color-zone-2: ${colors.zone2};
      --color-zone-3: ${colors.zone3};
      --color-zone-4: ${colors.zone4};
      --color-zone-5: ${colors.zone5};
      --color-zone-6: ${colors.zone6};
    }
    </style>`}
</svelte:head>

<main>
	<Header
		bind:searchQuery={mapState.searchQuery}
		{currentZoom}
		onZoomIn={() => mapComponent?.zoomIn()}
		onZoomOut={() => mapComponent?.zoomOut()}
		onZoomReset={() => mapComponent?.resetZoom()}
	/>

	<LabMap bind:this={mapComponent} bind:currentZoom />

	{#if mapState.selectedZone}
		<ZonePopup />
	{/if}
</main>

<style>
	main {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}
</style>
