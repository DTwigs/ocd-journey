import { Pressable, StyleSheet, View } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import ResistChart from "@/components/ResistChart";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useStore } from "@/hooks/useStore";
import { logEntryModel } from "@/models/logEntry";
import { AnimatedPlusExp } from "@/components/AnimatedPlusExp";
import { AnimatedSpringIcon } from "@/components/AnimatedSpringIcon";
import { ExperienceBar } from "@/components/ExperienceBar";
import { characterModel } from "@/models/character";
import { getLevelProgress } from "@/models/character/selectors";

export default function HomeScreen() {
  const { character, dispatch } = useStore();
  const colors = useThemeColors();
  const animatedPlusExpRef = useRef<{ animate: () => void }>();
  const [experiencePct, setExperiencePct] = useState<number>(0);
  const loadCount = useRef(0);

  const handlePress = useCallback(() => {
    dispatch({ type: logEntryModel.ADD_RESIST });
    dispatch({ type: characterModel.ADD_TOTAL_RESIST });
  }, [dispatch]);

  useEffect(() => {
    const { calculatedLevel, levelPercent } = getLevelProgress(
      character.level,
      character.totalResists,
    );

    setExperiencePct(levelPercent);

    if (loadCount.current === 0 || loadCount.current === 1) {
      loadCount.current += 1;
      return;
    }

    if (calculatedLevel != character.level) {
      setTimeout(() => {
        dispatch({ type: characterModel.LEVEL_UP, value: calculatedLevel });
        // animatedCircleRef.current?.animate(); /
      }, 300);
    }

    animatedPlusExpRef.current?.animate();
  }, [character.totalResists, character.level]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.contents}>
        <Pressable onPress={handlePress}>
          <AnimatedSpringIcon
            size={128}
            icon="arrow-up-bold-circle"
            color={colors.text}
          />
        </Pressable>

        <ThemedText style={{ color: colors.lightText }}>
          Press every time you resist a compulsion!
        </ThemedText>
      </View>

      <View style={[styles.chart]}>
        <AnimatedPlusExp
          text="+1 Resist"
          color={colors.tertiary}
          ref={animatedPlusExpRef}
        />
        <ResistChart />
        <ExperienceBar percent={experiencePct} level={character.level} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  contents: {
    flexDirection: "column",
    alignItems: "center",
    elevation: 1,
    zIndex: 1,
    overflow: "visible",
  },
  chart: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    elevation: 1,
    zIndex: 1,
  },
});
