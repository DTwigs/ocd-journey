import { StyleSheet, View } from "react-native";

import { useThemeColors } from "@/hooks/useThemeColors";

export function ChartColumn({ count }: { count: number }) {
  const colors = useThemeColors();

  const countedArray = new Array(count).fill(1);

  return (
    <View style={styles.contents}>
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
});
