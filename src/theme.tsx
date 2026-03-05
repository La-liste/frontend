import { createTheme } from "@mui/material/styles";

const storedTheme =
  typeof window !== "undefined" ? localStorage.getItem("theme") : null;

const palettes = {
  blue: {
    background: "#F6F7F8",
    surface: "#CCE1F4",
    accent: "#8AC7F3",
    accentHover: "#6DB5E8",
    text: "#2E5579",
  },
  red: {
    background: "#f8f6f6",
    surface: "#f4cccc",
    accent: "#f38a8a",
    accentHover: "#e86d6d",
    text: "#792e2e",
  },
  green: {
    background: "#f6f8f6",
    surface: "#ccf4d1",
    accent: "#77e977",
    accentHover: "#6de86d",
    text: "#2e7942",
  },
  yellow: {
    background: "#f8f8f6",
    surface: "#f4f1cc",
    accent: "#f3d78a",
    accentHover: "#e8d26d",
    text: "#795f2e",
  },
  orange: {
    background: "#f8f7f6",
    surface: "#f4dccb",
    accent: "#f3a36b",
    accentHover: "#e88a5d",
    text: "#793c2e",
  },
  purple: {
    background: "#f7f6f8",
    surface: "#d8ccf4",
    accent: "#aa8af3",
    accentHover: "#926de8",
    text: "#422e79",
  },
  pink: {
    background: "#f8f6f7",
    surface: "#f4ccd8",
    accent: "#f38ab3",
    accentHover: "#e86da0",
    text: "#792e57",
  },
  black: {
    background: "#121212",
    surface: "#1e1e1e",
    accent: "#3c4042",
    accentHover: "#4c5052",
    text: "#e1e1e1",
  },
  white: {
    background: "#ffffff",
    surface: "#ececec",
    accent: "#dadada",
    accentHover: "#c2c2c2",
    text: "#5c5c5c",
  }
} as const;

type PaletteKey = keyof typeof palettes;

const paletteKey: PaletteKey =
  storedTheme && storedTheme in palettes
    ? (storedTheme as PaletteKey)
    : "blue";

export const appColors = palettes[paletteKey];

export const theme = createTheme({
  cssVariables: true,
  shape: {
    borderRadius: 24,
  },
  palette: {
    background: {
      default: appColors.background,
      paper: appColors.surface,
    },
    primary: {
      main: appColors.accent,
      dark: appColors.accentHover,
      contrastText: appColors.text,
    },
    text: {
      primary: appColors.text,
      secondary: appColors.text,
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
        body: { backgroundColor: appColors.background },
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
          backgroundColor: appColors.accent,
          color: appColors.text,
          "&:hover": {
            backgroundColor: appColors.accentHover,
            boxShadow: "none",
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: appColors.surface,
          color: appColors.text,
        },
        notchedOutline: {
          border: "none",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: appColors.text,
          "&.Mui-focused": { color: appColors.text },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: appColors.text,
          "&.Mui-focused": { color: appColors.text },
        },
      },
    },
  },
});