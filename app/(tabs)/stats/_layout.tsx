import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import "react-native-reanimated";

import { useThemeColors } from "@/hooks/useThemeColors";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function Root() {
  const colors = useThemeColors();
  const router = useRouter();

  return (
    <>
      <Stack
        screenOptions={{
          title: "STATS",
          headerShown: true,
          headerTitleStyle: {
            fontFamily: "LcdPhone",
            fontSize: 20,
            color: colors.text,
          },
          headerStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "STATS",
            headerLeft: () => <></>,
          }}
        />
        <Stack.Screen
          name="notes/index"
          options={{
            title: "NOTES",
            headerLeft: () => (
              <Pressable
                onPress={() => router.dismissTo("/(tabs)/stats")}
                style={styles.headerLeft}
              >
                <MaterialCommunityIcons
                  size={28}
                  name="chevron-left"
                  color={colors.text}
                />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="notes/[date]"
          options={{
            title: "NOTE DETAILS",
            headerLeft: () => (
              <Pressable
                onPress={() => router.dismissTo("/(tabs)/stats/notes")}
                style={styles.headerLeft}
              >
                <MaterialCommunityIcons
                  size={28}
                  name="chevron-left"
                  color={colors.text}
                />
              </Pressable>
            ),
          }}
        />
      </Stack>
    </>
  );
}

const styles = StyleSheet.create({
  headerLeft: {
    marginRight: 25,
  },
});
