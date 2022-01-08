import { createTheme } from "@mui/material";
import { Colors } from "./global";

const materialTheme = createTheme({
  colors: {
    mainDarkBrown: Colors.MAINDARK_BROWN,
    mainLightBrown: Colors.MAINLIGHT_BROWN,
    white: Colors.WHITE,
    darkGrey: Colors.DARK_GREY,
  },
  palette: {
    mainDarkBrown: {
      main: Colors.MAINDARK_BROWN,
      contrastText: "#fff",
    },
    mainLightBrown: {
      main: Colors.MAINLIGHT_BROWN,
      contrastText: Colors.MAINDARK_BROWN,
    },
  },
});

export default materialTheme;
