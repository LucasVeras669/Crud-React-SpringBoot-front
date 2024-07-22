import { createTheme } from "@mui/material";
import { cyan } from "@mui/material/colors";

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: cyan[700],
      dark: cyan[800],
      light: cyan[500],
      contrastText: "#ffffff",
    },

    secondary: {
      main: cyan[300],
      dark: cyan[400],
      light: cyan[200],
      contrastText: "#ffffff",
    },

    background: {
      default: "f7f6f3",
      paper: "#ffffff",
    },
  },
});
