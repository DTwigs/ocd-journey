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
  const [selectedStat, setSelectedStat] = useState<string>(STATS_CORE.mood);
  const [selectedInterval, setSelectedInterval] = useState<number>(
    INTERVALS.WEEK,
  );
  const colorScheme = useColorScheme();
  const { logEntries } = useStore();

  const statButtons = [
    {
      icon: MOOD_ICON_MAP[10],
      label: "Mood",
      value: STATS_CORE.mood,
      onPress: () => setSelectedStat(STATS_CORE.mood),
    },
    {
      icon: BATTERY_ICON_MAP[8],
      label: "Energy",
      value: STATS_CORE.energy,
      onPress: () => setSelectedStat(STATS_CORE.energy),
    },
    {
      icon: ANXIETY_ICON_MAP[10],
      label: "Anxiety",
      value: STATS_CORE.anxiety,
      onPress: () => setSelectedStat(STATS_CORE.anxiety),
    },
    {
      icon: "arrow-up-bold-circle",
      label: "Resists",
      value: STATS_CORE.resists,
      onPress: () => setSelectedStat(STATS_CORE.resists),
    },
  ];

  const intervalButtons = [
    {
      // icon: MOOD_ICON_MAP[10],
      label: "Week",
      value: INTERVALS.WEEK,
      onPress: () => setSelectedInterval(INTERVALS.WEEK),
    },
    {
      // icon: BATTERY_ICON_MAP[8],
      label: "Month",
      value: INTERVALS.MONTH,
      onPress: () => setSelectedInterval(INTERVALS.MONTH),
    },
    {
      // icon: ANXIETY_ICON_MAP[10],
      label: "3-Months",
      value: INTERVALS.QUARTER,
      onPress: () => setSelectedInterval(INTERVALS.QUARTER),
    },
    {
      // icon: "arrow-up-bold-circle",
      label: "All",
      value: INTERVALS.ALL,
      onPress: () => setSelectedInterval(INTERVALS.ALL),
    },
  ];

  return (
    <View style={styles.contents}>
      <View style={styles.buttonGroupContainer}>
        <GroupButton
          items={statButtons}
          colors={Colors[colorScheme]}
          selected={selectedStat}
        />
      </View>

      <StatsChart
        entries={logEntries}
        stat={selectedStat}
        interval={selectedInterval}
      />
      <StatsLegend colors={Colors[colorScheme]} />

      <View style={styles.buttonGroupContainer}>
        <GroupButton
          items={intervalButtons}
          colors={Colors[colorScheme]}
          selected={selectedInterval}
        />
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
