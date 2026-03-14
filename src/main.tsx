import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { createAppTheme, ThemeContext } from './theme'
import App from './App.tsx'
import './i18n'

function ThemedApp() {
  const [themeKey, setThemeKey] = useState(localStorage.getItem("theme") ?? "blue");

  return (
    <ThemeContext.Provider value={{ setThemeKey: (key) => { localStorage.setItem("theme", key); setThemeKey(key); } }}>
      <ThemeProvider theme={createAppTheme(themeKey)}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemedApp />
  </StrictMode>,
)
