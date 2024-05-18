import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      white: string;
      lightGray: string;
      lightGreen: string;
      camoGreen: string;
      militaryGreen: string;
      darkGreen: string;
      darkestGreen: string;
    };
    font: {
      size: {
        xxxs: number;
        xxs: number;
        xs: number;
        sm: number;
        lg: number;
        xl: number;
        xxl: number;
        xxxl: number;
      };
    };
    spacing: {
      margin: {
        xxxs: number;
        xxs: number;
        xs: number;
        sm: number;
        lg: number;
        xl: number;
        xxl: number;
        xxxl: number;
      };
      padding: {
        xxxs: number;
        xxs: number;
        xs: number;
        sm: number;
        lg: number;
        xl: number;
        xxl: number;
        xxxl: number;
      };
    };
  }
}
