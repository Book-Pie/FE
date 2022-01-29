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
    status: {
      danger: React.CSSProperties["color"];
    };
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
  }
  export interface PaletteOptions {
    mainDarkBrown?: PaletteOptions["primary"];
    mainLightBrown?: PaletteOptions["secondary"];
  }
}

declare module "@mui/material/Button" {
  export interface ButtonPropsColorOverrides {
    mainDarkBrown: true;
    mainLightBrown: true;
  }
}

declare module "@mui/material/Checkbox" {
  export interface CheckboxPropsColorOverrides {
    mainDarkBrown: true;
    mainLightBrown: true;
  }
}
declare module "@mui/material/TextField" {
  export interface TextFieldPropsColorOverrides {
    mainDarkBrown: true;
    mainLightBrown: true;
  }
}
declare module "@mui/material/FormControl" {
  export interface FormControlPropsColorOverrides {
    mainDarkBrown: true;
    mainLightBrown: true;
  }
}
