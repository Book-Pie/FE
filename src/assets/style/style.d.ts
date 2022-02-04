import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      mainDarkBrown: string;
      mainLightBrown: string;
      white: string;
      darkGrey: string;
      error: string;
      info: string;
      borderColors: {
        0: string;
      };
    };
    media: {
      pc: string;
      tab: string;
      mobile: string;
    };
    shadow: {
      [key: number]: string;
    };
  }
}

declare module "@mui/material/styles" {
  export interface Theme {
    colors: {
      mainDarkBrown: string;
      mainLightBrown: string;
      white: string;
      darkGrey: string;
    };
  }

  export interface ThemeOptions {
    colors: {
      mainDarkBrown: string;
      mainLightBrown: string;
      white: string;
      darkGrey: string;
    };
  }

  export interface Palette {
    mainDarkBrown: Palette["primary"];
    mainLightBrown: Palette["secondary"];
    darkgray: Palette["darkgray"];
  }
  export interface PaletteOptions {
    mainDarkBrown?: PaletteOptions["primary"];
    mainLightBrown?: PaletteOptions["secondary"];
    darkgray?: Palette["darkgray"];
  }
}

declare module "@mui/material" {
  export interface ButtonPropsColorOverrides {
    mainDarkBrown: true;
    mainLightBrown: true;
    darkgray: true;
  }
  export interface PaginationPropsColorOverrides {
    mainDarkBrown: true;
    mainLightBrown: true;
    darkgray: true;
  }
  export interface FormControlPropsColorOverrides {
    mainDarkBrown: true;
    mainLightBrown: true;
    darkgray: true;
  }
  export interface TextFieldPropsColorOverrides {
    mainDarkBrown: true;
    mainLightBrown: true;
    darkgray: true;
  }
  export interface CheckboxPropsColorOverrides {
    mainDarkBrown: true;
    mainLightBrown: true;
    darkgray: true;
  }
}
