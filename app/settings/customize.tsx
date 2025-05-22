import { StyleSheet, View } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import FactorsForm from "@/components/FactorsForm";

export default function Customization() {
  const colors = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FactorsForm />
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
