<script lang="ts">
	import { ZONE_COLORS } from '../data/render';
	import colors from '../lib/colors';
	import { mapState } from '../lib/state.svelte';
	import type { Zone } from '../lib/types';

	let { zone }: { zone: Zone } = $props();

	function handleClick(e: MouseEvent) {
		e.stopPropagation();
		mapState.selectedZone = mapState.selectedZone?.id === zone.id ? null : zone;
	}

	function isZoneHighlighted(zone: Zone, query: string): boolean {
		if (!query.trim()) return false;

		const q = query.toLowerCase();

		if (zone.name.toLowerCase().includes(q)) return true;

		return (
			zone.shelves?.some(
				(shelf) =>
					shelf.name?.toLowerCase().includes(q) ||
					shelf.items.some((item) => item.toLowerCase().includes(q)),
			) || false
		);
	}

	const color = $derived(ZONE_COLORS[zone.type]);

	const isSelected = $derived(mapState.selectedZone?.id === zone.id);
	const isHighlighted = $derived(isZoneHighlighted(zone, mapState.searchQuery));
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<g
	class="zone"
	class:selected={isSelected}
	class:highlighted={isHighlighted}
	onclick={handleClick}
	role="button"
	tabindex={2}
>
	<rect
		x={zone.x + 6}
		y={zone.y + 6}
		width={zone.w - 6 * 2}
		height={zone.h - 6 * 2}
		rx="4"
		fill="{color}15"
		stroke={isSelected || isHighlighted ? color : `${color}60`}
		stroke-width={isSelected || isHighlighted ? '3' : '1.5'}
		class="zone-body"
	/>
	<text
		x={zone.x + zone.w / 2}
		y={zone.y + zone.h / 2 - (zone.sublabel ? 8 : 0)}
		text-anchor="middle"
		dominant-baseline="middle"
		class="zone-label"
		fill={colors.slate700}
	>
		{zone.name}
	</text>
	{#if zone.sublabel}
		<text
			x={zone.x + zone.w / 2}
			y={zone.y + zone.h / 2 + 10}
			text-anchor="middle"
			dominant-baseline="middle"
			class="zone-sublabel"
			fill={colors.slate500}
		>
			{zone.sublabel}
		</text>
	{/if}
</g>

<style>
	.zone {
		cursor: pointer;
	}

	.zone-body {
		transition: all 0.2s ease;
	}

	.zone:hover .zone-body {
		fill-opacity: 0.2;
	}

	.zone.selected .zone-body {
		fill-opacity: 0.3;
	}

	.zone-label {
		font-size: var(--font-sm);
		font-weight: 500;
		user-select: none;
	}

	.zone-sublabel {
		font-size: var(--font-xs);
		user-select: none;
	}
</style>
