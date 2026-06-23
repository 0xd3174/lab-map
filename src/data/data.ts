import { ZoneType, type Room } from "./../lib/types";

import config from "./config.yaml";
import map from "./map.yaml";

const typedConfig = config as {
  width: number;
  height: number;
  gap_size: number;
  cell_size: number;
};

export const GAP_SIZE = typedConfig.gap_size;
export const CELL_SIZE = typedConfig.cell_size;

const typedMap = map as {
  rooms: Room[];
  doors: { x1: number; y1: number; x2: number; y2: number }[];
};

export const ROOMS: Room[] = typedMap.rooms.map((room) => {
  const x = room.x * CELL_SIZE;
  const y = room.y * CELL_SIZE;
  const w = room.w * CELL_SIZE;
  const h = room.h * CELL_SIZE;

  return {
    id: `room-${crypto.randomUUID()}`,
    name: room.name,
    x,
    y,
    w,
    h,
    zones: room.zones.map((zone) => {
      const typeKey = zone.type.toUpperCase() as keyof typeof ZoneType;
      const type = ZoneType[typeKey] || ZoneType.BENCH;

      return {
        ...zone,
        id: `zone-${crypto.randomUUID()}`,
        type,
        x: zone.x * CELL_SIZE,
        y: zone.y * CELL_SIZE,
        w: zone.w * CELL_SIZE,
        h: zone.h * CELL_SIZE,
      };
    }),
  };
});

export const DOORS = typedMap.doors.map((door) => {
  return {
    x1: door.x1 * CELL_SIZE,
    y1: door.y1 * CELL_SIZE,
    x2: door.x2 * CELL_SIZE,
    y2: door.y2 * CELL_SIZE,
  };
});

export const LAB_WIDTH = typedConfig.width * CELL_SIZE;
export const LAB_HEIGHT = typedConfig.height * CELL_SIZE;
