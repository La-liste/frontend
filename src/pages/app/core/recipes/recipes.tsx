import { useState } from "react";
import { Stack, Pagination } from "@mui/material";
import { TitlePage, BigButton, DefaultButton } from "../../../../components";
import placeholderData from "../../../../data/placeholder.json";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Recipes() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const recipes = placeholderData.recipes;
  const ITEMS_PER_PAGE = 7;
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(recipes.length / ITEMS_PER_PAGE);
  const pagedRecipes = recipes.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <>
      <TitlePage text={t("recipes.title")} isCentered />

      <Stack sx={{ maxWidth: 600, width: "100%", margin: "24px auto" }}>
        {pagedRecipes.map((recipe, index) => {
          const realIndex = (page - 1) * ITEMS_PER_PAGE + index;
          return <BigButton key={realIndex} label={recipe.name} action={() => navigate(`/recipes/${realIndex}`)} />;
        })}

        {pageCount > 1 && <Pagination count={pageCount} page={page} onChange={(_, value) => setPage(value)} color="primary" sx={{ mt: 2 }} />}

      <Stack sx={{ mt: 3, width: "100%" }}>
        <Stack>
          <DefaultButton
            label={t("recipes.add")}
            action={() => navigate("/recipes/add")}
            icon={AddIcon}
          />
        </Stack>
      </Stack>
      </Stack>
    </>
  );
}