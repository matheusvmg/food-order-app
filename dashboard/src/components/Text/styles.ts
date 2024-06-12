import styled, { css } from "styled-components";
import { theme } from "@theme/index";
import { EFontSize } from ".";

type GenericTextProps = {
  fontWeight?: keyof typeof EFontSize;
  fontSize: keyof typeof theme.font.size;
  color?: keyof typeof theme.colors;
  textAlign?: string;
  marginTop?: keyof typeof theme.spacing.margin;
  marginleft?: keyof typeof theme.spacing.margin;
  marginRight?: keyof typeof theme.spacing.margin;
  marginBottom?: keyof typeof theme.spacing.margin;
};

const fontWeightVariant = new Map<keyof typeof EFontSize, number>([
  ["extraBlack", 900],
  ["black", 800],
  ["bold", 700],
  ["semiBold", 600],
  ["medium", 500],
  ["regular", 400],
  ["light", 300],
  ["extraLight", 200],
  ["thin", 100],
]);

export const GenericText = styled.p<GenericTextProps>`
  ${({
    theme,
    fontWeight,
    fontSize,
    color,
    textAlign,
    marginTop,
    marginleft,
    marginRight,
    marginBottom,
  }) => css`
    font-weight: ${fontWeightVariant.get(fontWeight ?? "regular")};
    font-size: ${theme.font.size[fontSize]}px;
    color: ${theme.colors[color ?? "white"]};
    text-align: ${textAlign};
    margin-top: ${marginTop ? theme.spacing.margin[marginTop] : 0}px;
    margin-left: ${marginleft ? theme.spacing.margin[marginleft] : 0}px;
    margin-right: ${marginRight ? theme.spacing.margin[marginRight] : 0}px;
    margin-bottom: ${marginBottom ? theme.spacing.margin[marginBottom] : 0}px;
  `};
`;
