import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import {
  Setup,
  Login,
  Home,
  Lists, List, ListAdd, ListEdit,
  Inventory, InventoryEdit,
  Recipes, Recipe, RecipeAdd, RecipeEdit,
  Settings, GeneralSettings, AccountSettings,
  HomesSettings, AddHomeSettings, EditHomeSettings,
  AdminSettings, AddAdminSettings, EditAdminSettings
} from './pages'
import { AppLayout } from './components';
import { getIngredientsData } from "./services/store/Ingredients";

getIngredientsData().catch((err) => {
  console.error("Ingredients preload failed: ", err);
});

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
        <Route path="/login" element={needsSetup ? <Navigate to="/setup" /> : isLogin ? <Navigate to="/home" /> : <Login setIsLogin={setIsLogin} />} />
        <Route path="/home" element={isLogin ? <AppLayout><Home /></AppLayout> : <Navigate to="/login" />} />
        <Route path="/lists" element={isLogin ? <AppLayout><Lists /></AppLayout> : <Navigate to="/login" />} />
        <Route path="/lists/add" element={isLogin ? <AppLayout><ListAdd /></AppLayout> : <Navigate to="/login" />} />
        <Route path="/lists/:id" element={isLogin ? <AppLayout><List /></AppLayout> : <Navigate to="/login" />} />
        <Route path="/lists/:id/edit" element={isLogin ? <AppLayout><ListEdit /></AppLayout> : <Navigate to="/login" />} />
        <Route path="/inventory" element={isLogin ? <AppLayout><Inventory /></AppLayout> : <Navigate to="/login" />} />
        <Route path="/inventory/edit" element={isLogin ? <AppLayout><InventoryEdit /></AppLayout> : <Navigate to="/login" />} />
        <Route path="/recipes" element={isLogin ? <AppLayout><Recipes /></AppLayout> : <Navigate to="/login" />} />
        <Route path="/recipes/add" element={isLogin ? <AppLayout><RecipeAdd /></AppLayout> : <Navigate to="/login" />} />
        <Route path="/recipes/:id" element={isLogin ? <AppLayout><Recipe /></AppLayout> : <Navigate to="/login" />} />
        <Route path="/recipes/:id/edit" element={isLogin ? <AppLayout><RecipeEdit /></AppLayout> : <Navigate to="/login" />} />
        <Route path="/settings" element={isLogin ? <AppLayout><Settings /></AppLayout> : <Navigate to="/login" />} />
        <Route path="/settings/general" element={isLogin ? <AppLayout><GeneralSettings /></AppLayout> : <Navigate to="/login" />} />
        <Route path="/settings/account" element={isLogin ? <AppLayout><AccountSettings /></AppLayout> : <Navigate to="/login" />} />
        <Route path="/settings/homes" element={isLogin ? <AppLayout><HomesSettings /></AppLayout> : <Navigate to="/login" />} />
        <Route path="/settings/homes/add" element={isLogin ? <AppLayout><AddHomeSettings /></AppLayout> : <Navigate to="/login" />} />
        <Route path="/settings/homes/:id/edit" element={isLogin ? <AppLayout><EditHomeSettings /></AppLayout> : <Navigate to="/login" />} />
        <Route path="/settings/admin" element={isLogin ? <AppLayout><AdminSettings /></AppLayout> : <Navigate to="/login" />} />
        <Route path="/settings/admin/add" element={isLogin ? <AppLayout><AddAdminSettings /></AppLayout> : <Navigate to="/login" />} />
        <Route path="/settings/admin/edit" element={isLogin ? <AppLayout><EditAdminSettings /></AppLayout> : <Navigate to="/login" />} />
        <Route path="/settings/admin/:id/edit" element={isLogin ? <AppLayout><EditAdminSettings /></AppLayout> : <Navigate to="/login" />} />
        <Route path="/" element={ needsSetup ? <Navigate to="/setup" /> : isLogin ? <Navigate to="/home" /> : <Navigate to="/login" /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
