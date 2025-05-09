import { Pressable, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

import { ChartColumn } from "./ChartColumn";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useStore } from "@/hooks/useStore";
import type { LogEntry } from "@/models/logEntry/type";

export const ResistChart = () => {
  const router = useRouter();
  const { logEntries } = useStore();
  const colorScheme = useColorScheme();

  return (
    <Pressable
      onPress={() => {
        router.navigate("/stats");
      }}
    >
      <View
        style={[
          styles.contents,
          { borderBottomColor: Colors[colorScheme].text },
        ]}
      >
        {[...logEntries.slice(0, 20)].map((logEntry: LogEntry) => (
          <ChartColumn count={logEntry.stats.resists} key={logEntry.date} />
        ))}
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
