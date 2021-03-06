import { DefaultTheme } from "styled-components";
import { Colors } from "./global";

const Size = {
  pc: "75em", // 1200px
  tab: "56.25em", // 900px
  mobile: "31.25em", // 500px
};

const theme: DefaultTheme = {
  colors: {
    mainDarkBrown: Colors.MAINDARK_BROWN,
    mainLightBrown: Colors.MAINLIGHT_BROWN,
    white: Colors.WHITE,
    darkGrey: Colors.DARK_GREY,
    borderColors: Colors.BORDER_COLORS,
    info: Colors.INFO,
    error: Colors.ERROR,
  },
  media: {
    pc: `@media screen and (max-width: ${Size.pc})`,
    tab: `@media screen and (max-width: ${Size.tab})`,
    mobile: `@media screen and (max-width: ${Size.mobile})`,
  },
  shadow: {
    0: "box-shadow: rgb(0 0 0 / 50%) 0px 0px 4px;",
    10: "box-shadow: rgb(0 0 0 / 10%) 0px 4px 16px 0px",
    30: "box-shadow: rgb(0 0 0 / 30%) 0px 4px 16px 0px",
    50: "box-shadow: rgb(0 0 0 / 50%) 0px 4px 16px 0px",
  },
};

export default theme;
