import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  MOOD_ICON_MAP,
  BATTERY_ICON_MAP,
  ANXIETY_ICON_MAP,
} from "@/constants/JournalIcons";
import { useStore } from "@/hooks/useStore";
import { StatsChart } from "./StatsChart";

export const StatsContainer = () => {
  const [selectedStat, setSelectedStat] = useState<string>("mood");
  const colorScheme = useColorScheme();
  const { logEntries } = useStore();

  const groupButtonItems = [
    {
      icon: MOOD_ICON_MAP[10],
      label: "mood",
      onPress: () => setSelectedStat("mood"),
    },
    {
      icon: BATTERY_ICON_MAP[8],
      label: "energy",
      onPress: () => setSelectedStat("energy"),
    },
    {
      icon: ANXIETY_ICON_MAP[10],
      label: "anxiety",
      onPress: () => setSelectedStat("anxiety"),
    },
    {
      icon: "arrow-up-bold-circle",
      label: "resists",
      onPress: () => setSelectedStat("resists"),
    },
  ];

  const buildGroupButtons = () => {
    return groupButtonItems.map(({ icon, label, onPress }, index) => {
      const buttonStyles = [
        styles.buttonGroupBtn,
        {
          backgroundColor: Colors[colorScheme].text,
          color: Colors[colorScheme].background,
        },
      ];

      if (index === 0 || index === groupButtonItems.length - 1) {
        buttonStyles.push(index === 0 ? styles.firstButton : styles.lastButton);
      }

      if (label === selectedStat) {
        buttonStyles.push({ backgroundColor: Colors[colorScheme].secondary });
      }

      return (
        <Pressable onPress={onPress} key={label} style={buttonStyles}>
          <MaterialCommunityIcons
            size={24}
            name={icon}
            color={Colors[colorScheme].background}
          />
          <Text style={{ color: Colors[colorScheme].background }}>{label}</Text>
        </Pressable>
      );
    });
  };

  return (
    <View style={styles.contents}>
      <View style={styles.buttonGroup}>{buildGroupButtons()}</View>

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
  buttonGroup: {
    flexDirection: "row",
    justifyContents: "center",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
  },
  buttonGroupBtn: {
    flexDirection: "row",
    justifyContents: "center",
    alignItems: "center",
    padding: 10,
  },
  firstButton: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  lastButton: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
});
