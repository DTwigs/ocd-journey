import { forwardRef, useImperativeHandle } from "react";
import { Circle } from "react-native-svg";
import Svg from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  withSequence,
  SVGAdapter,
} from "react-native-reanimated";

export const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CIRCLE_ANIM_STEP_1 = 700;
const CIRCLE_ANIM_STEP_2 = 500;
const CIRCLE_ANIM_STEP_3 = 0;

export const AnimatedCircle = forwardRef(({ color }, ref) => {
  const circleProps = useSharedValue<number>({ r: 10, stroke: 2 });

  const animatedProps = useAnimatedProps(
    () => ({
      r: circleProps.value.r,
      strokeWidth: circleProps.value.stroke,
    }),
    null,
    SVGAdapter,
  );

  useImperativeHandle(ref, () => ({
    animate: () => {
      circleProps.value = withSequence(
        withTiming({ stroke: 300, r: 160 }, { duration: CIRCLE_ANIM_STEP_1 }),
        withTiming({ stroke: 10, r: 300 }, { duration: CIRCLE_ANIM_STEP_2 }),
        withTiming({ stroke: 2, r: 10 }, { duration: CIRCLE_ANIM_STEP_3 }),
      );
    },
  }));

  return (
    <Svg
      height="200%"
      width="100%"
      viewBox="0 0 100 100"
      style={{ position: "absolute", top: "-74%", elevation: 0, zIndex: 0 }}
    >
      <AnimatedCircle
        cx="50"
        cy="50"
        stroke={color}
        fill="transparent"
        animatedProps={animatedProps}
      />
    </Svg>
  );
});
