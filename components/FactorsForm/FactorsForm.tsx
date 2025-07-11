import { useState } from "react";
// import { useRouter } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Toast from "react-native-toast-message";

import { AnimatedSpringIcon } from "@/components/AnimatedSpringIcon";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useStore } from "@/hooks/useStore";
import { settingsModel } from "@/models/settings";
import { Factors } from "@/models/settings/type";

export const FactorsForm = () => {
  // const router = useRouter();
  const { settings, dispatch } = useStore();
  const colors = useThemeColors();
  const { factors } = settings;

  const [customFactors, setCustomFactors] = useState<Factors>({
    factor1: { name: factors.factor1.name },
    factor2: { name: factors.factor2.name },
  });

  const setFactor1 = (value: string) =>
    setCustomFactors({
      ...customFactors,
      factor1: { name: value },
    });

  const setFactor2 = (value: string) =>
    setCustomFactors({
      ...customFactors,
      factor2: { name: value },
    });

  const onPress = () => {
    dispatch({ type: settingsModel.SET_FACTORS, value: customFactors });
    Toast.show({
      type: "pixelToast",
      text1: "Saved!",
      position: "bottom",
    });
    // router.navigate("/(tabs)/stats");
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
            <ThemedText style={styles.sectionHeading}>Factors</ThemedText>
            <Text style={[styles.subTitle, { color: colors.lightText }]}>
              Customize your factors by editing the fields below. Factors are
              used to highlight areas on your Stats charts to see how these
              particular factors affect your mood, energy, and anxiety.
              {"\n"}
            </Text>
            <Text style={[styles.subTitle, { color: colors.lightText }]}>
              Examples: Exercise, Period, Migraines, Medication, etc.
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
            value={customFactors.factor1.name}
            placeholder="e.g. Exercise, Period, Travel, Migraine, etc."
            onChangeText={setFactor1}
          />
          <TextInput
            style={[
              styles.textInput,
              {
                backgroundColor: colors.backgroundTint,
                borderColor: colors.text,
                color: colors.text,
              },
            ]}
            value={customFactors.factor2.name}
            placeholder="e.g. Exercise, Period, Travel, Migraine, etc."
            onChangeText={setFactor2}
          />
        </View>

        <View style={styles.submitButtonContainer}>
          <Pressable onPress={onPress}>
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
    // marginBottom: 20,
  },
  subTitle: {
    fontSize: 12,
  },
  textInput: {
    padding: 12,
    borderBottomWidth: 1,
    borderRadius: 1,
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
