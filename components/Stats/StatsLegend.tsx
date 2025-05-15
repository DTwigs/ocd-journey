import { StyleSheet, View, Text, Pressable } from "react-native";

export const StatsLegend = ({ colors, onPress }) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => onPress(2)} style={styles.legendItem}>
        <View
          style={{
            height: 12,
            width: 12,
            borderRadius: 6,
            backgroundColor: colors.tertiary,
            marginRight: 6,
          }}
        />
        <Text
          style={{
            // width: 60,
            height: 16,
            color: colors.lightText,
          }}
        >
          Exercise
        </Text>
      </Pressable>
      <Pressable onPress={() => onPress(1)} style={styles.legendItem}>
        <View
          style={{
            height: 12,
            width: 12,
            borderRadius: 6,
            backgroundColor: colors.secondary,
            marginRight: 6,
          }}
        />
        <Text
          style={{
            // width: 60,
            height: 16,
            color: colors.lightText,
          }}
        >
          Mo. Cycle
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 18,
    // marginTop: 24,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
});
