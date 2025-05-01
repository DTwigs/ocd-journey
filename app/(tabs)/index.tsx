import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  withSequence,
  Easing,
} from "react-native-reanimated";

import { throttle } from "@/utils/throttle";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { AnimatedCircle } from "@/components/AnimatedCircle";
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
        { duration: CIRCLE_ANIM_STEP_1, easing: Easing.inOut(Easing.quad) }
      ),
      withTiming({ stroke: 10, r: 300 }, { duration: CIRCLE_ANIM_STEP_2 }),
      withTiming({ stroke: 2, r: 10 }, { duration: CIRCLE_ANIM_STEP_3 })
    );
  };

  const handlePress = throttle(
    animateOnPress,
    CIRCLE_ANIM_STEP_1 + CIRCLE_ANIM_STEP_2 + CIRCLE_ANIM_STEP_3 + 50
  );

  const animatedProps = useAnimatedProps(() => ({
    r: circleProps.value.r,
    strokeWidth: circleProps.value.stroke,
  }));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedView style={styles.contents}>
        <Pressable onPress={handlePress} style={{ elevation: 1, zIndex: 1 }}>
          <MaterialCommunityIcons
            size={128}
            name="arrow-up-bold-circle"
            color={Colors[colorScheme].text}
          />
        </Pressable>
      </ThemedView>
      <Svg
        height="200%"
        width="100%"
        viewBox="0 0 100 100"
        style={{ position: "absolute", top: "-74%", elevation: 0, zIndex: 0 }}
      >
        {/* <Circle
          cx="50"
          cy="50"
          stroke={Colors[colorScheme].text}
          fill={Colors[colorScheme].background}
          r={120}
          strokeWidth={10}
        /> */}
        <AnimatedCircle
          cx="50"
          cy="50"
          stroke={Colors[colorScheme].text}
          fill={Colors[colorScheme].background}
          animatedProps={animatedProps}
        />
      </Svg>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contents: {
    flex: 1,
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "33%",
  },
});
