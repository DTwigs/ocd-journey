import { View, Text, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import "react-native-reanimated";

import { useThemeColors } from "@/hooks/useThemeColors";

export default function ToastWrapper() {
  const colors = useThemeColors();

  const toastConfig = {
    pixelToast: ({ text1 }: any) => (
      <View style={[styles.toastContainer, { backgroundColor: colors.text }]}>
        <Text style={[styles.toastText, { color: colors.background }]}>
          {text1}
        </Text>
      </View>
    ),
  };

  return <Toast config={toastConfig} />;
}

const styles = StyleSheet.create({
  toastContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderRadius: 1,
    width: "80%",
    height: 60,
  },
  toastText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
