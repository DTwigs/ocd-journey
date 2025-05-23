import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import { AppState } from "react-native";
import type { AppStateStatus } from "react-native";
import "react-native-reanimated";
import ErrorBoundary from "react-native-error-boundary";
import { ErrorFallback } from "@/components/ErrorFallback";
import { parseISO, isSameDay } from "date-fns";
import * as db from "@/db";
import { useStore } from "@/hooks/useStore";
import { useDarkMode } from "@/hooks/useDarkMode";
import ToastWrapper from "./ToastWrapper";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function Root() {
  const store = useStore();
  const appState = useRef(AppState.currentState);
  const isDarkMode = useDarkMode();

  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);
    (async () => {
      store.init();
    })();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  const onAppStateChange = (nextAppState: AppStateStatus) => {
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
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="settings"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <ToastWrapper />
    </ErrorBoundary>
  );
}
