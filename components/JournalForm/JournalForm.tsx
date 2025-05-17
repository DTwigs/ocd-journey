import { useState } from "react";
import { useRouter } from "expo-router";
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
import { logEntryModel } from "@/models/logEntry";
import type { LogEntryStats } from "@/models/logEntry/type";

const { formatDateKey } = logEntryModel;

export const JournalForm = () => {
  const router = useRouter();
  const { logEntries, dispatch } = useStore();
  const colorScheme = useColorScheme();

  // prefill journal values if journal entry already exists
  const today = formatDateKey(new Date());
  const todaysLog = logEntries?.get(today);

  const [entryStats, setEntryStats] = useState<LogEntryStats>({
    mood: todaysLog?.mood ?? 5,
    energy: todaysLog?.energy ?? 5,
    anxiety: todaysLog?.anxiety ?? 5,
    exercise: todaysLog?.exercise ?? false,
    monthlyCycle: todaysLog?.period ?? false,
  });

  const setStat = (statKey: string) => (value: number | boolean) =>
    setEntryStats((prevState) => ({ ...prevState, [statKey]: value }));

  const onPress = () => {
    dispatch({ type: logEntryModel.SAVE_LOG, value: entryStats });
    router.navigate("/(tabs)/stats");
  };

  return (
    <View style={[styles.contents]}>
      <CustomSlider
        name="Mood"
        icon={MOOD_ICON_MAP[entryStats.mood]}
        initVal={entryStats.mood}
        setValue={setStat("mood")}
        colorHighlight={Colors.light.text}
      />
      <CustomSlider
        name="Energy"
        icon={BATTERY_ICON_MAP[entryStats.energy]}
        initVal={entryStats.energy}
        setValue={setStat("energy")}
        colorHighlight={Colors.light.text}
      />
      <CustomSlider
        name="Anxiety"
        icon={ANXIETY_ICON_MAP[entryStats.anxiety]}
        initVal={entryStats.anxiety}
        setValue={setStat("anxiety")}
        colorHighlight={Colors.light.text}
      />
      <CustomCheckbox
        text="Exercise?"
        value={entryStats.exercise}
        setValue={setStat("exercise")}
      />
      <CustomCheckbox
        text="Monthly Cycle?"
        value={entryStats.period}
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
