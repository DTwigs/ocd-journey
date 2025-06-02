import { useFonts } from "expo-font";
import { useAssets } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import "react-native-reanimated";
import { View } from "react-native";

import { StoreProvider } from "@/contexts/StoreContext";
import Root from "@/components/Root";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const imageAssets = [
  require("../assets/images/onboarding1.png"),
  require("../assets/images/onboarding2.png"),
  require("../assets/images/onboarding3.png"),
];

export default function RootLayout() {
  const [fonts] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    LcdPhone: require("../assets/fonts/LcdPhone-wgZ2.ttf"),
  });

  const [assets, assetsError] = useAssets(imageAssets);

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
}
