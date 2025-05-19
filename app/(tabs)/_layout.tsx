import { useRouter, Tabs } from "expo-router";
import React from "react";
import { Platform, Pressable, StyleSheet } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].text,
        headerRight: () => (
          <Pressable
            onPress={() => router.navigate("/settings")}
            style={styles.headerRight}
          >
            <MaterialCommunityIcons
              size={28}
              name="cog"
              color={Colors[colorScheme ?? "light"].text}
            />
          </Pressable>
        ),
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
        tabBarButton: HapticTab,
        // tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
            backgroundColor: "transparent", //Colors[colorScheme ?? "light"].background,
            elevation: 0,
            shadowOpacity: 0,
            borderTopWidth: 0,
          },
          default: {
            backgroundColor: "transparent", //Colors[colorScheme ?? "light"].background,
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
              size={28}
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
            <IconSymbol size={28} name="heart.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: "Stats",
          // href: null,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons size={28} name="cat" color={color} />
          ),
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
