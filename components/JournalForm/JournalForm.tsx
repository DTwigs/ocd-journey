import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { CustomSlider } from "@/components/CustomSlider";
import { CustomCheckbox } from "@/components/CustomCheckbox";
import { Colors } from "@/constants/Colors";
import {
  MOOD_ICON_MAP,
  BATTERY_ICON_MAP,
  ANXIETY_ICON_MAP,
} from "@/constants/JournalIcons";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useStore } from "@/hooks/useStore";
import type { LogEntryStats } from "@/models/logEntry/type";

export const JournalForm = () => {
  const { dispatch } = useStore();
  const colorScheme = useColorScheme();
  const [logEntryStats, setLogEntryStats] = useState<LogEntryStats>({
    mood: 5,
    energy: 5,
    anxiety: 5,
    exercise: false,
    monthlyCycle: false,
  });

  const setStat = (statKey: string) => (value: number | boolean) =>
    setLogEntryStats((prevState) => ({ ...prevState, [statKey]: value }));

  const onPress = () => {
    dispatch({ type: logEntryModel.SAVE_LOG, value: logEntryStats });
  };

  return (
    <View style={[styles.contents]}>
      <CustomSlider
        name="Mood"
        icon={MOOD_ICON_MAP[logEntryStats.mood]}
        initVal={logEntryStats.mood}
        setValue={setStat("mood")}
        colorHighlight={Colors[colorScheme].text}
      />
      <CustomSlider
        name="Energy"
        icon={BATTERY_ICON_MAP[logEntryStats.energy]}
        initVal={logEntryStats.energy}
        setValue={setStat("energy")}
        colorHighlight={Colors[colorScheme].text}
      />
      <CustomSlider
        name="Anxiety"
        icon={ANXIETY_ICON_MAP[logEntryStats.anxiety]}
        initVal={logEntryStats.anxiety}
        setValue={setStat("anxiety")}
        colorHighlight={Colors[colorScheme].text}
      />
      <CustomCheckbox
        text="Exercise?"
        value={logEntryStats.exercise}
        setValue={setStat("exercise")}
      />
      <CustomCheckbox
        text="Monthly Cycle?"
        value={logEntryStats.period}
        setValue={setStat("period")}
      />
      <View style={styles.submitButtonContainer}>
        <Pressable onPress={onPress}>
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
    marginTop: 36,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
