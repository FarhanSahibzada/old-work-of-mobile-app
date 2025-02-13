import React, { ReactNode } from "react";
import {
  TouchableOpacity,
  type TouchableOpacityProps,
  StyleSheet,
} from "react-native";
import { ThemedText } from "./ThemedText";

export type ThemedButtonProps = TouchableOpacityProps & {
  bgColor?: string;
  txtColor?: string;
  txt: string;
  mx? : number;
  my? : number;
  icon?: ReactNode;
};

export const ThemedButton = ({
  bgColor,
  txtColor,
  txt,
  mx,
  my,
  icon,
  style,
  ...rest
}: ThemedButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.btnContainer,
        my ? { marginVertical: my } : undefined,
        mx ? { marginHorizontal: mx } : undefined,
        bgColor && { backgroundColor: bgColor },
        style,
      ]}
      {...rest}
      >
      {icon && icon}
      <ThemedText style={{ color: txtColor ? txtColor : "#fff" }}>
        {txt}
      </ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    height: 50,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#359A68",
    flexDirection: "row",
    borderRadius: 7,
  },
});
