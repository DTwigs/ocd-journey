import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import { AppState, Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import "react-native-reanimated";

import * as db from "@/db";
import { useStore } from "@/hooks/useStore";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function Root() {
  const store = useStore();
  const appState = useRef(AppState.currentState);
  const colorScheme = useColorScheme();
  const router = useRouter();

  useEffect(() => {
    AppState.addEventListener("change", onAppStateChange);
    (async () => {
      store.init();
    })();

    return () => {
      if (AppState && AppState.removeEventListener) {
        AppState.removeEventListener("change", onAppStateChange);
      }
    };
  }, []);

  const onAppStateChange = (nextAppState: string) => {
    const backgroundToForeground =
      appState.current.match(/inactive|background/) &&
      nextAppState === "active";

    if (backgroundToForeground) {
      // Sync up the global state with async storage if we re-opened the app and it is
      // now a new day.
      (async () => {
        const lastSync = await db.getLastSync();

        let shouldSync = false;
        if (!lastSync) {
          db.setLastSync(new Date().toISOString());
          shouldSync = true;
        } else {
          shouldSync = !isSameDay(parseISO(lastSync), new Date());
        }

        if (shouldSync) {
          // re-populate the store from async storage
          store.init();
        }
      })();
    }

    appState.current = nextAppState;
  };

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="settings"
          options={{
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
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  headerLeft: {
    marginRight: 25,
  },
});
