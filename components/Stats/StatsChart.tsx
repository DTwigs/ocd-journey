import { BarChart } from "react-native-gifted-charts";
import { StyleSheet, View } from "react-native";

import { Colors } from "@/constants/Colors";
import { INTERVALS } from "@/constants/Dates";
import { CHART_PROPS_BY_INTERVAL } from "@/constants/Chart";
import { useColorScheme } from "@/hooks/useColorScheme";
import { logEntryModel } from "@/models/logEntry";
import type { LogEntries, LogEntryCoreStatName } from "@/models/logEntry/type";

const { getChartDataRange } = logEntryModel;

type StatsChartProps = {
  entries: LogEntries;
  stat: LogEntryCoreStatName;
  interval: (typeof INTERVALS)[Keys];
};

export const StatsChart = ({ entries, stat, interval }: StatsChartProps) => {
  const colorScheme = useColorScheme();
  const { chartData, max } = getChartDataRange(entries, stat, interval);

  const ruleDivider = max < 30 ? 5 : 10;
  const chartMax = Math.ceil(max / ruleDivider) * ruleDivider;

  return (
    <View style={styles.contents}>
      <BarChart
        stackData={chartData}
        barWidth={CHART_PROPS_BY_INTERVAL[interval].barWidth}
        spacing={CHART_PROPS_BY_INTERVAL[interval].spacing}
        frontColor={Colors[colorScheme].lightText}
        xAxisThickness={0}
        xAxisLabelTextStyle={{
          color: "gray",
          textAlign: "center",
          overflow: "visible",
        }}
        yAxisThickness={0}
        yAxisTextStyle={{ color: "gray" }}
        noOfSections={chartMax / ruleDivider}
        maxValue={chartMax}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contents: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    padding: 20,
  },
});
