import { Pressable, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useThemeColors } from "@/hooks/useThemeColors";

type IconToggleProps = {
  icon1?: any;
  icon2?: any;
  value: boolean;
  setValue: (value: boolean) => void;
};

export const IconToggle = ({
  icon1,
  icon2,
  value,
  setValue,
}: IconToggleProps) => {
  const colors = useThemeColors();

  const onPress = () => {
    setValue(!value);
  };

  const activeBG = { backgroundColor: colors.background };
  const inactiveBG = { backgroundColor: colors.text };

  return (
    <Pressable onPress={onPress} style={[styles.contents, inactiveBG]}>
      <View style={[styles.icon, value ? activeBG : inactiveBG]}>
        {icon1 && (
          <MaterialCommunityIcons
            size={24}
            name={icon1}
            color={value ? colors.text : colors.background}
          />
        )}
      </View>
      <View style={[styles.icon, value ? inactiveBG : activeBG]}>
        {icon2 && (
          <MaterialCommunityIcons
            size={24}
            name={icon2}
            color={value ? colors.background : colors.text}
          />
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  contents: {
    // gap: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: 80,
    borderRadius: 2,
  },
  icon: {
    width: 34,
    height: 34,
    margin: 3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
  },
  text: {
    alignSelf: "center",
  },
});
