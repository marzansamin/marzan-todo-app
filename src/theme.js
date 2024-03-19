// Over-riding the default values of the theme here, to make a theme of my own(custom theme)

import { createTheme } from "@mui/material";

export const colors = [
  "#F49D6E",
  "#E85A4F",
  "#FFD166",
  "#8ABEB7",
  "#247BA0",
  "#D3D3D3",
];

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
  components: {
    MuiIconButton: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiSnackbar: {
      defaultProps: {
        anchorOrigin: {
          horizontal:"center", 
          vertical:"top",
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        message: {
          fontWeight: 600,
          textTransform: 'capitalize',
        },
      },
    },
  },
  typography: {
    fontFamily: "Lora, sans-serif",
    button: {
      textTransform: "unset",
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 0,
  },
});

export default theme;
