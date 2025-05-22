import { Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";

type CustomCheckboxProps = {
  text: string;
  value: boolean;
  setValue: (value: boolean) => void;
};

export const CustomCheckbox = ({
  text,
  value,
  setValue,
}: CustomCheckboxProps) => {
  const colors = useThemeColors();

  const onPress = () => {
    setValue(!value);
  };

  return (
    <Pressable onPress={onPress} style={styles.contents}>
      <MaterialCommunityIcons
        size={32}
        name={value ? "checkbox-marked" : "checkbox-blank"}
        color={colors.text}
      />
      <ThemedText style={styles.text}>{text}</ThemedText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  contents: {
    gap: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginLeft: 24,
    marginTop: 8,
    paddingTop: 6,
    paddingBottom: 6,
    paddingRight: 12,
    width: "100%",
  },
  text: {
    alignSelf: "center",
  },
});
