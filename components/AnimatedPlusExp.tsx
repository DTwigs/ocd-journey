import { forwardRef, useImperativeHandle } from "react";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withDelay,
  withTiming,
  withSequence,
} from "react-native-reanimated";
import { useState, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";

type AnimatedPlusExpProps = {
  text: string;
  color: string;
  size?: number;
  single?: boolean;
};

/*
This component is going to create a new element every time you call .animate()
This is so the there can be multiple items animating at the same time.
Pass in "single = true" if you want it to be limited to only one item.
*/
export const AnimatedPlusExp = forwardRef(
  ({ text, color, size, single = false }: AnimatedPlusExpProps, ref) => {
    const [elArray, setElArray] = useState<Array<number>>([]);
    const timeoutRef = useRef<any | null>(null);

    useImperativeHandle(ref, () => ({
      animate: () => {
        if (single) {
          setElArray([1]);
          return;
        }
        const nextKey = (elArray[elArray.length - 1] ?? 0) + 1;
        setElArray([...elArray, nextKey]);
      },
    }));

    useEffect(() => {
      if (elArray.length === 0) {
        return;
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      timeoutRef.current = setTimeout(() => {
        setElArray([]);
        timeoutRef.current = null;
      }, 1000);
    }, [elArray]);

    return (
      <View
        style={{
          position: "absolute",
          overflow: "visible",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {elArray.map((keyNum) => (
          <AnimatedPlusExpChild
            text={text}
            color={color}
            size={size}
            key={keyNum}
          />
        ))}
      </View>
    );
  },
);

const AnimatedPlusExpChild = ({ text, color, size }: AnimatedPlusExpProps) => {
  const animOpacity = useSharedValue<number>(0);
  const animY = useSharedValue<number>(0);

  const animatedProps = useAnimatedProps(() => ({
    opacity: animOpacity.value,
    transform: [{ translateY: animY.value }],
  }));

  useEffect(() => {
    animOpacity.value = withSequence(
      withTiming(1, { duration: 200 }),
      withDelay(500, withTiming(0, { duration: 200 })),
    );
    animY.value = withSequence(
      withTiming(-150, { duration: 900 }),
      withTiming(0, { duration: 0 }),
    );
  }, []);

  return (
    <Animated.View
      // @ts-expect-error: props
      animatedProps={animatedProps}
      style={{ position: "absolute", height: size || 20 }}
    >
      <ThemedText
        style={[styles.text, { color, fontSize: size || 20, lineHeight: size }]}
      >
        {text}
      </ThemedText>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "LcdPhone",
  },
});
