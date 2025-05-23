import { useColorScheme } from "@/hooks/useColorScheme";
import { useStore } from "@/hooks/useStore";

export const useDarkMode = () => {
  const theme = useColorScheme() ?? "light";
  const { settings } = useStore();
  if (settings.darkMode != null) {
    return settings.darkMode;
  }

  return theme !== "light";
};
