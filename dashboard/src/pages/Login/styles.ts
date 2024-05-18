import styled, { css } from "styled-components";

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: ${theme.colors.white};
  `};
`;
