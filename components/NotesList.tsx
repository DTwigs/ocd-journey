import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { LogEntries } from "@/models/logEntry/type";
import { Router } from "expo-router";
import { format, parseISO } from "date-fns";
import { ThemedText } from "./ThemedText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createListOfNotes } from "@/utils/notes";

type NotesListProps = {
  logEntries: LogEntries;
  colors: { [key: string]: any };
  router: Router;
};

export const NotesList = ({ logEntries, colors, router }: NotesListProps) => {
  const notesList = createListOfNotes(logEntries);

  const navigateToDetails = (date: string) => {
    router.navigate(`/(tabs)/stats/notes/${date}`);
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      {notesList.map((item) => {
        if (item.type === "divider") {
          return (
            <View key={`${item.date}-divider`}>
              <View
                style={[
                  styles.dividerLine,
                  { borderColor: colors.backgroundTint },
                ]}
              />
              <ThemedText
                type="defaultSemiBold"
                style={[styles.divider, { backgroundColor: colors.background }]}
              >
                {format(parseISO(item.date), "MMMM yyy")}
              </ThemedText>
            </View>
          );
        }
        return (
          <Pressable
            style={styles.noteItem}
            onPress={() => navigateToDetails(item.date)}
            key={item.date}
          >
            <MaterialCommunityIcons
              name="note-outline"
              size={22}
              color={colors.backgroundTint}
            />
            <ThemedText type="defaultSemiBold">
              {format(parseISO(item.date), "MMM dd")}
            </ThemedText>
            <ThemedText style={{ flexShrink: 1 }}>{item.notes}</ThemedText>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 22,
    width: "100%",
    paddingBottom: 150,
  },
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
  noteItem: {
    gap: 12,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingVertical: 8,
  },
});
