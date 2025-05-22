import { StyleSheet, View } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import StatsContainer from "@/components/Stats";

export default function Stats() {
  const colors = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatsContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
