import { Pressable, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { formatISO, subDays } from "date-fns";

import { ChartColumn } from "./ChartColumn";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

const createData = () => {
  const dummyData = [];
  const times = 40;
  for (let i = 0; i < times; i++) {
    dummyData.push({
      date: formatISO(subDays(new Date(), i)),
      count: Math.floor(Math.random() * 10),
    });
  }

  return dummyData;
};

export default function CompulsionChart() {
  const colorScheme = useColorScheme();
  const [data, setData] = useState<[{ date: string; count: number }]>([]);

  useEffect(() => {
    setData(createData());
  }, []);

  return (
    <Pressable onPress={() => {}}>
      <View
        style={[
          styles.contents,
          { borderBottomColor: Colors[colorScheme].text },
        ]}
      >
        {[...data.slice(0, 20)].map((dateObj) => (
          <ChartColumn count={dateObj.count} key={dateObj.date} />
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
