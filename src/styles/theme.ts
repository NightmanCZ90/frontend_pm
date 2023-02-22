import { createTheme } from "@suid/material";

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e64a19',
    },
    secondary: {
      main: '#8c9eff',
    },
  },
  shape: {
    borderRadius: 6,
  },
});