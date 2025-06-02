import { Colors } from "@/constants/Colors";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export const Loader = ({ colors }: typeof Colors) => (
  <View style={styles.container}>
    <ActivityIndicator size="small" color={colors.lightText} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 88,
  },
});
