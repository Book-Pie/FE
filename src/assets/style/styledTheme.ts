import { DefaultTheme } from "styled-components";
import { Colors } from "./global";

const Size = {
  pc: "75em", // 1200px
  mobile: "31.25em", // 500px
};

const theme: DefaultTheme = {
  colors: {
    mainDarkBrown: Colors.MAINDARK_BROWN,
    mainLightBrown: Colors.MAINLIGHT_BROWN,
    white: Colors.WHITE,
    darkGrey: Colors.DARK_GREY,
  },
  media: {
    pc: `@media screen and (max-width: ${Size.pc})`,
    mobile: `@media screen and (max-width: ${Size.mobile})`,
  },
};

export default theme;
