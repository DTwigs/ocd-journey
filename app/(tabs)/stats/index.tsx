import { Pressable, StyleSheet, View } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import StatsContainer from "@/components/Stats";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Stats() {
  const router = useRouter();
  const colors = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatsContainer />
      <Pressable
        onPress={() => router.navigate("/(tabs)/stats/notes")}
        style={styles.notesLink}
      >
        <ThemedText
          type="defaultSemiBold"
          style={[styles.notesLinkText, { color: colors.text }]}
        >
          See All Notes
        </ThemedText>
        <MaterialCommunityIcons
          name="note-outline"
          size={22}
          color={colors.primary}
        />
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
  notesLink: {
    marginTop: 60,
    flexDirection: "row",
    alignItems: "center",
  },
  notesLinkText: {
    paddingRight: 8,
    textDecorationLine: "underline",
  },
});
