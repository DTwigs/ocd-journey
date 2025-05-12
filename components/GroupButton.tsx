import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const GroupButton = ({ items, colors, selected }) => {
  const buildGroupButtons = () => {
    return items.map(({ icon, value, label, onPress }, index) => {
      const isSelected = value === selected;
      const buttonStyles = [
        styles.buttonGroupBtn,
        {
          backgroundColor: colors.backgroundTint,
          color: colors.text,
        },
      ];

      if (index === 0 || index === items.length - 1) {
        buttonStyles.push(index === 0 ? styles.firstButton : styles.lastButton);
      }

      if (isSelected) {
        buttonStyles.push({
          backgroundColor: colors.lightText, //colors.background,
          color: colors.background,
        });
      }

      return (
        <Pressable onPress={onPress} key={label} style={buttonStyles}>
          {icon && (
            <MaterialCommunityIcons
              size={18}
              name={icon}
              color={isSelected ? colors.background : colors.text}
            />
          )}
          <Text
            style={{
              color: isSelected ? colors.background : colors.text,
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
    width: 80,
    minHeight: 34,
    paddingVertical: 8,
    borderRightWidth: 1,
    borderRightColor: "#EFE9E7",
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
