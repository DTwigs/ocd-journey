import { Pressable, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

import { ChartColumn } from "./ChartColumn";
import { useStore } from "@/hooks/useStore";
import type { LogEntryStats } from "@/models/logEntry/type";
// import type { State } from "@/models/state/type";

export const ResistChart = () => {
  const router = useRouter();
  const { logEntries } = useStore();
  // @ts-expect-error: it complain too much
  const logEntryArr: Array<[string, LogEntryStats]> =
    Array.from(logEntries).reverse();

  return (
    <Pressable
      onPress={() => {
        router.navigate("/(tabs)/stats");
      }}
    >
      <View style={styles.contents}>
        {logEntryArr
          .slice(0, 21)
          .map(([date, stats]: [string, LogEntryStats]): any => {
            return <ChartColumn count={stats.resists || 0} key={date} />;
          })}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  contents: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "flex-end",
    maxWidth: "80%",
    height: 100,
  },
});
