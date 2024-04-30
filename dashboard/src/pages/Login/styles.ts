import styled, { css } from "styled-components";
import { cyan } from "@ant-design/colors";

export const Background = styled.div`
  ${() => css`
    background-color: ${cyan[7]};
    width: 50vw;
    height: 100vh;
  `};
`;

export const Container = styled.div`
  ${() => css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `};
`;
