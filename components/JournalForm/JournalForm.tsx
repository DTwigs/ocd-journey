import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import CustomSlider from "@/components/CustomSlider";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useStore } from "@/hooks/useStore";
import type { LogEntry } from "@/models/logEntry/type";

const MOOD_ICON_MAP = {
  0: "emoticon-frown",
  1: "emoticon-sad",
  2: "emoticon-sad",
  3: "emoticon-confused",
  4: "emoticon-neutral",
  5: "emoticon-neutral",
  6: "emoticon-happy",
  7: "emoticon-happy",
  8: "emoticon-happy",
  9: "emoticon-excited",
  10: "emoticon-excited",
};

const BATTERY_ICON_MAP = {
  0: "battery-10",
  1: "battery-10",
  2: "battery-20",
  3: "battery-30",
  4: "battery-40",
  5: "battery-50",
  6: "battery-60",
  7: "battery-70",
  8: "battery-80",
  9: "battery-90",
  10: "battery",
};

export const JournalForm = () => {
  const { dispatch } = useStore();
  const colorScheme = useColorScheme();
  const [mood, setMood] = useState<number>(5);
  const [energy, setEnergy] = useState<number>(5);

  return (
    <View style={[styles.contents]}>
      <CustomSlider
        name="Mood"
        icon={MOOD_ICON_MAP[mood]}
        initVal={mood}
        setValue={setMood}
        colorHighlight={Colors[colorScheme].text}
      />
      <CustomSlider
        name="Energy"
        icon={BATTERY_ICON_MAP[energy]}
        initVal={energy}
        setValue={setEnergy}
        colorHighlight={Colors[colorScheme].text}
      />
      <View style={styles.submitButtonContainer}>
        <Pressable>
          <MaterialCommunityIcons
            size={96}
            name="check-circle"
            color={Colors[colorScheme].text}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contents: {
    paddingTop: 48,
    gap: 20,
    flexDirection: "column",
    alignItems: "flex-start",
    maxWidth: "80%",
  },
  submitButtonContainer: {
    marginTop: 24,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
