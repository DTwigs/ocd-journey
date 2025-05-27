import { StyleSheet, View, Text, Pressable } from "react-native";
import type { Factors } from "@/models/settings/type";

type StatsLegendPropsType = {
  factors: Factors;
  colors: any;
  onPress: (val: number) => void;
  selectedFactor: number;
};

export const StatsLegend = ({
  factors,
  colors,
  onPress,
  selectedFactor,
}: StatsLegendPropsType) => {
  const activeStyle = {
    backgroundColor: colors.backgroundTint,
    borderColor: colors.backgroundTint,
  };

  const inactiveStyle = {
    backgroundColor: colors.background,
    borderColor: colors.backgroundTint,
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => onPress(1)}
        style={[
          styles.legendItem,
          selectedFactor === 1 ? activeStyle : inactiveStyle,
        ]}
      >
        <View
          style={[
            styles.legendDot,
            {
              backgroundColor: colors.tertiary,
            },
          ]}
        />
        <Text
          style={{
            // width: 60,
            height: 16,
            color: colors.lightText,
          }}
        >
          {factors.factor1.name}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => onPress(2)}
        style={[
          styles.legendItem,
          selectedFactor === 2 ? activeStyle : inactiveStyle,
        ]}
      >
        <View
          style={[
            styles.legendDot,
            {
              backgroundColor: colors.secondary,
            },
          ]}
        />
        <Text
          style={{
            // width: 60,
            height: 16,
            color: colors.lightText,
          }}
        >
          {factors.factor2.name}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 18,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 24,
  },
  legendDot: {
    height: 12,
    width: 12,
    borderRadius: 6,
    marginRight: 6,
  },
});
