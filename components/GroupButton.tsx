import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const GroupButton = ({ items, colors, selected }) => {
  const buildGroupButtons = () => {
    return items.map(({ icon, label, onPress }, index) => {
      const isSelected = label === selected;
      const buttonStyles = [
        styles.buttonGroupBtn,
        {
          backgroundColor: colors.text,
          color: colors.background,
        },
      ];

      if (index === 0 || index === items.length - 1) {
        buttonStyles.push(index === 0 ? styles.firstButton : styles.lastButton);
      }

      if (isSelected) {
        buttonStyles.push({
          backgroundColor: colors.secondary,
          color: colors.text,
        });
      }

      return (
        <Pressable onPress={onPress} key={label} style={buttonStyles}>
          <MaterialCommunityIcons
            size={18}
            name={icon}
            color={isSelected ? colors.text : colors.background}
          />
          <Text
            style={{
              color: isSelected ? colors.text : colors.background,
              fontWeight: "bold",
            }}
          >
            {label}
          </Text>
        </Pressable>
      );
    });
  };

  return <View style={styles.buttonGroup}>{buildGroupButtons()}</View>;
};

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: "row",
    justifyContents: "center",
    alignItems: "center",
  },
  buttonGroupBtn: {
    flexDirection: "column",
    justifyContents: "center",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  firstButton: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  lastButton: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
});
