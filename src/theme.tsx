import { createContext } from "react";
import { createTheme } from "@mui/material/styles";

const palettes = {
  none: {
    light: {
      background: "#ffffff",
      surface: "#ececec",
      accent: "#dadada",
      accentHover: "#c2c2c2",
      text: "#5c5c5c",
    },
    dark: {
      background: "#121212",
      surface: "#1e1e1e",
      accent: "#3c4042",
      accentHover: "#4c5052",
      text: "#e1e1e1",
    },
  },
  blue: {
    light: {
      background: "#F6F7F8",
      surface: "#CCE1F4",
      accent: "#8AC7F3",
      accentHover: "#6DB5E8",
      text: "#2E5579",
    },
    dark: {
      background: "#0f1318",
      surface: "#1b2633",
      accent: "#4b99d1",
      accentHover: "#61a5d6",
      text: "#d4e9fa",
    },
  },
  red: {
    light: {
      background: "#f8f6f6",
      surface: "#f4cccc",
      accent: "#f38a8a",
      accentHover: "#e86d6d",
      text: "#792e2e",
    },
    dark: {
      background: "#130f0f",
      surface: "#261818",
      accent: "#c04e4e",
      accentHover: "#ce6565",
      text: "#facdcd",
    },
  },
  green: {
    light: {
      background: "#f6f8f6",
      surface: "#ccf4d1",
      accent: "#59ca59",
      accentHover: "#6de86d",
      text: "#2e7942",
    },
    dark: {
      background: "#0f130f",
      surface: "#182618",
      accent: "#54c054",
      accentHover: "#6bce6b",
      text: "#d9f8d9",
    },
  },
  yellow: {
    light: {
      background: "#f8f8f6",
      surface: "#f4f1cc",
      accent: "#f3d78a",
      accentHover: "#e8d26d",
      text: "#795f2e",
    },
    dark: {
      background: "#131210",
      surface: "#26230f",
      accent: "#d8ae3a",
      accentHover: "#e4bd51",
      text: "#f7e4c3",
    },
  },
  orange: {
    light: {
      background: "#f8f7f6",
      surface: "#f4dccb",
      accent: "#f3a36b",
      accentHover: "#e88a5d",
      text: "#793c2e",
    },
    dark: {
      background: "#13100f",
      surface: "#261a0f",
      accent: "#dd7f3d",
      accentHover: "#e99254",
      text: "#f7dcd3",
    },
  },
  purple: {
    light: {
      background: "#f7f6f8",
      surface: "#d8ccf4",
      accent: "#aa8af3",
      accentHover: "#926de8",
      text: "#422e79",
    },
    dark: {
      background: "#121016",
      surface: "#241f30",
      accent: "#7f57dd",
      accentHover: "#906ce6",
      text: "#ded3f7",
    },
  },
  pink: {
    light: {
      background: "#f8f6f7",
      surface: "#f4ccd8",
      accent: "#f38ab3",
      accentHover: "#e86da0",
      text: "#792e57",
    },
    dark: {
      background: "#130f11",
      surface: "#26181e",
      accent: "#d16c93",
      accentHover: "#e688ac",
      text: "#f3d9e7",
    },
  },
} as const;

type PaletteKey = keyof typeof palettes;

export function createAppTheme(
  colorKey: string,
  themeKey: "light" | "dark"
) {
  const paletteKey: PaletteKey =
    colorKey in palettes ? (colorKey as PaletteKey) : "blue";

  const c = palettes[paletteKey][themeKey];

  return createTheme({
  cssVariables: true,
  shape: {
    borderRadius: 24,
  },
  palette: {
    background: {
      default: c.background,
      paper: c.surface,
    },
    primary: {
      main: c.accent,
      dark: c.accentHover,
      contrastText: c.text,
    },
    text: {
      primary: c.text,
      secondary: c.text,
    },
  },
  typography: {
    fontFamily:
      "var(--font-autour-one), system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "html, body": { minHeight: "100%" },
        body: { backgroundColor: c.background },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: "none",
          textTransform: "none",
        },
        containedPrimary: {
          backgroundColor: c.accent,
          color: c.text,
          "&:hover": {
            backgroundColor: c.accentHover,
            boxShadow: "none",
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: c.surface,
          color: c.text,
        },
        notchedOutline: {
          border: "none",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: c.text,
          "&.Mui-focused": { color: c.text },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: c.text,
          "&.Mui-focused": { color: c.text },
        },
      },
    },
  },
  });
}

export const ThemeContext = createContext<{ setThemeKey: (key: string) => void }>({
  setThemeKey: () => {},
});

export const ColorContext = createContext<{ setColorKey: (key: string) => void }>({
  setColorKey: () => {},
});