import { View, type ViewProps } from "react-native";

import { useThemeColors } from "@/hooks/useThemeColors";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColors().background;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
