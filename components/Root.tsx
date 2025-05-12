import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import { AppState } from "react-native";
import "react-native-reanimated";

import * as db from "@/db";
import { useStore } from "@/hooks/useStore";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function Root() {
  const store = useStore();
  const appState = useRef(AppState.currentState);

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
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
