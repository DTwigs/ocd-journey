import { StyleSheet, View } from "react-native";
import { IconToggle } from "./IconToggle";
import { useDarkMode } from "@/hooks/useDarkMode";
import { useState } from "react";
import { useStore } from "@/hooks/useStore";
import { SET_DARKMODE } from "@/models/settings/actions";

export const DarkModeToggle = () => {
  const darkMode = useDarkMode();
  const { dispatch } = useStore();

  const [isDarkMode, _setDarkMode] = useState<boolean>(darkMode);

  const setDarkMode = (value: boolean) => {
    dispatch({ type: SET_DARKMODE, value });
    _setDarkMode(value);
  };

  return (
    <View style={styles.contents}>
      <IconToggle
        icon1="moon-waning-crescent"
        icon2="weather-sunny"
        value={isDarkMode}
        setValue={setDarkMode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contents: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    width: "100%",
  },
});
