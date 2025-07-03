import { useLocalSearchParams, useRouter } from "expo-router";

import { useStore } from "@/hooks/useStore";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Text } from "react-native";

const Notes = () => {
  const { date } = useLocalSearchParams();
  const { logEntries } = useStore();
  const colors = useThemeColors();
  const router = useRouter();

  return <Text>{logEntries.get(date)?.notes}</Text>;
};

export default Notes;
