import { StyleSheet, View, Text, Pressable } from "react-native";
import type { Factors } from "@/model/settings/type";

type StatsLegendPropsType = {
  factors: Factors;
  colors: any;
  onPress: (val: number) => void;
};

export const StatsLegend = ({
  factors,
  colors,
  onPress,
}: StatsLegendPropsType) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => onPress(1)} style={styles.legendItem}>
        <View
          style={[
            styles.legendPill,
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
      <Pressable onPress={() => onPress(2)} style={styles.legendItem}>
        <View
          style={[
            styles.legendPill,
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
  },
  legendPill: {
    height: 12,
    width: 12,
    borderRadius: 6,
    marginRight: 6,
  },
});
