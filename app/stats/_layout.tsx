import { Stack } from "expo-router";
import React from "react";
// import { Platform } from "react-native";

// import { HapticTab } from "@/components/HapticTab";
// import { IconSymbol } from "@/components/ui/IconSymbol";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function StatsLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? "light"].text,
        headerShown: false,
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
        // tabBarButton: HapticTab,
        // tabBarBackground: TabBarBackground,
        // tabBarStyle: Platform.select({
        //   ios: {
        //     // Use a transparent background on iOS to show the blur effect
        //     position: "absolute",
        //     backgroundColor: "transparent", //Colors[colorScheme ?? "light"].background,
        //     elevation: 0,
        //     shadowOpacity: 0,
        //     borderTopWidth: 0,
        //   },
        //   default: {
        //     backgroundColor: "transparent", //Colors[colorScheme ?? "light"].background,
        //     elevation: 0,
        //     shadowOpacity: 0,
        //     borderTopWidth: 0,
        //   },
        // }),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Journal",
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
        }}
      />
    </Stack>
  );
}
