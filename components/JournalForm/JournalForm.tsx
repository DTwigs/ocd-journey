import { useState } from "react";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

import { Colors } from "@/constants/Colors";
import { CustomSlider } from "@/components/CustomSlider";
import { CustomCheckbox } from "@/components/CustomCheckbox";
import { AnimatedSpringIcon } from "@/components/AnimatedSpringIcon";
import {
  MOOD_ICON_MAP,
  BATTERY_ICON_MAP,
  ANXIETY_ICON_MAP,
} from "@/constants/JournalIcons";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useStore } from "@/hooks/useStore";
import { logEntryModel } from "@/models/logEntry";
import type {
  LogEntryJournalStats,
  LogEntryFactors,
} from "@/models/logEntry/type";
import { PSEUDO_PAGE_LOAD } from "@/constants/General";

const { formatDateKey } = logEntryModel;

type LogEntryStatsRequired = {
  [P in keyof Required<LogEntryJournalStats>]: number;
} & {
  [K in keyof Required<LogEntryFactors>]: boolean;
};

export const JournalForm = () => {
  const router = useRouter();
  const { logEntries, settings, dispatch } = useStore();
  const colors = useThemeColors();
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
    setTimeout(() => {
      Toast.show({
        type: "pixelToast",
        text1: isNaN(todaysLog?.mood) ? "Saved!" : "Updated!",
        position: "bottom",
      });
      router.navigate("/(tabs)/stats");
    }, PSEUDO_PAGE_LOAD);
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
          <AnimatedSpringIcon
            size={96}
            icon="check-circle"
            color={colors.text}
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
