import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
} from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

type AnimatedSpringIconProps = {
  color: string;
  size: number;
  icon: any;
};

export const AnimatedSpringIcon = ({
  color,
  size,
  icon,
}: AnimatedSpringIconProps) => {
  const animBtnScale = useSharedValue<number>(1);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: animBtnScale.value }],
  }));

  const tap = Gesture.Tap()
    .onBegin(() => {
      animBtnScale.value = withTiming(0.5, { duration: 100 });
    })
    .onFinalize(() => {
      animBtnScale.value = withSpring(1, { damping: 10, stiffness: 350 });
    });

  return (
    <GestureDetector gesture={tap}>
      <Animated.View style={animatedStyles}>
        <MaterialCommunityIcons size={size} name={icon} color={color} />
      </Animated.View>
    </GestureDetector>
  );
};
