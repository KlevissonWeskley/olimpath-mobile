import styled from "styled-components/native";
import { FONTS } from "../../constants/fonts";

type TextProps = {
  variant?: "light" | "regular" | "medium" | "semiBold" | "bold";
  color?: string;
  size?: number;
};

const getFont = (variant?: TextProps["variant"]) => {
  switch (variant) {
    case "light":
      return FONTS.lexLight;
    case "medium":
      return FONTS.lexMedium;
    case "semiBold":
      return FONTS.lexSemiBold;
    case "bold":
      return FONTS.lexBold;
    default:
      return FONTS.lexRegular;
  }
};

export const StyledText = styled.Text<TextProps>`
  font-family: ${({ variant }: TextProps) => getFont(variant)};
  font-size: ${({ size }: TextProps) => (size ? `${size}px` : "14px")};
  color: ${({ color }: TextProps) => color || "#000"};
`;
