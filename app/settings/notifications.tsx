import { StyleSheet } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import { ScrollView } from "react-native-gesture-handler";
import NotificationsForm from "@/components/NotificationsForm";

export default function Notifications() {
  const colors = useThemeColors();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <NotificationsForm />
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
