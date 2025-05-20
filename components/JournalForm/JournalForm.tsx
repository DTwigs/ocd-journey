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
import type {
  LogEntryJournalStats,
  LogEntryFactors,
} from "@/models/logEntry/type";

const { formatDateKey } = logEntryModel;

type LogEntryStatsRequired = {
  [P in keyof Required<LogEntryJournalStats>]: number;
} & {
  [K in keyof Required<LogEntryFactors>]: boolean;
};

export const JournalForm = () => {
  const router = useRouter();
  const { logEntries, settings, dispatch } = useStore();
  const colorScheme = useColorScheme();
  const { factors } = settings;

  // prefill journal values if journal entry already exists
  const today = formatDateKey(new Date());
  const todaysLog = logEntries?.get(today);

  const [entryStats, setEntryStats] = useState<LogEntryStatsRequired>({
    mood: todaysLog?.mood ?? 5,
    energy: todaysLog?.energy ?? 5,
    anxiety: todaysLog?.anxiety ?? 5,
    factor1: todaysLog?.factor1 ?? false,
    factor2: todaysLog?.factor2 ?? false,
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
        text={`${factors.factor1.name}?`}
        value={entryStats.factor1}
        setValue={setStat("factor1")}
      />
      <CustomCheckbox
        text={`${factors.factor2.name}?`}
        value={entryStats.factor2}
        setValue={setStat("factor2")}
      />
      <View style={styles.submitButtonContainer}>
        <Pressable onPress={onPress}>
          <MaterialCommunityIcons
            size={96}
            name="check-circle"
            color={Colors[colorScheme ?? "light"].text}
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
