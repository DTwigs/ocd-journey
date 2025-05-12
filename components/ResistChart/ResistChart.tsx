import { Pressable, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

import { ChartColumn } from "./ChartColumn";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useStore } from "@/hooks/useStore";

export const ResistChart = () => {
  const router = useRouter();
  const { logEntries } = useStore();
  const colorScheme = useColorScheme();

  return (
    <Pressable
      onPress={() => {
        router.navigate("/(tabs)/stats");
      }}
    >
      <View
        style={[
          styles.contents,
          { borderBottomColor: Colors[colorScheme].text },
        ]}
      >
        {Array.from(logEntries)
          .slice(0, 20)
          .map(([date, stats]) => {
            return <ChartColumn count={stats.resists} key={date} />;
          })}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  contents: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    maxWidth: "80%",
    height: "100",
    borderBottomWidth: 2,
  },
});
