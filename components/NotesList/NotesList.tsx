import { ScrollView, StyleSheet } from "react-native";

import { LogEntries } from "@/models/logEntry/type";
import { Router } from "expo-router";
import { createListOfNotes } from "@/utils/notes";
import { NotesListDivider } from "./NotesListDivider";
import { NotesListItem } from "./NotesListItem";

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
    paddingBottom: 150,
  },
});
