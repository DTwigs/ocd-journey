import { View, Text, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

export default function ToastWrapper() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

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
