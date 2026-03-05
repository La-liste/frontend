import { Stack, Typography } from "@mui/material";
import { ListButton, BigButton, TitlePage } from "../../../components";
import placeholderData from "../../../data/placeholder.json";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const lists = placeholderData.lists;
  const recipes = placeholderData.recipes;

  return (
    <>
      <TitlePage text={t("home.title")} isCentered />

      <Stack spacing={2} sx={{ mt: 4 }}>
        <Typography variant="h5">{t("lists.latest")}</Typography>
        {lists.slice(0, 2).map((list, index) => (
          <ListButton key={index} label={list.name} items={list.items} isShared={list.shared} action={() => navigate(`/lists/${index}`)} />
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