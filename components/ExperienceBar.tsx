import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { useThemeColors } from "@/hooks/useThemeColors";

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
    width: animExpPct.value + "%",
  }));

  return (
    <View style={styles.experienceBarContainer}>
      <View style={[styles.experienceBar, { borderColor: colors.text }]}>
        <Animated.View
          style={[
            styles.currentExperience,
            { backgroundColor: colors.text },
            animatedStyles,
          ]}
        ></Animated.View>
      </View>
      <Text>Lv. {level}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  experienceBarContainer: {
    marginTop: 2,
    width: 242,
  },
  experienceBar: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderWidth: 2,
    height: 12,
    borderRadius: 1,
    paddingHorizontal: 1,
    width: 242,
  },
  currentExperience: {
    height: 6,
    maxWidth: 242,
    borderRadius: 1,
  },
});
