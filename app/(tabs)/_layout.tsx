import { useRouter, Tabs } from "expo-router";
import React from "react";
import { Platform, Pressable, StyleSheet } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useThemeColors } from "@/hooks/useThemeColors";
import { CatIcon } from "@/components/CatIcon";

export default function TabLayout() {
  const colors = useThemeColors();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.text,
        headerRight: () => (
          <Pressable
            onPress={() => router.navigate("/settings")}
            style={styles.headerRight}
          >
            <MaterialCommunityIcons size={28} name="cog" color={colors.text} />
          </Pressable>
        ),
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          fontFamily: "LcdPhone",
          fontSize: 20,
          color: colors.text,
        },
        tabBarButton: HapticTab,
        // tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
            backgroundColor: colors.background,
            elevation: 0,
            shadowOpacity: 0,
            borderTopWidth: 0,
          },
          default: {
            backgroundColor: colors.background,
            elevation: 0,
            shadowOpacity: 0,
            borderTopWidth: 0,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "OCD JOURNEY",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              size={30}
              name="arrow-up-bold-circle"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: "Journal",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={30} name="heart.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: "Stats",
          // href: null,
          tabBarIcon: ({ color }) => <CatIcon color={color} />,
          headerShown: false,
          popToTopOnBlur: true,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    marginRight: 25,
  },
});
