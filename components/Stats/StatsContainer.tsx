import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  MOOD_ICON_MAP,
  BATTERY_ICON_MAP,
  ANXIETY_ICON_MAP,
} from "@/constants/JournalIcons";
import { INTERVALS } from "@/constants/Dates";
import { STATS_CORE } from "@/constants/Stats";
import { useStore } from "@/hooks/useStore";
import { StatsChart } from "./StatsChart";
import { StatsLegend } from "./StatsLegend";
import { GroupButton } from "@/components/GroupButton";

export const StatsContainer = () => {
  const [selectedInterval, setSelectedInterval] = useState<number>(
    INTERVALS.WEEK,
  );
  const [selectedFactor, setSelectedFactor] = useState<number>(0);
  const colorScheme = useColorScheme();
  const { logEntries } = useStore();

  const statButtons = [
    {
      icon: MOOD_ICON_MAP[10],
      label: "Mood",
      value: STATS_CORE.mood,
      // onPress: () => setSelectedStat(STATS_CORE.mood),
    },
    {
      icon: BATTERY_ICON_MAP[8],
      label: "Energy",
      value: STATS_CORE.energy,
      // onPress: () => setSelectedStat(STATS_CORE.energy),
    },
    {
      icon: ANXIETY_ICON_MAP[10],
      label: "Anxiety",
      value: STATS_CORE.anxiety,
      // onPress: () => setSelectedStat(STATS_CORE.anxiety),
    },
    // {
    //   icon: "arrow-up-bold-circle",
    //   label: "Resists",
    //   value: STATS_CORE.resists,
    //   onPress: () => setSelectedStat(STATS_CORE.resists),
    // },
  ];

  const intervalButtons = [
    {
      label: "Week",
      value: INTERVALS.WEEK,
      onPress: () => setSelectedInterval(INTERVALS.WEEK),
    },
    {
      label: "Month",
      value: INTERVALS.MONTH,
      onPress: () => setSelectedInterval(INTERVALS.MONTH),
    },
    {
      label: "3-Months",
      value: INTERVALS.QUARTER,
      onPress: () => setSelectedInterval(INTERVALS.QUARTER),
    },
    // {
    //   label: "All",
    //   value: INTERVALS.ALL,
    //   onPress: () => setSelectedInterval(INTERVALS.ALL),
    // },
  ];

  const onLegendPress = (value: number) => {
    setSelectedFactor(selectedFactor === value ? 0 : value);
  };

  return (
    <View style={styles.contents}>
      <View style={styles.buttonGroupContainer}>
        <GroupButton
          items={intervalButtons}
          colors={Colors[colorScheme]}
          selected={selectedInterval}
        />
      </View>

      {statButtons.map(({ icon, label, value }, index) => (
        <StatsChart
          entries={logEntries}
          stat={value}
          icon={icon}
          label={label}
          interval={selectedInterval}
          showXLabel={index === statButtons.length - 1}
          selectedFactor={selectedFactor}
          key={value}
        />
      ))}
      <View style={{ marginTop: 40 }}>
        <StatsLegend colors={Colors[colorScheme]} onPress={onLegendPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contents: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100",
  },
  buttonGroupContainer: {
    paddingTop: 40,
    paddingBottom: 40,
  },
});
