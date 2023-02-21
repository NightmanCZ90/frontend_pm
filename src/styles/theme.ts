import { createTheme } from "@suid/material";

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f9ba48',
      light: '#f7dcaa',
      dark: '#f08f18',
    },
    background: {
      paper: '#3A3A3E',
      default: '#232325',
    }
  },
  shape: {
    borderRadius: 6,
  },
});