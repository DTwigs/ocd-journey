import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export const ErrorFallback = ({ error }: { error: string }) => (
  <ThemedView style={styles.container}>
    <View style={styles.textContainer}>
      <MaterialCommunityIcons name="emoticon-sad" size={55} />
      <ThemedText type="title" style={styles.title}>
        Oops!
      </ThemedText>
      <ThemedText type="subtitle">There's an error</ThemedText>

      <ThemedText style={styles.text}>{error.toString()}</ThemedText>
    </View>
  </ThemedView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    textAlign: "center",
  },
  textContainer: {
    width: "80%",
    alignItems: "flex-start",
  },
  title: {
    marginTop: 20,
  },
  text: {
    marginVertical: 16,
  },
});
