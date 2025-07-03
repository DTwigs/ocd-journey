import { StyleSheet, View } from "react-native";
import { format, parseISO } from "date-fns";
import { ThemedText } from "../ThemedText";

type NotesListDividerProps = {
  date: string;
  colors: { [key: string]: any };
};

export const NotesListDivider = ({ date, colors }: NotesListDividerProps) => (
  <View>
    <View
      style={[styles.dividerLine, { borderColor: colors.backgroundTint }]}
    />
    <ThemedText
      type="defaultSemiBold"
      style={[styles.divider, { backgroundColor: colors.background }]}
    >
      {format(parseISO(date), "MMMM yyy")}
    </ThemedText>
  </View>
);

const styles = StyleSheet.create({
  dividerContainer: {
    position: "relative",
    width: "100%",
    paddingVertical: 12,
    justifyContent: "flex-start",
  },
  dividerLine: {
    top: 12,
    left: "-24%",
    height: 1,
    position: "absolute",
    borderBottomWidth: 1,
    width: "75%",
  },
  divider: {
    textAlign: "center",
    paddingHorizontal: 8,
  },
});
