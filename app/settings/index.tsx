import { Pressable, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";

export default function Settings() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].background },
      ]}
    >
      <Pressable
        style={[
          styles.linkItem,
          { borderColor: Colors[colorScheme].backgroundTint },
        ]}
        onPress={() => router.navigate("/settings/customize")}
      >
        <ThemedText type="defaultSemiBold">Customize</ThemedText>
        <MaterialCommunityIcons
          size={28}
          name="chevron-right"
          color={Colors[colorScheme ?? "light"].text}
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
  linkItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    width: "100%",
    paddingVertical: 12,
  },
});
