import { useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

type DateTimePickerCustomProps = {
  mode: "date" | "time";
  value: Date;
  isDarkMode: boolean;
  onChange: (date?: Date) => void;
};

const DateTimePickerCustomIOS = ({
  mode = "time",
  value,
  isDarkMode = false,
  onChange,
}: DateTimePickerCustomProps) => {
  const [date, setDate] = useState<Date>(value);

  const _onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate;
    setDate(currentDate ?? new Date());
    onChange(selectedDate);
  };

  return (
    <DateTimePicker
      testID="dateTimePicker"
      value={date}
      mode={mode}
      onChange={_onChange}
      themeVariant={isDarkMode ? "dark" : "light"}
    />
  );
};

export default DateTimePickerCustomIOS;
