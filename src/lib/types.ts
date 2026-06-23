export interface Room {
  id: string;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  zones: Zone[];
}

export enum ZoneType {
  CABINET = "cabinet",
  FUMEHOOD = "fumehood",
  FREEZER = "freezer",
  BENCH = "bench",
  SINK = "sink",
  RACK = "rack",
}

export interface Zone {
  id?: string;
  name: string;
  type: ZoneType;
  x: number;
  y: number;
  w: number;
  h: number;
  shelves?: Shelf[];
  sublabel?: string;
}

export interface Shelf {
  name?: string;
  items: string[];
}
