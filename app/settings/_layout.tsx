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
          title: "SETTINGS",
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleStyle: {
            fontFamily: "LcdPhone",
            fontSize: 20,
            color: colors.text,
          },
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={styles.headerLeft}>
              <MaterialCommunityIcons
                size={28}
                name="chevron-left"
                color={colors.text}
              />
            </Pressable>
          ),
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "SETTINGS",
            headerLeft: () => (
              <Pressable
                onPress={() => router.back()}
                style={styles.headerLeft}
              >
                <MaterialCommunityIcons
                  size={28}
                  name="home"
                  color={colors.text}
                />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="feedback"
          options={{
            title: "FEEDBACK",
          }}
        />
        <Stack.Screen
          name="customize"
          options={{
            title: "CUSTOMIZE",
          }}
        />
        <Stack.Screen
          name="privacy"
          options={{
            title: "PRIVACY",
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
