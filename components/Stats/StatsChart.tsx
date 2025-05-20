import { useEffect, useState } from "react";
import { BarChart } from "react-native-gifted-charts";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Colors } from "@/constants/Colors";
import { INTERVALS } from "@/constants/Dates";
import { CHART_PROPS_BY_INTERVAL } from "@/constants/Chart";
import { useColorScheme } from "@/hooks/useColorScheme";
import { logEntryModel } from "@/models/logEntry";
import type { LogEntries, LogEntryStatName } from "@/models/logEntry/type";

const { asyncGetChartDataRange, updateChartDataWithFactorColor } =
  logEntryModel;

type StatsChartProps = {
  entries: LogEntries;
  stat: LogEntryStatName;
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
  const [chartState, setChartState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    init();
  }, [interval, entries]);

  useEffect(() => {
    if (chartState) {
      const newChartData = updateChartDataWithFactorColor(
        chartState.chartData,
        selectedFactor,
      );
      setChartState({ ...chartState, chartData: newChartData });
    }
  }, [selectedFactor]);

  const init = async () => {
    setIsLoading(true);
    const { chartData, lineData } = await asyncGetChartDataRange(
      entries,
      stat,
      interval,
      0,
      selectedFactor,
    );
    setChartState({ chartData, lineData });
    setIsLoading(false);
  };

  const RULE_DIVIDER = 5;
  const CHART_MAX = 10;

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
      {isLoading || !chartState ? (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: 88,
          }}
        >
          <ActivityIndicator
            size="small"
            color={Colors[colorScheme].lightText}
          />
        </View>
      ) : (
        <BarChart
          data={chartState.chartData}
          barBorderRadius={1}
          stepHeight={30}
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
          noOfSections={CHART_MAX / RULE_DIVIDER}
          maxValue={CHART_MAX}
          showLine
          lineData={chartState.lineData}
          lineConfig={{
            curved: true,
            color: Colors[colorScheme].lightText,
            thickness: 3,
            hideDataPoints: true,
            initialSpacing: -1,
          }}
        />
      )}
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
