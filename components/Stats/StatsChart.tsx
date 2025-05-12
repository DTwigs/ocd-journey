import { BarChart } from "react-native-gifted-charts";
import { StyleSheet, View } from "react-native";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { logEntryModel } from "@/models/logEntry";
import type { LogEntries, LogEntryCoreStatName } from "@/models/logEntry/type";

const { getChartDataRange } = logEntryModel;

type StatsChartProps = {
  entries: LogEntries;
  stat: LogEntryCoreStatName;
};

export const StatsChart = ({ entries, stat }: StatsChartProps) => {
  const colorScheme = useColorScheme();
  const { chartData, max } = getChartDataRange(entries, stat);
  // console.log({ chartData, max });

  const chartMax = max % 2 !== 0 ? max + 1 : max;

  return (
    <View style={styles.contents}>
      <BarChart
        data={chartData}
        barWidth={26}
        spacing={12}
        barBorderRadius={4}
        showGradient
        gradientColor={Colors[colorScheme].text}
        xAxisThickness={0}
        xAxisLabelTextStyle={{ color: "gray" }}
        yAxisThickness={0}
        yAxisTextStyle={{ color: "gray" }}
        noOfSections={Math.min(chartMax / 2, 5) || 5}
        maxValue={chartMax}
        frontColor={Colors[colorScheme].lightText}
        isAnimated
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
    // height: "100",
  },
});
