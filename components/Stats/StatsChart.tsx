import { BarChart } from "react-native-gifted-charts";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Colors } from "@/constants/Colors";
import { INTERVALS } from "@/constants/Dates";
import { CHART_PROPS_BY_INTERVAL } from "@/constants/Chart";
import { useColorScheme } from "@/hooks/useColorScheme";
import { logEntryModel } from "@/models/logEntry";
import type { LogEntries, LogEntryCoreStatName } from "@/models/logEntry/type";

const { getChartDataRange, calculateMovingAverage } = logEntryModel;

type StatsChartProps = {
  entries: LogEntries;
  stat: LogEntryCoreStatName;
  interval: (typeof INTERVALS)[Keys];
  icon: string;
  label: string;
  showXLabel?: boolean;
  selectedFactor?: number;
};

export const StatsChart = ({
  entries,
  stat,
  interval,
  icon,
  label,
  showXLabel = false,
  selectedFactor = 0,
}: StatsChartProps) => {
  const colorScheme = useColorScheme();
  const { chartData, max, lineData } = getChartDataRange(
    entries,
    stat,
    interval,
    0,
    selectedFactor,
  );

  const movingAverageLine = calculateMovingAverage(lineData);

  const ruleDivider = max < 30 ? 5 : 10;
  const chartMax = Math.ceil(max / ruleDivider) * ruleDivider;

  return (
    <View
      style={[
        styles.contents,
        { backgroundColor: Colors[colorScheme].backgroundTint },
      ]}
    >
      <View style={styles.chartIcon}>
        <MaterialCommunityIcons
          size={24}
          name={icon}
          color={Colors[colorScheme].lightText}
        />
        <Text
          style={{
            color: Colors[colorScheme].lightText,
          }}
        >
          {label}
        </Text>
      </View>
      <BarChart
        data={chartData}
        barBorderRadius={1}
        stepHeight={ruleDivider === 10 ? 20 : 30}
        barWidth={CHART_PROPS_BY_INTERVAL[interval].barWidth}
        spacing={CHART_PROPS_BY_INTERVAL[interval].spacing}
        frontColor={Colors[colorScheme].background}
        xAxisThickness={0}
        xAxisColor={Colors[colorScheme].secondary}
        xAxisLabelTextStyle={{
          color: showXLabel ? Colors[colorScheme].lightText : "transparent",
          textAlign: "center",
          overflow: "visible",
        }}
        xAxisLabelsHeight={20}
        yAxisThickness={0}
        yAxisTextStyle={{ color: "transparent" }}
        hideYAxisText
        hideRules
        rulesColor={Colors[colorScheme].backgroundTint}
        noOfSections={chartMax / ruleDivider}
        maxValue={chartMax}
        showLine
        lineData={movingAverageLine}
        lineConfig={{
          curved: true,
          color: Colors[colorScheme].lightText,
          thickness: 3,
          hideDataPoints: true,
          initialSpacing: -1,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contents: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    marginBottom: 6,
    paddingTop: 8,
  },
  chartIcon: {
    flexDirection: "column",
    justifyContents: "center",
    alignItems: "center",
    width: 70,
    minHeight: 34,
    paddingLeft: 8,
  },
});
