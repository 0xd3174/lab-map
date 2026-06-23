<script lang="ts">
  let {
    searchQuery = $bindable(),
    currentZoom = 1,
    onZoomIn,
    onZoomOut,
    onZoomReset,
  }: {
    searchQuery: string;
    currentZoom?: number;
    onZoomIn?: () => void;
    onZoomOut?: () => void;
    onZoomReset?: () => void;
  } = $props();

  let searchElement: HTMLInputElement;
</script>

<svelte:window
  onkeydown={(e) => {
    if (e.ctrlKey && e.key === "k") {
      e.preventDefault();
      searchElement.focus();
    }
  }}
/>

<header>
  <div class="search-container">
    <svg class="search-icon" viewBox="0 0 20 20" fill="currentColor">
      <path
        fill-rule="evenodd"
        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
        clip-rule="evenodd"
      />
    </svg>
    <input
      bind:this={searchElement}
      type="text"
      bind:value={searchQuery}
      placeholder="Поиск..."
      class="search-input"
    />
    {#if searchQuery}
      <button class="clear-btn" onclick={() => (searchQuery = "")} aria-label="Clear">×</button>
    {/if}
  </div>
  <div class="zoom-controls">
    <button onclick={onZoomOut} aria-label="Zoom Out">−</button>
    <button
      class="zoom-level-btn"
      onclick={onZoomReset}
      aria-label="Reset Zoom"
      title="Сбросить масштаб"
    >
      {Math.round(currentZoom * 100)}%
    </button>
    <button onclick={onZoomIn} aria-label="Zoom In">+</button>
  </div>
</header>

<style>
  header {
    position: absolute;
    top: 1rem;
    left: 1rem;
    right: 1rem;
    z-index: 10;
    display: flex;
    justify-content: center;
    gap: var(--space-3);
    pointer-events: none;
  }

  .search-container {
    position: relative;
    display: flex;
    place-items: center;
    width: 100%;
    max-width: 32rem;
    pointer-events: auto;
    background: var(--bg-primary);
    border-radius: 1.5rem;
    border: 1px solid var(--color-slate-200);
    height: 2.5rem;
  }

  .search-container:focus-within {
    border-color: var(--color-slate-300);
  }

  .search-icon {
    height: 1.25rem;
    padding: 0 var(--space-3);
    color: var(--color-slate-400);
    pointer-events: none;
  }

  .search-input {
    width: 100%;
    border: none;
    border-radius: var(--rounded-full);
    background: transparent;
    font-size: var(--text-sm);
    color: var(--color-slate-900);
    outline: none;
  }

  .search-input::placeholder {
    color: var(--color-slate-400);
  }

  .clear-btn {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    background: var(--color-slate-200);
    border: none;
    border-radius: var(--rounded-full);
    width: 1.5rem;
    height: 1.5rem;
    color: var(--color-slate-500);
    cursor: pointer;
    font-size: 1.2rem;
    line-height: 1;
    padding: 0;
  }

  .clear-btn:hover {
    background: var(--color-slate-300);
    color: var(--color-slate-700);
  }

  .zoom-controls {
    display: flex;
    flex-direction: row;
    background: var(--color-white);
    border-radius: 1.5rem;
    border: 1px solid var(--color-slate-200);
    pointer-events: auto;
    height: 2.5rem;
  }

  .zoom-controls button {
    background: none;
    border: none;
    border-right: 1px solid var(--color-slate-200);
    width: 2.5rem;
    height: 2.5rem;
    font-size: var(--text-2xl);
    color: var(--color-slate-600);
    cursor: pointer;
    transition:
      background 0.15s,
      color 0.15s;
  }

  .zoom-controls button:last-child {
    border-right: none;
  }

  .zoom-controls button:first-child {
    border-top-left-radius: var(--rounded-full);
    border-bottom-left-radius: var(--rounded-full);
  }

  .zoom-controls button:last-child {
    border-top-right-radius: var(--rounded-full);
    border-bottom-right-radius: var(--rounded-full);
  }

  .zoom-controls button.zoom-level-btn {
    width: 3.5rem;
    font-size: var(--text-sm);
    font-weight: 500;
  }

  .zoom-controls button:hover {
    background: var(--color-slate-100);
    color: var(--color-slate-900);
  }
</style>
