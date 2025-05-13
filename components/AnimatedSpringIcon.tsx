import { forwardRef, useImperativeHandle } from "react";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
  withSequence,
  withSpring,
} from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const AnimatedIcon = Animated.createAnimatedComponent(
  MaterialCommunityIcons,
);

type AnimatedSpringIconProps = {
  color: string;
  size: number;
  icon: string;
};

export const AnimatedSpringIcon = forwardRef(
  ({ color, size, icon }: AnimatedSpringIconProps, ref) => {
    const animBtnScale = useSharedValue<number>(1);

    const animatedProps = useAnimatedProps(() => ({
      transform: [{ scale: animBtnScale.value }],
    }));

    useImperativeHandle(ref, () => ({
      animate: () => {
        animBtnScale.value = withSequence(
          withTiming(0.5, { duration: 100 }),
          withSpring(1, { damping: 10, stiffness: 350 }),
        );
      },
    }));

    return (
      <AnimatedIcon
        size={size}
        name={icon}
        color={color}
        animatedProps={animatedProps}
      />
    );
  },
);
