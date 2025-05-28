import { forwardRef, useImperativeHandle } from "react";
import { Circle } from "react-native-svg";
import Svg from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  withSequence,
} from "react-native-reanimated";

export const AnimatedCircleComponent = Animated.createAnimatedComponent(Circle);

const CIRCLE_ANIM_STEP_1 = 700;
const CIRCLE_ANIM_STEP_2 = 500;
const CIRCLE_ANIM_STEP_3 = 0;

export const AnimatedCircle = forwardRef(
  ({ color }: { color: string }, ref) => {
    const circleProps = useSharedValue({ r: 0, stroke: 0 });

    const animatedProps = useAnimatedProps(() => ({
      r: circleProps.value.r,
      strokeWidth: circleProps.value.stroke,
    }));

    useImperativeHandle(ref, () => ({
      animate: () => {
        circleProps.value = withSequence(
          withTiming({ stroke: 200, r: 100 }, { duration: CIRCLE_ANIM_STEP_1 }),
          withTiming({ stroke: 10, r: 200 }, { duration: CIRCLE_ANIM_STEP_2 }),
          withTiming({ stroke: 0, r: 0 }, { duration: CIRCLE_ANIM_STEP_3 }),
        );
      },
    }));

    return (
      <Svg
        height="200%"
        width="100%"
        viewBox="0 0 100 100"
        style={{ position: "absolute", top: "-50%", elevation: 0, zIndex: 0 }}
      >
        <AnimatedCircleComponent
          cx="50"
          cy="50"
          stroke={color}
          fill="transparent"
          animatedProps={animatedProps}
        />
      </Svg>
    );
  },
);
