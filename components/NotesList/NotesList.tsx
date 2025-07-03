import { ScrollView, StyleSheet, View } from "react-native";

import { LogEntries } from "@/models/logEntry/type";
import { Link, Router } from "expo-router";
import { createListOfNotes } from "@/utils/notes";
import { NotesListDivider } from "./NotesListDivider";
import { NotesListItem } from "./NotesListItem";
import { ThemedText } from "../ThemedText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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

  if (notesList.length <= 0) {
    return (
      <View style={[styles.emptyNotes, { backgroundColor: colors.background }]}>
        <MaterialCommunityIcons
          name="note-outline"
          size={80}
          color={colors.backgroundTint}
        />
        <ThemedText
          type="defaultSemiBold"
          style={[styles.emptyNotesText, { color: colors.text }]}
        >
          You have not created any notes yet. Add notes to your{" "}
          <Link href="/(tabs)/journal" style={{ color: colors.primary }}>
            Journal
          </Link>{" "}
          to see them here.
        </ThemedText>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <ThemedText style={{ fontSize: 12, paddingVertical: 12 }}>
        Tap on each note to learn more about how it affected you.
      </ThemedText>
      {notesList.map((item) => {
        if (item.type === "divider") {
          return (
            <NotesListDivider
              date={item.date}
              colors={colors}
              key={`${item.date}-divider`}
            />
          );
        }
        return (
          <NotesListItem
            date={item.date}
            notes={item.notes}
            onPress={navigateToDetails}
            colors={colors}
            key={item.date}
          />
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
    minHeight: "100%",
    paddingBottom: 150,
  },
  emptyNotes: {
    flex: 1,
    paddingTop: 80,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  emptyNotesText: {
    paddingTop: 20,
    width: "80%",
    textAlign: "center",
  },
});
