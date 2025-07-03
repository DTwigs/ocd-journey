import { useThemeColors } from "@/hooks/useThemeColors";
import { Modal, View, TextInput, Pressable, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { AnimatedSpringIcon } from "../AnimatedSpringIcon";

type NotesModalProps = {
  isVisible: boolean;
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
};

export const NotesModal = ({
  isVisible,
  onSave,
  onCancel,
  value,
  onChange,
}: NotesModalProps) => {
  const colors = useThemeColors();

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      presentationStyle="formSheet"
      onRequestClose={onCancel}
      statusBarTranslucent={true}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ThemedText style={styles.sectionHeading}>Add Notes</ThemedText>
        <TextInput
          style={[
            styles.textInput,
            {
              backgroundColor: colors.backgroundTint,
              borderColor: colors.text,
              color: colors.text,
            },
          ]}
          value={value}
          numberOfLines={8}
          editable
          multiline={true}
          returnKeyLabel="done"
          autoFocus={true}
          onChangeText={(text) => onChange(text)}
          placeholder="Write a note about today here..."
        />
        <View style={styles.submitButtonContainer}>
          <Pressable onPress={onCancel}>
            <AnimatedSpringIcon
              size={72}
              icon="close-circle-outline"
              color={colors.text}
            />
          </Pressable>
          <Pressable onPress={onSave}>
            <AnimatedSpringIcon
              size={72}
              icon="check-circle"
              color={colors.text}
            />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 400,
    width: "100%",
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  textInput: {
    padding: 12,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderRadius: 1,
    height: 250,
    width: "80%",
  },
  submitButtonContainer: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
  },
});
