import { ZoneType, type Zone, type Shelf } from "../lib/types";
import cssVariables from "./../lib/css-variables";

export const ZONE_COLORS: Record<ZoneType, string> = {
  [ZoneType.CABINET]: cssVariables.colorZone1,
  [ZoneType.FUMEHOOD]: cssVariables.colorZone2,
  [ZoneType.FREEZER]: cssVariables.colorZone3,
  [ZoneType.BENCH]: cssVariables.colorZone4,
  [ZoneType.SINK]: cssVariables.colorZone5,
  [ZoneType.RACK]: cssVariables.colorZone6,
};

export const ZONE_LABELS: Record<ZoneType, string> = {
  [ZoneType.CABINET]: "Шкаф",
  [ZoneType.FUMEHOOD]: "Вытяжка",
  [ZoneType.FREEZER]: "Морозилка",
  [ZoneType.BENCH]: "Стол",
  [ZoneType.SINK]: "Мойка",
  [ZoneType.RACK]: "Стеллаж",
};

function formatShelfText(shelf: Shelf) {
  return ` - ${shelf.items.join(", ")}`;
}

export function generateZoneAsciiArt(zone: Zone): string {
  const shelves = zone.shelves!;
  const lines: string[] = [];

  switch (zone.type) {
    case ZoneType.CABINET: {
      const topShelf = shelves.find((s) => s.name?.toLowerCase() === "top");
      const innerShelves = shelves.filter((s) => s !== topShelf);

      if (topShelf) {
        lines.push(`           ${formatShelfText(topShelf)}`);
      }

      lines.push("┬─────────┬");
      innerShelves.forEach((shelf) => {
        lines.push(`├────○────┤${formatShelfText(shelf)}`);
      });
      lines.push("└─────────┘");
      break;
    }

    case ZoneType.RACK: {
      lines.push("┬─────────┬");
      shelves.forEach((shelf) => {
        lines.push(`├─────────┤${formatShelfText(shelf)}`);
      });
      lines.push("┴─────────┴");
      break;
    }

    case ZoneType.FREEZER: {
      lines.push("┌─────────┐");
      shelves.forEach((shelf, index) => {
        lines.push(`│   ❄️    │${formatShelfText(shelf)}`);
        if (index < shelves.length - 1) {
          lines.push("├─────────┤");
        }
      });
      if (shelves.length === 0) {
        lines.push("│   ❄️    │");
      }
      lines.push("└─────────┘");
      break;
    }

    case ZoneType.BENCH: {
      lines.push("           ");
      shelves.forEach((shelf) => {
        lines.push(`───────────${formatShelfText(shelf)}`);
      });
      break;
    }
  }

  return lines.join("\n");
}
