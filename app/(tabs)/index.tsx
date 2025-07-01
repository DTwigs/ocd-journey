import { Pressable, StyleSheet, View } from "react-native";
import { useCallback, useEffect, useRef, useMemo } from "react";
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
  const animatedLevelUpRef = useRef<{ animate: () => void }>();
  const firstLoad = useRef(true);

  const handlePress = useCallback(() => {
    dispatch({ type: logEntryModel.ADD_RESIST });
    dispatch({ type: characterModel.ADD_TOTAL_RESIST });
    animatedPlusExpRef.current?.animate();
  }, [dispatch]);

  const { calculatedLevel, levelPercent } = useMemo(
    () => getLevelProgress(character.level, character.totalResists),
    [character.totalResists, character.level],
  );

  useEffect(() => {
    // First render we do not want to show the level up animation.
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }

    if (calculatedLevel != character.level) {
      setTimeout(() => {
        dispatch({ type: characterModel.LEVEL_UP, value: calculatedLevel });
        animatedLevelUpRef.current?.animate();
      }, 300);
    }
  }, [calculatedLevel, character.level]);

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
        <AnimatedPlusExp
          text="LEVEL UP!"
          color={colors.secondary}
          size={32}
          single={true}
          ref={animatedLevelUpRef}
        />
        <ResistChart />
        <ExperienceBar percent={levelPercent} level={character.level} />
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
