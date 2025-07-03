import { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePickerCustom from "@/components/DateTimePickerCustom/index.ios";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  Switch,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import {
  cancelAllNotifications,
  getNotificationsGrantedValue,
  requestNotificationPermissions,
  scheduleDailyLogNotifications,
} from "@/utils/notifications";
import {
  SET_NOTIFICATIONS,
  SET_REMINDER_TIME,
} from "@/models/settings/actions";
import { useStore } from "@/hooks/useStore";
import { useDarkMode } from "@/hooks/useDarkMode";
import { ReminderTime } from "@/models/settings/type";

export const NotificationsForm = () => {
  const { settings, dispatch } = useStore();
  const colors = useThemeColors();
  const isDarkMode = useDarkMode();
  const [allowNotifications, setAllowNotifications] = useState<boolean>(false);

  const checkNotifications = async () => {
    const granted = await getNotificationsGrantedValue();
    setAllowNotifications(granted && settings.allowNotifications);
  };

  useEffect(() => {
    checkNotifications();
  }, []);

  useEffect(() => {
    dispatch({ type: SET_NOTIFICATIONS, value: allowNotifications });
  }, [allowNotifications]);

  const onSwitch = async (value: boolean) => {
    const granted = await getNotificationsGrantedValue();
    setAllowNotifications(granted && value);
    if (granted && value) {
      await requestNotificationPermissions(settings.reminderTime);
    } else {
      await cancelAllNotifications();
    }
  };

  const onTimeChange = (date?: Date) => {
    const hours = date?.getHours() ?? settings.reminderTime.hours;
    const minutes = date?.getMinutes() ?? settings.reminderTime.minutes;
    setAndScheduleNotifications({ hours, minutes });
  };

  const setAndScheduleNotifications = async (time: ReminderTime) => {
    dispatch({ type: SET_REMINDER_TIME, value: time });
    if (allowNotifications) {
      await scheduleDailyLogNotifications(time);
    }
  };

  return (
    <View style={[styles.contents]}>
      <KeyboardAvoidingView
        behavior={Platform.select({ android: undefined, ios: "padding" })}
        keyboardVerticalOffset={Platform.select({ ios: 90, android: 0 })}
        style={styles.avoidingView}
      >
        <View style={styles.formContainer}>
          <View style={styles.notiContainer}>
            <ThemedText type="defaultSemiBold">All Notifications</ThemedText>
            <Switch
              trackColor={{
                false: colors.text,
                true: colors.tertiary,
              }}
              thumbColor={
                allowNotifications ? colors.background : colors.backgroundTint
              }
              ios_backgroundColor={colors.text}
              onValueChange={onSwitch}
              value={allowNotifications}
            />
          </View>
          <ThemedText>
            <MaterialCommunityIcons
              name={allowNotifications ? "bell-ring" : "bell-off"}
              size={28}
              color={allowNotifications ? colors.text : colors.backgroundTint}
            />
            {"   "}
            Notifications are {allowNotifications ? "enabled" : "disabled"}
          </ThemedText>
        </View>
        {allowNotifications && (
          <View style={styles.timePickerContainer}>
            <ThemedText type="defaultSemiBold" style={{ marginBottom: 18 }}>
              Daily Log Reminder Time?
            </ThemedText>
            <DateTimePickerCustom
              mode="time"
              value={
                new Date(
                  2025,
                  6,
                  5,
                  settings.reminderTime.hours,
                  settings.reminderTime.minutes,
                )
              }
              isDarkMode={isDarkMode}
              onChange={onTimeChange}
            />
          </View>
        )}
        {/* <View style={styles.submitButtonContainer}>
          <Pressable onPress={submitFeedback}>
            <AnimatedSpringIcon
              size={96}
              icon="check-circle"
              color={colors.text}
            />
          </Pressable>
        </View> */}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  notiContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    width: "100%",
  },
  contents: {
    flex: 1,
    paddingTop: 48,
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  avoidingView: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  formContainer: {
    width: "80%",
    // flex: 1,
    flexDirection: "column",
    gap: 50,
    justifyContent: "flex-start",
  },
  timePickerContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 120,
  },
});
