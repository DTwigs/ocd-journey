import * as Notifications from "expo-notifications";

export const initNotifications = async () => {
  const settings = await Notifications.getPermissionsAsync();
  const granted = checkNotificationsAreGranted(settings);

  if (!granted) {
    return false;
  }

  const options = {
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  };

  if (settings.ios) {
    options.shouldShowBanner =
      settings.ios.allowsAlert ?? options.shouldShowBanner;
    options.shouldPlaySound =
      settings.ios.allowsSound ?? options.shouldPlaySound;
    options.shouldSetBadge = settings.ios.allowsBadge ?? options.shouldSetBadge;
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => options,
  });

  return true;
};

const checkNotificationsAreGranted = (
  settings: Notifications.NotificationPermissionsStatus,
) => {
  const granted =
    settings.granted ||
    (settings.ios &&
      settings.ios.status === Notifications.IosAuthorizationStatus.PROVISIONAL);

  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.log("🔒 Notifications Granted?", granted);
  }

  return granted;
};

export const requestNotificationPermissions = async () => {
  const status = await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
    },
  });

  const granted = checkNotificationsAreGranted(status);

  if (!granted) {
    return;
  }

  const scheduledNotis =
    await Notifications.getAllScheduledNotificationsAsync();
  if (scheduledNotis.length > 0) {
    return;
  }

  Notifications.scheduleNotificationAsync({
    content: {
      title: "Daily Journal Time!",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 20,
      minute: 0,
    },
  });
};
