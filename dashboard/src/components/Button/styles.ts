import styled, { css } from "styled-components";
import { theme } from "@theme/index";

type FilledButtonProps = {
  marginTop?: keyof typeof theme.spacing.margin;
  marginleft?: keyof typeof theme.spacing.margin;
  marginRight?: keyof typeof theme.spacing.margin;
  marginBottom?: keyof typeof theme.spacing.margin;
};

export const FilledButton = styled.button<FilledButtonProps>`
  ${({ theme, marginTop, marginleft, marginRight, marginBottom }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: none;
    border-radius: ${theme.border.radius.sm}px;
    width: 100%;
    color: ${theme.colors.white};
    font-size: ${theme.font.size.xs}px;
    font-weight: 700;
    background-color: ${theme.colors.darkestGreen};
    padding: ${theme.spacing.padding.sm}px;
    margin-top: ${marginTop ? theme.spacing.margin[marginTop] : 0}px;
    margin-left: ${marginleft ? theme.spacing.margin[marginleft] : 0}px;
    margin-right: ${marginRight ? theme.spacing.margin[marginRight] : 0}px;
    margin-bottom: ${marginBottom ? theme.spacing.margin[marginBottom] : 0}px;
  `};
`;
