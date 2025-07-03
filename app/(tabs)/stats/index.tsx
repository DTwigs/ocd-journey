import { Pressable, StyleSheet, Text, View } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import StatsContainer from "@/components/Stats";
import { useRouter } from "expo-router";

export default function Stats() {
  const router = useRouter();
  const colors = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatsContainer />
      <Pressable
        onPress={() => router.navigate("/(tabs)/stats/notes")}
        style={{ marginTop: 40 }}
      >
        <Text>Notes {">"}</Text>
      </Pressable>
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
