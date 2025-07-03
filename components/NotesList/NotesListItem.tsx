import { Pressable, StyleSheet } from "react-native";
import { format, parseISO } from "date-fns";
import { ThemedText } from "../ThemedText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type NotesListItemProps = {
  date: string;
  notes: string | null | undefined;
  onPress: (date: string) => void;
  colors: { [key: string]: any };
};

export const NotesListItem = ({
  date,
  notes,
  onPress,
  colors,
}: NotesListItemProps) => (
  <Pressable style={styles.noteItem} onPress={() => onPress(date)}>
    <MaterialCommunityIcons
      name="note-outline"
      size={22}
      color={colors.primary}
    />
    <ThemedText type="defaultSemiBold">
      {format(parseISO(date), "MMM dd")}
    </ThemedText>
    <ThemedText style={{ flexShrink: 1 }}>{notes}</ThemedText>
  </Pressable>
);

const styles = StyleSheet.create({
  noteItem: {
    gap: 12,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingVertical: 12,
  },
});
