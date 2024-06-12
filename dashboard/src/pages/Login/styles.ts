import styled, { css } from "styled-components";

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: ${theme.spacing.margin.lg}px;
    @media (max-width: 980px) {
      margin: ${theme.spacing.margin.sm}px;
    }
  `};
`;

export const Carrousel = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 624px;
    border-radius: 24px;
    background-color: ${theme.colors.darkGreen};
    padding-bottom: 143.29px;
    padding-top: 101px;

    @media (max-width: 980px) {
      display: none;
    }
  `};
`;

export const Image = styled.img`
  ${() => css`
    height: 304.71px;
    width: 480px;
  `};
`;

export const Fields = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-left: ${theme.spacing.margin.lg}px;
    @media (max-width: 980px) {
      margin-left: 0px;
    }
  `};
`;

export const SignUpLinkContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: row;
    align-self: flex-end;
    align-items: center;
    justify-content: center;
  `};
`;

export const SignUpLink = styled.a`
  ${({ theme }) => css`
    text-decoration-color: ${theme.colors.darkestGreen};
  `};
`;
