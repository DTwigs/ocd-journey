import { StyleSheet } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import FactorsForm from "@/components/FactorsForm";
import { ScrollView } from "react-native-gesture-handler";

export default function Customization() {
  const colors = useThemeColors();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <FactorsForm />
    </ScrollView>
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
