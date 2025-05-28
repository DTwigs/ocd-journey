import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { useThemeColors } from "@/hooks/useThemeColors";
import { ThemedText } from "./ThemedText";

export const ExperienceBar = ({
  percent,
  level,
}: {
  percent: number;
  level: number;
}) => {
  const colors = useThemeColors();
  const animExpPct = useSharedValue<number>(0);

  useEffect(() => {
    animExpPct.value = withTiming(percent, { duration: 200 });
  }, [percent]);

  const animatedStyles = useAnimatedStyle(() => ({
    // @ts-expect-error: it works
    width: animExpPct.value + "%",
  }));

  return (
    <View style={styles.experienceBarContainer}>
      <View style={[styles.experienceBar, { borderColor: colors.text }]}>
        <Animated.View
          style={[
            styles.currentExperience,
            { backgroundColor: colors.text },
            // @ts-expect-error: animatedStyles
            animatedStyles,
          ]}
        ></Animated.View>
      </View>
      <ThemedText>Lv. {level}</ThemedText>
    </View>
  );
};

const EXP_BAR_WIDTH = 250;

const styles = StyleSheet.create({
  experienceBarContainer: {
    marginTop: 2,
    width: EXP_BAR_WIDTH,
  },
  experienceBar: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderWidth: 2,
    height: 12,
    borderRadius: 1,
    paddingHorizontal: 1,
    width: EXP_BAR_WIDTH,
  },
  currentExperience: {
    height: 6,
    maxWidth: EXP_BAR_WIDTH,
    borderRadius: 1,
  },
});
