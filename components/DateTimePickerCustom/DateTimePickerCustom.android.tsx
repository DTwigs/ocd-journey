import { useState } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Pressable, StyleSheet } from "react-native";
import { format } from "date-fns";
import { DISPLAY_TIME_FORMAT } from "@/constants/Dates";
import { ThemedText } from "../ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";

type DateTimePickerCustomProps = {
  mode: "date" | "time";
  value: Date;
  isDarkMode?: boolean;
  onChange: (date: Date | undefined) => void;
};

const DateTimePickerCustomAndroid = ({
  mode,
  value,
  isDarkMode,
  onChange,
}: DateTimePickerCustomProps) => {
  const colors = useThemeColors();
  const [date, setDate] = useState(value);

  const _onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    onChange(currentDate);
  };

  const show = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: _onChange,
      mode,
      is24Hour: true,
    });
  };

  return (
    <Pressable
      onPress={show}
      style={[styles.button, { backgroundColor: colors.backgroundTint }]}
    >
      <ThemedText>{format(date, DISPLAY_TIME_FORMAT)}</ThemedText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
});

export default DateTimePickerCustomAndroid;
