import type { Zone } from "./types";

export const mapState = $state<{
  selectedZone: Zone | null;
  searchQuery: string;
}>({
  selectedZone: null,
  searchQuery: "",
});
