import { Stack } from "@mui/material";
import { TitlePage, BigButton, DefaultButton } from "../../../../components";
import placeholderData from "../../../../data/placeholder.json";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Recipes() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const recipes = placeholderData.recipes;

  return (
    <>
      <TitlePage text={t("recipes.title")} isCentered />

      <Stack sx={{ maxWidth: 600, width: "100%", margin: "24px auto" }}>
        {recipes.map((recipe, index) => (
          <BigButton key={index} label={recipe.name} action={() => navigate(`/recipes/${index}`)} />
        ))}

      <Stack sx={{ mt: 4, width: "100%" }}>
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