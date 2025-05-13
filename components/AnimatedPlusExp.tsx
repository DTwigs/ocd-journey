import { forwardRef, useImperativeHandle } from "react";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withDelay,
  withTiming,
  withSequence,
} from "react-native-reanimated";
import { StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";

type AnimatedPlusExpProps = {
  text: string;
};

export const AnimatedPlusExp = forwardRef(
  ({ text }: AnimatedPlusExpProps, ref) => {
    const animOpacity = useSharedValue<number>(0);
    const animY = useSharedValue<number>(0);

    const animatedProps = useAnimatedProps(() => ({
      opacity: animOpacity.value,
      transform: [{ translateY: animY.value }],
    }));

    useImperativeHandle(ref, () => ({
      animate: () => {
        animOpacity.value = withSequence(
          withTiming(1, { duration: 200 }),
          withDelay(500, withTiming(0, { duration: 200 })),
        );
        animY.value = withSequence(
          withTiming(-150, { duration: 1000 }),
          withTiming(0, { duration: 0 }),
        );
      },
    }));

    return (
      <Animated.View animatedProps={animatedProps}>
        <ThemedText style={styles.text}>{text}</ThemedText>
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  text: {
    fontFamily: "LcdPhone",
    fontSize: 16,
  },
});
