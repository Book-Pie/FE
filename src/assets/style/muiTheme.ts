import { createTheme } from "@mui/material";
import { Colors } from "./global";

const materialTheme = createTheme({
  colors: {
    mainDarkBrown: Colors.MAINDARK_BROWN,
    mainLightBrown: Colors.MAINLIGHT_BROWN,
    white: Colors.WHITE,
    darkGrey: Colors.DARK_GREY,
  },
  /*
   * 여러가지 색깔을 커스텀해줄 수 있다.
   */
  palette: {
    mainDarkBrown: {
      main: Colors.MAINDARK_BROWN,
      contrastText: Colors.WHITE,
    },
    mainLightBrown: {
      main: Colors.MAINLIGHT_BROWN,
      contrastText: Colors.DARK_GREY,
    },
    darkgray: {
      main: Colors.DARK_GREY,
      contrastText: Colors.WHITE,
    },
    primary: {
      main: Colors.MAINDARK_BROWN,
    },
    secondary: { main: Colors.DARK_GREY },
  },
});

export default materialTheme;
