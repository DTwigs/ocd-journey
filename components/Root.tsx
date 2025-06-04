import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
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
import { Onboarding } from "./Onboarding";
import { SET_ONBOARDING } from "@/models/settings/actions";
import { Loader } from "./Loader";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useNotificationObserver } from "@/hooks/useNotificationObserver";
import { requestNotificationPermissions } from "@/utils/notifications";
import { PSEUDO_PAGE_LOAD } from "@/constants/General";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function Root() {
  useNotificationObserver();
  const { settings, init, dispatch } = useStore();
  const appState = useRef(AppState.currentState);
  const isDarkMode = useDarkMode();
  const colors = useThemeColors();
  const [isReady, setIsReady] = useState<boolean>(false);

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
          init();
        }
      })();
    }

    appState.current = nextAppState;
  };

  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);
    (async () => {
      await init();
      setIsReady(true);
    })();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  const onOnboardingDone = () => {
    dispatch({ type: SET_ONBOARDING, value: false });
    setTimeout(() => requestNotificationPermissions(), PSEUDO_PAGE_LOAD);
  };

  if (!isReady) {
    return <Loader colors={colors} />;
  }

  if (settings.isOnboarding) {
    return (
      <>
        <StatusBar hidden={true} style="light" />
        <Onboarding onDone={onOnboardingDone} />
      </>
    );
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <GestureHandlerRootView>
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
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}
