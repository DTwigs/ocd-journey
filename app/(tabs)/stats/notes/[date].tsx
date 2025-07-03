import { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import StatsContainer from "@/components/Stats";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { useStore } from "@/hooks/useStore";
import { formatDate, parseISO } from "date-fns";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function NoteStats() {
  const { logEntries } = useStore();
  const navigation = useNavigation();
  const { date } = useLocalSearchParams();
  const colors = useThemeColors();

  useEffect(() => {
    if (date) {
      navigation.setOptions({
        headerTitle: formatDate(parseISO(date.toString()), "MMMM d yyy"),
      });
    }
  }, [date, navigation]);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <View style={styles.quoteContainer}>
        <MaterialCommunityIcons
          name="format-quote-open"
          size={48}
          color={colors.primary}
          style={styles.quoteIcon}
        />
        <ThemedText style={styles.quote}>
          {logEntries.get(date)?.notes}
        </ThemedText>
      </View>
      <StatsContainer startDate={date.toString()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 120,
  },
  quoteContainer: {
    paddingTop: 32,
    gap: 8,
    flexDirection: "row",
    width: "85%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  quoteIcon: {
    marginLeft: -12,
  },
  quote: {
    flexShrink: 1,
    paddingTop: 12,
  },
});
