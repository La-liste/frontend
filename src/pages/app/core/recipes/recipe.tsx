import { useState } from "react";
import { Stack, Typography, Divider, useMediaQuery, useTheme } from "@mui/material";
import { TitlePage, DefaultButton, DefaultSelect } from "../../../../components";
import placeholderData from "../../../../data/placeholder.json";
import EditIcon from "@mui/icons-material/Edit";
import WarningIcon from '@mui/icons-material/Warning';
import AddIcon from "@mui/icons-material/Add";
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

type RecipeIngredient = { name: string; quantity: string };

export default function Recipe() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const recipe = id ? placeholderData.recipes[Number(id)] : undefined;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const normalize = (s: string) => s.trim().toLowerCase();
  const availableItems = placeholderData.items;
  const isItemInList = (ingredientName: string) =>
    availableItems?.some((inventoryItem) => normalize(inventoryItem.name) === normalize(ingredientName)) ?? false;
  const hasMissingItems = recipe?.ingredients.some((item: RecipeIngredient) => !isItemInList(item.name)) ?? false;

  const lists = placeholderData.lists.map((listItem) => listItem.name);
  const [list, setList] = useState<string>(lists[0] ?? "");

  return (
    <>
      <TitlePage text={recipe ? recipe.name : t("recipes.notFound")} isCentered />

      <Stack sx={{ mt: 4, maxWidth: 1200, width: "100%", margin: "24px auto", px: { xs: 1, sm: 2, md: 3 } }}>
            {recipe && (
                <>
                    <Stack direction="row" sx={{ mb: 1 }}>
                      <Stack width="24px" />
                      <Stack width={isMobile ? "55%" : "40%"}>
                        <Typography variant="h5" sx={{ minWidth: 0 }}>
                          {isMobile ? t("recipes.ingredients.mobile") : t("recipes.ingredients.desktop")}
                        </Typography>
                      </Stack>
                      <Stack>
                        <Typography variant="h5">
                          {isMobile ? t("recipes.quantity.mobile") : t("recipes.quantity.desktop")}
                        </Typography>
                      </Stack>
                    </Stack>
            
                    <Divider sx={{ backgroundColor: "text.primary", height: "2.5px", mb: 2, width: isTablet ? "100%" : "85%" }} />
                </>
            )}
      
            {recipe && recipe.ingredients.map((item: RecipeIngredient, index: number) => (
              <Stack key={index}>
                <Stack
                  direction="row"
                  sx={{
                    alignItems: "center",
                    pb: 1,
                  }}
                >
                  <Stack sx={{ width: "24px", alignItems: "center", justifyContent: "center" }}>
                    {!isItemInList(item.name) ? <WarningIcon /> : null}
                  </Stack>

                  <Stack width={isMobile ? "55%" : "40%"}>
                    <Typography
                      variant={isMobile ? "h6" : "h5"}
                      sx={{
                        minWidth: 0,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Stack>

                  <Stack>
                    <Typography
                      variant={isMobile ? "h6" : "h5"}
                      sx={{
                        minWidth: 0,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.quantity}
                    </Typography>
                  </Stack>
                </Stack>
                <Divider sx={{ backgroundColor: "text.primary", mb: 1, width: isTablet ? "100%" : "85%", opacity: 0.5 }} />
              </Stack>
            ))}
      
            {recipe && (
              <Stack
                gap={4}
                direction={isTablet ? "column" : "row"}
                sx={{ mt: 4, alignItems: isTablet ? "center" : "flex-start" }}
              >
                <DefaultButton
                  label={t("recipes.edit")}
                  action={() => navigate(`/recipes/${id}/edit`)}
                  icon={EditIcon}
                />
                {hasMissingItems ? <Stack
                  direction={"column"}
                  alignItems={"center"}
                  gap={1}
                  sx={{
                    width: isTablet ? "100%" : "fit-content",
                    maxWidth: isTablet ? 300 : undefined,
                    "& .MuiFormControl-root": { width: isTablet ? "100%" : "auto" },
                  }}
                >
                  <DefaultButton
                    label={t("recipes.list")}
                    action={() => navigate(`/recipes`)}
                    icon={AddIcon}
                  />
                  <DefaultSelect value={list} setValue={setList} options={lists} />
                </Stack> :
                <DefaultButton
                  label={t("recipes.cook")}
                  action={() => navigate(`/recipes`)}
                  icon={LocalDiningIcon}
                />}
            </Stack>
            )}
          </Stack>
    </>
  );
}