import React from "react";
import { useRouter } from "expo-router";
import {
  Alert,
  Dimensions,
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import * as db from "@/db";
import { useStore } from "@/hooks/useStore";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColors } from "@/hooks/useThemeColors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";

export default function Privacy() {
  const router = useRouter();
  // useTrackScreenView("PrivacyScreen");
  const store = useStore();
  const colors = useThemeColors();

  const onDeleteMyData = () => {
    Alert.alert(
      "Are you sure?",
      "All of your data will be deleted and you will never be able to get it back!",
      [
        {
          text: "No",
          onPress: () => null,
          style: "cancel",
        },
        { text: "Yes", onPress: () => deleteData() },
      ],
      { cancelable: false },
    );
  };

  const deleteData = async () => {
    // await PushNotifications.cancelAllNotifications();
    await db.removeLogEntriesData();
    await db.removeSettingsData();
    store.init();
    router.navigate("/");
  };

  return (
    <ThemedView style={styles.container}>
      <MaterialCommunityIcons
        style={[styles.pageIcon, { color: colors.text }]}
        name="shield-alert"
        size={48}
      />
      <View style={styles.content}>
        <ThemedText style={styles.text}>
          Privacy is extremely important and part of the goal with OCD Journey
          is to only ever use data that is required. There is no personal
          identifiable information stored. We only store your journal entry
          stats and app preferences. If for any reason you want to delete all
          your data stored on the device, you can do so using the "Delete My
          Data" button below. If you have any questions or concerns, please send
          us a message in the Feedback section found in Settings.
        </ThemedText>
      </View>
      <Pressable
        onPress={onDeleteMyData}
        style={[styles.button, { backgroundColor: colors.text }]}
      >
        <MaterialCommunityIcons
          style={[styles.buttonIcon, { color: colors.background }]}
          name="trash-can"
          size={20}
        />
        <Text style={[styles.buttonText, { color: colors.background }]}>
          Delete My Data
        </Text>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  pageIcon: {
    marginTop: 24,
  },
  button: {
    alignItems: "center",
    borderRadius: 1,
    flexDirection: "row",
    height: 60,
    width: "100%",
    justifyContent: "center",
    maxWidth: "60%",
  },
  buttonIcon: {
    paddingRight: 10,
  },
  buttonText: {
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
  },
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 12,
    flexDirection: "column",
    flex: 1,
    width: Dimensions.get("window").width,
  },
  content: {
    marginTop: 24,
    marginBottom: 24,
    padding: 20,
  },
  text: {
    fontSize: 14,
  },
});
