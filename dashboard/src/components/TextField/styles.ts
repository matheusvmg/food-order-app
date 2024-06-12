import styled, { css } from "styled-components";
import { theme } from "@theme/index";

type InputProps = {
  marginTop?: keyof typeof theme.spacing.margin;
  marginleft?: keyof typeof theme.spacing.margin;
  marginRight?: keyof typeof theme.spacing.margin;
  marginBottom?: keyof typeof theme.spacing.margin;
  background?: keyof typeof theme.colors;
};

export const Input = styled.input<InputProps>`
  ${({
    theme,
    marginTop,
    marginleft,
    marginRight,
    marginBottom,
    background,
  }) => css`
    border-radius: ${theme.border.radius.sm}px;
    height: ${theme.height.xxl}px;
    width: 100%;
    padding: ${theme.spacing.padding.xs}px;
    margin-top: ${marginTop ? theme.spacing.margin[marginTop] : 0}px;
    margin-left: ${marginleft ? theme.spacing.margin[marginleft] : 0}px;
    margin-right: ${marginRight ? theme.spacing.margin[marginRight] : 0}px;
    margin-bottom: ${marginBottom ? theme.spacing.margin[marginBottom] : 0}px;
    background-color: ${background
      ? theme.colors[background]
      : theme.colors.white};
    font-size: ${theme.font.size.xs}px;
    font-weight: 200;
    color: ${theme.colors.darkestGreen};
    border: none;
    outline: none;
  `};
`;
