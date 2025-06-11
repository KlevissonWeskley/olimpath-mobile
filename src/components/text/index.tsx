import { ReactNode } from "react";
import { StyledText } from "./styles";
import { TextStyle } from "react-native";

type TextProps = {
  variant?: "light" | "regular" | "medium" | "semiBold" | "bold"
  color?: string
  size?: number
  children: ReactNode
  style?: TextStyle
}

export function TextBase({ variant, color, size, style, children }: TextProps) {
  return (
    <StyledText variant={variant} color={color} size={size} style={style}>
      {children}
    </StyledText>
  );
}
