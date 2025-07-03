import { useEffect, useState } from "react";
import { BarChart } from "react-native-gifted-charts";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { INTERVALS } from "@/constants/Dates";
import { CHART_PROPS_BY_INTERVAL } from "@/constants/Chart";
import { useThemeColors } from "@/hooks/useThemeColors";
import { logEntryModel } from "@/models/logEntry";
import type {
  LogEntries,
  LogEntryStatName,
  ChartDatum,
  LineDatum,
} from "@/models/logEntry/type";
import { Loader } from "../Loader";
import { formatDateKey } from "@/models/logEntry/selectors";
import { subDays } from "date-fns";

const { asyncGetChartDataRange, updateChartDataWithFactorColor } =
  logEntryModel;

type IntervalKeys = keyof typeof INTERVALS;

type StatsChartProps = {
  startDate?: string;
  entries: LogEntries;
  stat: LogEntryStatName;
  interval: (typeof INTERVALS)[IntervalKeys];
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  showXLabel?: boolean;
  selectedFactor?: number;
};

type ChartState = {
  chartData: ChartDatum[];
  lineData: LineDatum[];
} | null;

export const StatsChart = ({
  startDate,
  entries,
  stat,
  interval,
  icon,
  label,
  showXLabel = false,
  selectedFactor = 0,
}: StatsChartProps) => {
  const colors = useThemeColors();
  const [chartState, setChartState] = useState<ChartState>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isNotesView = !!startDate;

  useEffect(() => {
    init();
  }, [interval, entries]);

  useEffect(() => {
    if (chartState) {
      const newChartData = updateChartDataWithFactorColor(
        chartState.chartData,
        selectedFactor,
        isNotesView,
      );
      setChartState({ ...chartState, chartData: newChartData });
    }
  }, [selectedFactor]);

  // async to provide loading indicators on slow phones.
  const init = async () => {
    setIsLoading(true);
    const { chartData, lineData } = await asyncGetChartDataRange(
      entries,
      stat,
      interval,
      startDate ?? formatDateKey(subDays(new Date(), interval - 1)), //formatDateKey(new Date()), , // start from today
      selectedFactor,
      isNotesView,
    );
    setChartState({ chartData, lineData });
    setIsLoading(false);
  };

  const RULE_DIVIDER = 5;
  const CHART_MAX = 10;

  return (
    <View style={[styles.contents, { backgroundColor: colors.backgroundTint }]}>
      <View style={styles.chartIcon}>
        <MaterialCommunityIcons
          size={24}
          name={icon}
          color={colors.lightText}
        />
        <Text
          style={{
            color: colors.lightText,
          }}
        >
          {label}
        </Text>
      </View>
      {isLoading || !chartState ? (
        <Loader colors={colors} />
      ) : (
        <BarChart
          data={chartState.chartData}
          barBorderRadius={1}
          stepHeight={30}
          barWidth={CHART_PROPS_BY_INTERVAL[interval].barWidth}
          spacing={CHART_PROPS_BY_INTERVAL[interval].spacing}
          frontColor={colors.background}
          xAxisThickness={0}
          xAxisColor={colors.secondary}
          xAxisLabelTextStyle={{
            color: showXLabel ? colors.lightText : "transparent",
            textAlign: "center",
            overflow: "visible",
          }}
          xAxisLabelsHeight={20}
          yAxisThickness={0}
          yAxisTextStyle={{ color: "transparent" }}
          hideYAxisText
          hideRules
          rulesColor={colors.backgroundTint}
          noOfSections={CHART_MAX / RULE_DIVIDER}
          maxValue={CHART_MAX}
          showLine
          lineData={chartState.lineData}
          lineConfig={{
            curved: true,
            color: colors.lightText,
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
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    minHeight: 34,
    paddingLeft: 8,
  },
});
