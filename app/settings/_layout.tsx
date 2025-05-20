import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import "react-native-reanimated";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function Root() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <>
      <Stack
        screenOptions={{
          title: "SETTINGS",
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? "light"].background,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            fontFamily: "LcdPhone",
            fontSize: 20,
          },
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={styles.headerLeft}>
              <MaterialCommunityIcons
                size={28}
                name="chevron-left"
                color={Colors[colorScheme ?? "light"].text}
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
                  color={Colors[colorScheme ?? "light"].text}
                />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="customize"
          options={{
            title: "CUSTOMIZE",
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
