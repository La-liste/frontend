import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { createAppTheme, ThemeContext, ColorContext } from './theme'
import App from './App.tsx'
import './i18n'

function ThemedApp() {
  const [themeKey, setThemeKey] = useState(localStorage.getItem("theme") ?? "light");
  const [colorKey, setColorKey] = useState(localStorage.getItem("color") ?? "blue");

  return (
    <ThemeContext.Provider value={{ setThemeKey: (key) => { localStorage.setItem("theme", key); setThemeKey(key); } }}>
      <ColorContext.Provider value={{ setColorKey: (key) => { localStorage.setItem("color", key); setColorKey(key); } }}>
        <ThemeProvider theme={createAppTheme(colorKey, themeKey as "light" | "dark")}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </ColorContext.Provider>
    </ThemeContext.Provider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemedApp />
  </StrictMode>,
)
