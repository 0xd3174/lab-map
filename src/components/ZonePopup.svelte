<script lang="ts">
  import type { Zone } from "./../lib/types";
  import { ZONE_LABELS, ZONE_COLORS, generateZoneAsciiArt } from "./../data/render";
  import { mapState } from "../lib/state.svelte";
  import SpiderWeb from "./SpiderWeb.svelte";

  let zone: Zone = $derived(mapState.selectedZone!);

  let color = $derived(ZONE_COLORS[zone.type]);
  let label = $derived(ZONE_LABELS[zone.type]);

  function onClose() {
    mapState.selectedZone = null;
  }
</script>

<svelte:window
  onkeydown={(e) => {
    if (e.key === "Escape") onClose();
  }}
/>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="popup-backdrop" onclick={onClose}>
  <div class="popup" onclick={(e) => e.stopPropagation()}>
    <div class="header">
      <div class="title-row">
        <div class="type-badge" style="background-color: {color}20; color: {color}">
          {label}
        </div>
        <button class="close-btn" onclick={onClose} aria-label="Close">×</button>
      </div>
      <h2>{zone.name} {zone.sublabel}</h2>
    </div>

    <div class="content">
      <div class="ascii-container">
        {#if zone.shelves && zone.shelves.length > 0}
          <pre>{generateZoneAsciiArt(zone)}</pre>
        {:else}
          <SpiderWeb />
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .popup-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--color-backdrop);
    backdrop-filter: blur(2px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    animation: fadeIn 0.2s ease;
  }

  .popup {
    background: var(--bg-primary);
    border-radius: var(--rounded-xl);
    max-width: 40rem;
    display: flex;
    flex-direction: column;
    animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .header {
    padding: var(--space-4);
    border-bottom: 1px solid var(--color-slate-200);
  }

  .title-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-2);
  }

  .type-badge {
    font-size: var(--text-xs);
    font-weight: 600;
    padding: var(--space-1) var(--space-3);
    border-radius: var(--rounded-full);
    text-transform: uppercase;
  }

  .close-btn {
    background: none;
    border: none;
    font-size: var(--text-2xl);
    color: var(--color-slate-400);
    padding: var(--space-1);
    border-radius: var(--rounded-lg);
    transition: all 0.15s;
  }

  .close-btn:hover {
    color: var(--color-slate-900);
    background: var(--color-slate-100);
  }

  h2 {
    margin: 0;
    font-size: var(--text-xl);
    font-weight: 600;
  }

  .content {
    padding: var(--space-5);
  }

  .ascii-container {
    background: var(--color-slate-50);
    border: 1px solid var(--color-slate-200);
    border-radius: var(--rounded-md);
    padding: var(--space-2);
  }

  .ascii-container pre {
    font-family:
      ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New",
      monospace;
    font-size: var(--text-sm);
    line-height: 1.4;
  }
</style>
