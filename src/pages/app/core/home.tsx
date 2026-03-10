import { useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { ListButton, BigButton, TitlePage } from "../../../components";
import placeholderData from "../../../data/placeholder.json";
import { getIngredientsData } from "../../../services/store/Ingredients";
import type { IngredientTaxonomy } from "../../../services/store/Ingredients";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lists = placeholderData.lists;
  const recipes = placeholderData.recipes;
  const [idToName, setIdToName] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const data: IngredientTaxonomy = await getIngredientsData();
      const lang = i18n.language.split("-")[0];
      const map: Record<string, string> = {};
      Object.entries(data).forEach(([id, entry]) => {
        const name = entry.name?.[lang] || entry.name?.en || entry.name?.fr;
        if (name) map[id] = name;
      });
      if (!cancelled) setIdToName(map);
    };
    load();
    return () => { cancelled = true; };
  }, [i18n.language]);

  return (
    <>
      <TitlePage text={t("home.title")} isCentered />

      <Stack spacing={2} sx={{ mt: 4 }}>
        <Typography variant="h5">{t("lists.latest")}</Typography>
        {lists.slice(0, 2).map((list, index) => (
          <ListButton key={index} label={list.name} items={list.items.map(item => ({ ...item, name: idToName[item.name] ?? item.name }))} isShared={list.shared} action={() => navigate(`/lists/${index}`)} />
        ))}
      </Stack>

      <Stack spacing={2} sx={{ mt: 4 }}>
        <Typography variant="h5">{t("recipes.latest")}</Typography>
        {recipes.slice(0, 3).map((recipe, index) => (
          <BigButton key={index} label={recipe.name} action={() => navigate(`/recipes/${index}`)} />
        ))}
      </Stack>
    </>
  );
}