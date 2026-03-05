import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Setup, Application } from './pages'
import { AppLayout } from './components';

function App() {
  const [needsSetup, setNeedsSetup] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const theme = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('app.title');
  }, [t]);

  useEffect(() => {
    const color = theme.palette.text.primary;

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}">
        <path d="M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z"/>
      </svg>
    `;

    const url = `data:image/svg+xml,${encodeURIComponent(svg)}`;

    let link = document.querySelector("link[rel='icon']") as HTMLLinkElement;

    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }

    link.href = url;
  }, [theme.palette.text.primary]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/setup" element={needsSetup ? <Setup setNeedsSetup={setNeedsSetup} /> : <Navigate to="/login" />} />
        <Route path="/login" element={needsSetup ? <Navigate to="/setup" /> : isLogin ? <Navigate to="/home" /> : <Application.Login setIsLogin={setIsLogin} />} />
        <Route path="/home" element={isLogin ? <AppLayout><Application.Home /></AppLayout> : <Navigate to="/login" />} />
        <Route path="/lists" element={isLogin ? <AppLayout><Application.Lists /></AppLayout> : <Navigate to="/login" />} />
        <Route path="/lists/add" element={isLogin ? <AppLayout><Application.ListAdd /></AppLayout> : <Navigate to="/login" />} />
        <Route path="/lists/:id" element={isLogin ? <AppLayout><Application.List /></AppLayout> : <Navigate to="/login" />} />
        <Route path="/lists/:id/edit" element={isLogin ? <AppLayout><Application.ListEdit /></AppLayout> : <Navigate to="/login" />} />
        <Route path="/inventory" element={isLogin ? <AppLayout><Application.Inventory /></AppLayout> : <Navigate to="/login" />} />
        <Route path="/inventory/edit" element={isLogin ? <AppLayout><Application.InventoryEdit /></AppLayout> : <Navigate to="/login" />} />
        <Route path="/recipes" element={isLogin ? <AppLayout><Application.Recipes /></AppLayout> : <Navigate to="/login" />} />
        <Route path="/recipes/add" element={isLogin ? <AppLayout><Application.RecipeAdd /></AppLayout> : <Navigate to="/login" />} />
        <Route path="/recipes/:id" element={isLogin ? <AppLayout><Application.Recipe /></AppLayout> : <Navigate to="/login" />} />
        <Route path="/recipes/:id/edit" element={isLogin ? <AppLayout><Application.RecipeEdit /></AppLayout> : <Navigate to="/login" />} />
        <Route path="/settings" element={isLogin ? <AppLayout><Application.Settings /></AppLayout> : <Navigate to="/login" />} />
        <Route path="/settings/general" element={isLogin ? <AppLayout><Application.GeneralSettings /></AppLayout> : <Navigate to="/login" />} />
        <Route path="/settings/account" element={isLogin ? <AppLayout><Application.AccountSettings /></AppLayout> : <Navigate to="/login" />} />
        <Route path="/settings/homes" element={isLogin ? <AppLayout><Application.HomesSettings /></AppLayout> : <Navigate to="/login" />} />
        <Route path="/settings/homes/add" element={isLogin ? <AppLayout><Application.AddHomeSettings /></AppLayout> : <Navigate to="/login" />} />
        <Route path="/settings/homes/:id/edit" element={isLogin ? <AppLayout><Application.EditHomeSettings /></AppLayout> : <Navigate to="/login" />} />
        <Route path="/settings/admin" element={isLogin ? <AppLayout><Application.AdminSettings /></AppLayout> : <Navigate to="/login" />} />
        <Route path="/settings/admin/add" element={isLogin ? <AppLayout><Application.AddAdminSettings /></AppLayout> : <Navigate to="/login" />} />
        <Route path="/settings/admin/edit" element={isLogin ? <AppLayout><Application.EditAdminSettings /></AppLayout> : <Navigate to="/login" />} />
        <Route path="/settings/admin/:id/edit" element={isLogin ? <AppLayout><Application.EditAdminSettings /></AppLayout> : <Navigate to="/login" />} />
        <Route
          path="/"
          element={
            needsSetup ? <Navigate to="/setup" /> : isLogin ? <Navigate to="/home" /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
