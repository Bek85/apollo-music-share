import { createTheme } from "@mui/material";
import { teal, purple } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: teal[600],
      secondary: purple[800],
    },
  },
});

export default theme;
