import { StyleSheet } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import FeedbackForm from "@/components/FeedbackForm";
import { ScrollView } from "react-native-gesture-handler";

export default function Feedback() {
  const colors = useThemeColors();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <FeedbackForm />
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
