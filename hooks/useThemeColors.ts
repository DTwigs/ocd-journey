/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useStore } from "@/hooks/useStore";

export function useThemeColors(): typeof Colors {
  let theme = useColorScheme() ?? "light";
  const { settings } = useStore();
  let settingsTheme: "light" | "dark" | null = null;
  if (settings.darkMode != null) {
    settingsTheme = settings.darkMode ? "dark" : "light";
  }

  theme = settingsTheme ?? theme;
  return Colors[theme];
}
