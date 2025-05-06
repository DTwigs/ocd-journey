import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import Svg from "react-native-svg";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  withSequence,
  Easing,
  SVGAdapter,
} from "react-native-reanimated";

import { throttle } from "@/utils/throttle";
import { ThemedText } from "@/components/ThemedText";
import { AnimatedCircle } from "@/components/AnimatedCircle";
import ResistChart from "@/components/ResistChart";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

const CIRCLE_ANIM_STEP_1 = 700;
const CIRCLE_ANIM_STEP_2 = 500;
const CIRCLE_ANIM_STEP_3 = 0;

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const circleProps = useSharedValue<number>({ r: 10, stroke: 2 });

  const animateOnPress = () => {
    circleProps.value = withSequence(
      withTiming(
        { stroke: 300, r: 160 },
        { duration: CIRCLE_ANIM_STEP_1, easing: Easing.inOut(Easing.quad) },
      ),
      withTiming({ stroke: 10, r: 300 }, { duration: CIRCLE_ANIM_STEP_2 }),
      withTiming({ stroke: 2, r: 10 }, { duration: CIRCLE_ANIM_STEP_3 }),
    );
  };

  const handlePress = throttle(
    animateOnPress,
    CIRCLE_ANIM_STEP_1 + CIRCLE_ANIM_STEP_2 + CIRCLE_ANIM_STEP_3 + 50,
  );

  const animatedProps = useAnimatedProps(
    () => ({
      r: circleProps.value.r,
      strokeWidth: circleProps.value.stroke,
    }),
    null,
    SVGAdapter,
  );

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: Colors[colorScheme].background },
      ]}
    >
      <View style={styles.contents}>
        <Pressable onPress={handlePress}>
          <MaterialCommunityIcons
            size={128}
            name="arrow-up-bold-circle"
            color={Colors[colorScheme].text}
          />
        </Pressable>
        <ThemedText style={{ color: Colors[colorScheme].lightText }}>
          Press every time you resist a compulsion!
        </ThemedText>
      </View>
      <View style={[styles.chart]}>
        <ResistChart />
      </View>
      <Svg
        height="200%"
        width="100%"
        viewBox="0 0 100 100"
        style={{ position: "absolute", top: "-74%", elevation: 0, zIndex: 0 }}
      >
        <AnimatedCircle
          cx="50"
          cy="50"
          stroke={Colors[colorScheme].tertiary}
          fill="transparent"
          animatedProps={animatedProps}
        />
      </Svg>
    </ScrollView>
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
  },
  chart: {
    flexDirection: "column",
    alignItems: "center",
    elevation: 1,
    zIndex: 1,
  },
});
