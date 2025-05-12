import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  MOOD_ICON_MAP,
  BATTERY_ICON_MAP,
  ANXIETY_ICON_MAP,
} from "@/constants/JournalIcons";
import { useStore } from "@/hooks/useStore";
import { StatsChart } from "./StatsChart";
import { GroupButton } from "@/components/GroupButton";

export const StatsContainer = () => {
  const [selectedStat, setSelectedStat] = useState<string>("mood");
  const colorScheme = useColorScheme();
  const { logEntries } = useStore();

  const groupButtonItems = [
    {
      icon: MOOD_ICON_MAP[10],
      label: "Mood",
      onPress: () => setSelectedStat("Mood"),
    },
    {
      icon: BATTERY_ICON_MAP[8],
      label: "Energy",
      onPress: () => setSelectedStat("Energy"),
    },
    {
      icon: ANXIETY_ICON_MAP[10],
      label: "Anxiety",
      onPress: () => setSelectedStat("Anxiety"),
    },
    {
      icon: "arrow-up-bold-circle",
      label: "Resists",
      onPress: () => setSelectedStat("Resists"),
    },
  ];

  return (
    <View style={styles.contents}>
      <View style={styles.buttonGroupContainer}>
        <GroupButton
          items={groupButtonItems}
          colors={Colors[colorScheme]}
          selected={selectedStat}
        />
      </View>

      <StatsChart entries={logEntries} stat={selectedStat} />
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
