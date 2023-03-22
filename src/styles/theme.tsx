import { createTheme, CssBaseline, ThemeProvider } from "@suid/material";
import { createPalette } from "@suid/material/styles/createPalette";
import { Accessor, createContext, createMemo, createSignal, ParentComponent, useContext } from "solid-js";

type ColorShade = {
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export type Colors = {
  grey: ColorShade;
  primary: ColorShade;
  greenAccent: ColorShade;
  redAccent: ColorShade;
  blueAccent: ColorShade;
}

// Color design tokens export
export const tokens = (mode: "dark" | "light"): Colors => ({
  ...(mode === "dark"
    ? {
      grey: {
        100: "#e0e0e0",
        200: "#c2c2c2",
        300: "#a3a3a3",
        400: "#858585",
        500: "#666666",
        600: "#525252",
        700: "#3d3d3d",
        800: "#292929",
        900: "#141414",
      },
      primary: {
        100: "#d2d4d9",
        200: "#a5aab3",
        300: "#797f8c",
        400: "#4c5566",
        500: "#1f2a40",
        600: "#192233",
        700: "#131926",
        800: "#0c111a",
        900: "#06080d"
      },
      greenAccent: {
        100: "#dbf5ee",
        200: "#b7ebde",
        300: "#94e2cd",
        400: "#70d8bd",
        500: "#4cceac",
        600: "#3da58a",
        700: "#2e7c67",
        800: "#1e5245",
        900: "#0f2922",
      },
      redAccent: {
        100: "#f8dcdb",
        200: "#f1b9b7",
        300: "#e99592",
        400: "#e2726e",
        500: "#db4f4a",
        600: "#af3f3b",
        700: "#832f2c",
        800: "#58201e",
        900: "#2c100f",
      },
      blueAccent: {
        100: "#e1e2fe",
        200: "#c3c6fd",
        300: "#a4a9fc",
        400: "#868dfb",
        500: "#6870fa",
        600: "#535ac8",
        700: "#3e4396",
        800: "#2a2d64",
        900: "#151632",
      },
    }
    : {
      grey: {
        100: "#141414",
        200: "#292929",
        300: "#3d3d3d",
        400: "#525252",
        500: "#666666",
        600: "#858585",
        700: "#a3a3a3",
        800: "#c2c2c2",
        900: "#e0e0e0",
      },

      primary: {
        900: "#ecedee",
        800: "#d9dbdd",
        700: "#c7c8cd",
        600: "#b4b6bc",
        500: "#a1a4ab",
        400: "#818389",
        300: "#616267",
        200: "#404244",
        100: "#202122"
      },
      greenAccent: {
        100: "#0f2922",
        200: "#1e5245",
        300: "#2e7c67",
        400: "#3da58a",
        500: "#4cceac",
        600: "#70d8bd",
        700: "#94e2cd",
        800: "#b7ebde",
        900: "#dbf5ee",
      },
      redAccent: {
        100: "#2c100f",
        200: "#58201e",
        300: "#832f2c",
        400: "#af3f3b",
        500: "#db4f4a",
        600: "#e2726e",
        700: "#e99592",
        800: "#f1b9b7",
        900: "#f8dcdb",
      },
      blueAccent: {
        100: "#151632",
        200: "#2a2d64",
        300: "#3e4396",
        400: "#535ac8",
        500: "#6870fa",
        600: "#868dfb",
        700: "#a4a9fc",
        800: "#c3c6fd",
        900: "#e1e2fe",
      },
    }),
});

// MUI theme settings
export const themeSettings = (mode: "dark" | "light") => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
          // Palette values for dark mode
          primary: {
            main: colors.primary[500],
          },
          secondary: {
            main: colors.greenAccent[300],
          },
          neutral: {
            dark: colors.grey[700],
            main: colors.grey[500],
            light: colors.grey[100],
          },
          background: {
            default: colors.primary[900],
          },
        }
        : {
          // Palette values for light mode
          primary: {
            main: colors.primary[500],
          },
          secondary: {
            main: colors.greenAccent[300],
          },
          neutral: {
            dark: colors.grey[700],
            main: colors.grey[500],
            light: colors.grey[100],
          },
          background: {
            default: "#fcfcfc",
          },
        }),
    },
    typography: {
      // fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        // fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        // fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        // fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        // fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        // fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        // fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

type ThemeContextValue = [
  Accessor<"dark" | "light">,
  () => void,
];

// Context for color mode
export const ThemeContext = createContext<ThemeContextValue>([
  (() => "dark") as Accessor<"dark" | "light">,
  () => undefined,
]);


export const CustomThemeProvider: ParentComponent = (props) => {
  const storedMode = localStorage.getItem('themeMode') as ("dark" | "light" | null);
  const [mode, setMode] = createSignal<"dark" | "light">(storedMode || "dark");

  const toggleColorMode = () => {
    localStorage.setItem('themeMode', mode() === "light" ? "dark" : "light");
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const settings = () => themeSettings(mode());

  const palette = createMemo(() =>
    createPalette({
      ...(settings().palette),
      mode: mode() === "dark" ? "dark" : "light",
    })
  );

  const theme = createTheme({
    palette,
    typography: settings().typography
  });

  return (
    <ThemeContext.Provider value={[mode, toggleColorMode]}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {props.children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);

