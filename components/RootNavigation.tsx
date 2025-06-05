import { Stack } from "expo-router";
import { useNotificationObserver } from "@/hooks/useNotificationObserver";

export default function RootNavigation() {
  useNotificationObserver();

  return (
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
  );
}
