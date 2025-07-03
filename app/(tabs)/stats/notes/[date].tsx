import { StyleSheet, View } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import StatsContainer from "@/components/Stats";
import { useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { useStore } from "@/hooks/useStore";

export default function NoteStats() {
  const { logEntries } = useStore();
  const { date } = useLocalSearchParams();
  const colors = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ThemedText>{logEntries.get(date)?.notes}</ThemedText>
      <StatsContainer startDate={date.toString()} />
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
