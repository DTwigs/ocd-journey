import { Pressable, StyleSheet, View } from "react-native";
// import { useEffect, useState } from "react";
// import { formatISO, subDays } from "date-fns";

import { ChartColumn } from "./ChartColumn";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useStore } from "@/hooks/useStore";
import type { LogEntry } from "@/models/logEntry/type";

// const createData = (): Array<LogEntry> => {
//   const dummyData = [];
//   const times = 40;
//   for (let i = 0; i < times; i++) {
//     dummyData.push({
//       date: formatISO(subDays(new Date(), i)),
//       entry: {
//         resists: Math.floor(Math.random() * 10),
//       },
//     });
//   }

//   return dummyData;
// };

export default function ResistChart() {
  const store = useStore();
  console.log({ store });
  const colorScheme = useColorScheme();
  // const [data, setData] = useState<LogEntry[]>([]);

  // useEffect(() => {
  //   setData(createData());
  // }, []);

  return (
    <Pressable onPress={() => {}}>
      <View
        style={[
          styles.contents,
          { borderBottomColor: Colors[colorScheme].text },
        ]}
      >
        {[...store.logEntries.slice(0, 20)].map((logEntry: LogEntry) => (
          <ChartColumn count={logEntry.entry.resists} key={logEntry.date} />
        ))}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  contents: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "80%",
    height: "100",
    borderBottomWidth: 2,
  },
});
