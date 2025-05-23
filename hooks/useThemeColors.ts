/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from "@/constants/Colors";
import { useDarkMode } from "./useDarkMode";

export function useThemeColors(): typeof Colors {
  const isDarkMode = useDarkMode();

  return Colors[isDarkMode ? "dark" : "light"];
}
