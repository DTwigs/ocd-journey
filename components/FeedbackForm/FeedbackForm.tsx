import { useState } from "react";
import { useRouter } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  Switch,
} from "react-native";
import Toast from "react-native-toast-message";
import * as Sentry from "@sentry/react-native";

import { AnimatedSpringIcon } from "@/components/AnimatedSpringIcon";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";

export const FeedbackForm = () => {
  const router = useRouter();
  // const { settings, dispatch } = useStore();
  const colors = useThemeColors();
  // const { factors } = settings;

  const [feedback, setFeedback] = useState<string>("");
  const [isBug, setBug] = useState<boolean>(false);

  const submitFeedback = () => {
    const message = `${isBug ? "🐛" : "🗣"}: ${feedback}`;
    const userFeedback = {
      name: "Sir Puddington",
      email: "pudding@sir.com",
      message,
    };

    Sentry.captureFeedback(userFeedback);

    Toast.show({
      type: "pixelToast",
      text1: "Submitted! Thank you!",
      position: "bottom",
    });
    setTimeout(() => router.navigate("/settings"), 300);
  };

  return (
    <View style={[styles.contents]}>
      <KeyboardAvoidingView
        behavior={Platform.select({ android: undefined, ios: "padding" })}
        keyboardVerticalOffset={Platform.select({ ios: 90, android: 0 })}
        style={styles.avoidingView}
      >
        <View style={styles.formContainer}>
          <View>
            <ThemedText style={styles.sectionHeading}>
              Leave your feedback!
            </ThemedText>
            <Text style={[styles.subTitle, { color: colors.lightText }]}>
              We'd love to hear from you. Let us know what you think below.
            </Text>
          </View>
          <TextInput
            style={[
              styles.textInput,
              {
                backgroundColor: colors.backgroundTint,
                borderColor: colors.text,
                color: colors.text,
              },
            ]}
            value={feedback}
            numberOfLines={8}
            editable
            multiline={true}
            returnKeyLabel="done"
            onChangeText={(text) => setFeedback(text)}
          />
          <View style={styles.bugContainer}>
            <ThemedText>🐛 Bug?</ThemedText>
            <Switch
              trackColor={{
                false: colors.text,
                true: colors.tertiary,
              }}
              // style={styles.toggle}
              thumbColor={isBug ? colors.background : colors.backgroundTint}
              ios_backgroundColor={colors.text}
              onValueChange={(value: boolean) => {
                setBug(value);
              }}
              value={isBug}
            />
          </View>
        </View>

        <View style={styles.submitButtonContainer}>
          <Pressable onPress={submitFeedback}>
            <AnimatedSpringIcon
              size={96}
              icon="check-circle"
              color={colors.text}
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  bugContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginTop: 10,
    paddingHorizontal: 12,
    width: "100%",
  },
  contents: {
    flex: 1,
    paddingTop: 48,
    // gap: 50,
    flexDirection: "column",
    // alignItems: "flex-start",
    // justifyContent: "space-around",
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
  sectionHeading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 12,
  },
  textInput: {
    padding: 12,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderRadius: 1,
    height: 250,
  },
  submitButtonContainer: {
    // marginTop: 36,
    // width: "100%",
    // flex: 1,
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
