import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useCallback, useRef } from "react";
import { throttle } from "@/utils/throttle";
import { ThemedText } from "@/components/ThemedText";
import ResistChart from "@/components/ResistChart";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useStore } from "@/hooks/useStore";
import { logEntryModel } from "@/models/logEntry";
import { AnimatedPlusExp } from "@/components/AnimatedPlusExp";
import { AnimatedSpringIcon } from "@/components/AnimatedSpringIcon";

export default function HomeScreen() {
  const { dispatch } = useStore();
  const colors = useThemeColors();
  const animatedPlusExpRef = useRef<{ animate: () => void }>();
  const animatedIconRef = useRef<{ animate: () => void }>();

  const handlePress = useCallback(
    throttle(() => {
      dispatch({ type: logEntryModel.ADD_RESIST });
      animatedIconRef.current?.animate();
      animatedPlusExpRef.current?.animate();
    }, 1000),
    [throttle],
  );

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <View style={styles.contents}>
        <Pressable onPress={handlePress}>
          <AnimatedSpringIcon
            size={128}
            icon="arrow-up-bold-circle"
            color={colors.text}
            ref={animatedIconRef}
          />
        </Pressable>
        <ThemedText style={{ color: colors.lightText }}>
          Press every time you resist a compulsion!
        </ThemedText>
      </View>

      <View style={[styles.chart]}>
        <AnimatedPlusExp
          text="+1 Resist"
          color={colors.tertiary}
          ref={animatedPlusExpRef}
        />
        <ResistChart />
      </View>
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
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    elevation: 1,
    zIndex: 1,
  },
});
