import { useFonts } from "expo-font";
import { useAssets } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";
import "react-native-reanimated";
import { View } from "react-native";

import { initNotifications } from "@/utils/notifications";
import { StoreProvider } from "@/contexts/StoreContext";
import Root from "@/components/Root";
import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: "https://64a22aa23207fbd8153b04546af8a454@o4509430384164864.ingest.us.sentry.io/4509430385606656",

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,
  integrations: [Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const imageAssets = [
  require("../assets/images/onboarding1.png"),
  require("../assets/images/onboarding2.png"),
  require("../assets/images/onboarding3.png"),
];

export default Sentry.wrap(function RootLayout() {
  const [fonts] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    LcdPhone: require("../assets/fonts/LcdPhone-wgZ2.ttf"),
  });

  const [assets, assetsError] = useAssets(imageAssets);

  useEffect(() => {
    initNotifications();
  }, []);

  const isAppReady = !!fonts && !!assets;

  if (assetsError) {
    console.error("Failed to load assets", assetsError);
  }

  const onLayoutRootView = useCallback(async () => {
    if (isAppReady) {
      await SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <StoreProvider>
        <Root />
      </StoreProvider>
    </View>
  );
});
