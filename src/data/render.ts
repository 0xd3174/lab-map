import { ZoneType, type Zone, type Shelf } from '../lib/types';
import colors from './../lib/colors';

export const ZONE_COLORS: Record<ZoneType, string> = {
	[ZoneType.CABINET]: colors.zone1,
	[ZoneType.FUMEHOOD]: colors.zone2,
	[ZoneType.FREEZER]: colors.zone3,
	[ZoneType.BENCH]: colors.zone4,
	[ZoneType.SINK]: colors.zone5,
	[ZoneType.RACK]: colors.zone6,
};

export const ZONE_LABELS: Record<ZoneType, string> = {
	[ZoneType.CABINET]: 'Шкаф',
	[ZoneType.FUMEHOOD]: 'Вытяжка',
	[ZoneType.FREEZER]: 'Морозилка',
	[ZoneType.BENCH]: 'Стол',
	[ZoneType.SINK]: 'Мойка',
	[ZoneType.RACK]: 'Стеллаж',
};

function formatShelfText(shelf: Shelf) {
	return ` - ${shelf.items.join(', ')}`;
}

// 0─────────1
// ├────○────┤
// 3─────────2
const ASCII_EDGES: Record<ZoneType, string[]> = {
	[ZoneType.CABINET]: ['┬', '┬', '┘', '└'],
	[ZoneType.FUMEHOOD]: ['┌', '┐', '┘', '└'],
	[ZoneType.FREEZER]: ['┌', '┐', '┘', '└'],
	[ZoneType.BENCH]: [' ', ' ', ' ', ' '],
	[ZoneType.SINK]: ['┌', '┐', '┘', '└'],
	[ZoneType.RACK]: ['┬', '┬', '┴', '┴'],
};

const ASCII_LINE: Record<ZoneType, string> = {
	[ZoneType.CABINET]: '├────○────┤',
	[ZoneType.FUMEHOOD]: '├─────────┤',
	[ZoneType.FREEZER]: '│   ❄️    │',
	[ZoneType.BENCH]: '───────────',
	[ZoneType.SINK]: '├─────────┤',
	[ZoneType.RACK]: '├─────────┤',
};

const BASE_LINE = '─────────';

export function generateZoneAsciiArt(zone: Zone): string {
	let shelves: Shelf[] = zone.shelves!;
	const lines: string[] = [];

	const edges = ASCII_EDGES[zone.type];
	const line = ASCII_LINE[zone.type];

	if (zone.type === ZoneType.CABINET) {
		const topShelf = shelves.find((s) => s.name?.toLowerCase() === 'top');
		if (topShelf) lines.push(`           ${formatShelfText(topShelf)}`);
		shelves = shelves.filter((s) => s !== topShelf);
	}

	lines.push(`${edges[0]}${BASE_LINE}${edges[1]}`);

	for (const shelf of shelves) {
		lines.push(`${line}${formatShelfText(shelf)}`);
	}

	lines.push(`${edges[3]}${BASE_LINE}${edges[2]}`);

	return lines.join('\n');
}
