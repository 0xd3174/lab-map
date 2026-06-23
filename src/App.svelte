<script lang="ts">
  import "./app.css";

  import LabMap from "./components/LabMap.svelte";
  import Header from "./components/Header.svelte";
  import ZonePopup from "./components/ZonePopup.svelte";

  import { mapState } from "./lib/state.svelte";

  let mapComponent: ReturnType<typeof LabMap> | null = $state(null);
  let currentZoom = $state(Number(localStorage.getItem("zoom")) || 1);

  $effect(() => {
    localStorage.setItem("zoom", currentZoom.toString());
  });
</script>

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
