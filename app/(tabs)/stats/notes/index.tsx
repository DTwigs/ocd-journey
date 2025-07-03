import { useRouter } from "expo-router";

import { NotesList } from "@/components/NotesList";
import { useStore } from "@/hooks/useStore";
import { useThemeColors } from "@/hooks/useThemeColors";

const Notes = () => {
  const { logEntries } = useStore();
  const colors = useThemeColors();
  const router = useRouter();

  return <NotesList logEntries={logEntries} colors={colors} router={router} />;
};

export default Notes;
