<script lang="ts">
	import panzoom, { type PanZoom } from 'panzoom';
	import { onMount } from 'svelte';

	import cssVariables from '../lib/css-variables';
	import { mapState } from '../lib/state.svelte';
	import {
		ROOMS,
		GAP_SIZE,
		LAB_WIDTH,
		LAB_HEIGHT,
		DOORS,
		CELL_SIZE,
	} from './../data/data';
	import Zone from './Zone.svelte';

	let {
		currentZoom = $bindable(1),
	}: {
		currentZoom?: number;
	} = $props();

	let svgElement: SVGElement;
	let panzoomInstance: PanZoom;

	export function zoomIn() {
		if (!panzoomInstance) return;

		const { width, height } = svgElement.getBoundingClientRect();
		panzoomInstance.smoothZoom(width / 2, height / 2, 1.25);
	}

	export function zoomOut() {
		if (!panzoomInstance) return;

		const { width, height } = svgElement.getBoundingClientRect();
		panzoomInstance.smoothZoom(width / 2, height / 2, 0.75);
	}

	export function resetZoom() {
		if (!panzoomInstance) return;

		panzoomInstance.moveTo(0, 0);
		panzoomInstance.zoomAbs(0, 0, 1);
	}

	onMount(() => {
		panzoomInstance = panzoom(svgElement, {
			maxZoom: 100,
			minZoom: 0.01,
			bounds: true,
			boundsPadding: 0.1,
			onClick: (e) => {
				if (!e.type.startsWith('touch') || !e.target) return;

				e.target.dispatchEvent(
					new MouseEvent('click', {
						bubbles: true,
						cancelable: true,
						view: window,
					}),
				);
			},
		});

		if (currentZoom !== 1) {
			const { width, height } = svgElement.getBoundingClientRect();
			panzoomInstance.zoomAbs(width / 2, height / 2, currentZoom);
		}

		panzoomInstance.on(
			'zoom',
			() => (currentZoom = panzoomInstance.getTransform().scale),
		);

		return () => panzoomInstance.dispose();
	});

	$effect(() => {
		if (mapState.selectedZone) panzoomInstance.pause();
		else panzoomInstance.resume();
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<svg
	bind:this={svgElement}
	viewBox="0 0 {LAB_WIDTH + GAP_SIZE * 2} {LAB_HEIGHT + GAP_SIZE * 2}"
	onclick={() => (mapState.selectedZone = null)}
>
	<!-- Dot pattern -->
	<pattern
		id="grid"
		width={CELL_SIZE / 2}
		height={CELL_SIZE / 2}
		patternUnits="userSpaceOnUse"
	>
		<circle cx="2" cy="2" r="1" fill={cssVariables.colorSlate300} />
	</pattern>

	<!-- Floor background -->
	<rect
		width={LAB_WIDTH + GAP_SIZE * 2}
		height={LAB_HEIGHT + GAP_SIZE * 2}
		fill={cssVariables.colorSlate50}
	/>
	<rect
		x={GAP_SIZE}
		y={GAP_SIZE}
		width={LAB_WIDTH}
		height={LAB_HEIGHT}
		fill="url(#grid)"
	/>

	<svg x={GAP_SIZE} y={GAP_SIZE} width={LAB_WIDTH} height={LAB_HEIGHT}>
		{#each ROOMS as room}
			<svg
				x={room.x}
				y={room.y}
				width={room.w}
				height={room.h}
				viewBox="0 0 {room.w} {room.h}"
			>
				<!-- Walls -->
				<rect
					width="100%"
					height="100%"
					fill="none"
					stroke="#94a3b8"
					stroke-width="4"
				/>

				<!-- Zones -->
				<svg
					x="6"
					y="6"
					width={room.w - 6 * 2}
					height={room.h - 6 * 2}
					viewBox="0 0 {room.w} {room.h}"
					preserveAspectRatio="none"
					overflow="visible"
				>
					{#each room.zones as zone}
						<Zone {zone} />
					{/each}
				</svg>
			</svg>
		{/each}

		<!-- Doors -->
		{#each DOORS as door}
			<line
				x1={door.x1}
				y1={door.y1}
				x2={door.x2}
				y2={door.y2}
				stroke="#f8fafc"
				stroke-width="8"
				stroke-linecap="square"
			/>
		{/each}
	</svg>
</svg>
