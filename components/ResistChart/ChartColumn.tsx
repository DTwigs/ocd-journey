import { StyleSheet, View } from "react-native";

import { useThemeColors } from "@/hooks/useThemeColors";
import { ThemedText } from "../ThemedText";

const MAX_DISPLAY = 15;

export function ChartColumn({ count }: { count: number }) {
  const colors = useThemeColors();

  const countedArray = new Array(
    count > MAX_DISPLAY ? MAX_DISPLAY : count,
  ).fill(1);

  return (
    <View style={styles.contents}>
      {count > MAX_DISPLAY && (
        <ThemedText
          style={styles.overflow}
        >{`+${count - MAX_DISPLAY}`}</ThemedText>
      )}
      {countedArray.map((_, i) => (
        <View
          key={i}
          style={[styles.countItem, { backgroundColor: colors.text }]}
        ></View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  contents: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    height: "100%",
    width: 12,
    gap: 2,
    paddingBottom: 4,
  },
  countItem: {
    height: 8,
    width: 8,
    borderRadius: 1,
  },
  overflow: {
    fontSize: 8,
    marginBottom: -4,
    overflow: "visible",
    width: 18,
    textAlign: "center",
  },
});
