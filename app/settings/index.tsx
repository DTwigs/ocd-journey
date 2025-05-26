import { Pressable, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useThemeColors } from "@/hooks/useThemeColors";
import { ThemedText } from "@/components/ThemedText";
import { DarkModeToggle } from "@/components/DarkModeToggle";

export default function Settings() {
  const colors = useThemeColors();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Pressable
        style={[styles.linkItem, { borderColor: colors.backgroundTint }]}
        onPress={() => router.navigate("/settings/customize")}
      >
        <ThemedText type="defaultSemiBold">Customize</ThemedText>
        <MaterialCommunityIcons
          size={28}
          name="chevron-right"
          color={colors.text}
        />
      </Pressable>
      <Pressable
        style={[styles.linkItem, { borderColor: colors.backgroundTint }]}
        onPress={() => router.navigate("/settings/privacy")}
      >
        <ThemedText type="defaultSemiBold">Privacy</ThemedText>
        <MaterialCommunityIcons
          size={28}
          name="chevron-right"
          color={colors.text}
        />
      </Pressable>
      <DarkModeToggle />
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
  linkItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    width: "100%",
    paddingVertical: 12,
  },
});
