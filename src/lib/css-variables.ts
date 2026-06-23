const root = document.documentElement;
const styles = getComputedStyle(root);

export default {
  colorZone1: styles.getPropertyValue("--color-zone-1"),
  colorZone2: styles.getPropertyValue("--color-zone-2"),
  colorZone3: styles.getPropertyValue("--color-zone-3"),
  colorZone4: styles.getPropertyValue("--color-zone-4"),
  colorZone5: styles.getPropertyValue("--color-zone-5"),
  colorZone6: styles.getPropertyValue("--color-zone-6"),
  colorSlate50: styles.getPropertyValue("--color-slate-50"),
  colorSlate100: styles.getPropertyValue("--color-slate-100"),
  colorSlate200: styles.getPropertyValue("--color-slate-200"),
  colorSlate300: styles.getPropertyValue("--color-slate-300"),
  colorSlate400: styles.getPropertyValue("--color-slate-400"),
  colorSlate500: styles.getPropertyValue("--color-slate-500"),
  colorSlate600: styles.getPropertyValue("--color-slate-600"),
  colorSlate700: styles.getPropertyValue("--color-slate-700"),
  colorSlate800: styles.getPropertyValue("--color-slate-800"),
} as const;
