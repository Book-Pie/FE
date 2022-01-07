import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      mainDarkBrown: string;
      mainLightBrown: string;
      white: string;
      DarkGrey: string;
    };
  }
}
