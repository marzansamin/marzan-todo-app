// Over-riding the default values of the theme here, to make a theme of my own(custom theme)

import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      // default: '#1D1F26'
    },
    primary: {
      main: '#BEA4FF'
    },
  },
  typography: {
    fontFamily: "Lora, sans-serif",
    button: {
      textTransform: "unset",
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 0,
  },
});

export default theme;
