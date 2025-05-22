import { StyleSheet, View } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import JournalForm from "@/components/JournalForm";

export default function Journal() {
  const colors = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <JournalForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "red",
  },
});
