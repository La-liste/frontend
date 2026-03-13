import { useState, useEffect } from "react";
import { Stack, Typography, Divider, useMediaQuery, useTheme } from "@mui/material";
import { TitlePage, DefaultButton, DefaultDialog } from "../../../../components";
import placeholderData from "../../../../data/placeholder.json";
import { getIngredientsData, getIngredientsDataSync, buildMaps } from "../../../../services/store/Ingredients";
import { getUnitOptions } from "../../../../constants/units";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningIcon from '@mui/icons-material/Warning';
import AddIcon from "@mui/icons-material/Add";
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

type RecipeIngredient = { name: string; quantity: string, unit: string };

export default function Recipe() {
  const { t, i18n } = useTranslation();
  const unitOptions = getUnitOptions(t);
  const getUnitLabel = (value: string) => unitOptions.find((u) => u.value === value)?.label ?? value;
  const navigate = useNavigate();
  const { id } = useParams();
  const recipe = id ? placeholderData.recipes[Number(id)] : undefined;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [idToName, setIdToName] = useState<Record<string, string>>(
    () => buildMaps(getIngredientsDataSync(), i18n.language.split("-")[0]).idToName
  );

  const [dialogOpen, setdialogOpen] = useState(false);

  const handleOpen = () => {
    setdialogOpen(true);
  };

  const handleClose = () => {
    setdialogOpen(false);
  };

  const handleConfirm = () => {
    setdialogOpen(false);
  };

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const data = await getIngredientsData();
      if (!cancelled) setIdToName(buildMaps(data, i18n.language.split("-")[0]).idToName);
    };
    load();
    return () => { cancelled = true; };
  }, [i18n.language]);

  const availableItems = placeholderData.items;
  const isItemInList = (ingredientId: string) =>
    availableItems.some((inventoryItem) => inventoryItem.name === ingredientId);
  const hasMissingItems = recipe?.ingredients.some((item: RecipeIngredient) => !isItemInList(item.name)) ?? false;

  const missingItems: RecipeIngredient[] = recipe?.ingredients.filter(
    (item: RecipeIngredient) => !isItemInList(item.name)
  ).map((item: RecipeIngredient) => ({ name: item.name, quantity: item.quantity, unit: item.unit })) ?? [];

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
                  <Stack sx={{ width: "24px", alignItems: "center", justifyContent: "center", paddingRight: 2 }}>
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
                      {idToName[item.name] ?? item.name}
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
                      {item.quantity}{item.unit !== "none" ? getUnitLabel(item.unit) : ""}
                    </Typography>
                  </Stack>
                </Stack>
                <Divider sx={{ backgroundColor: "text.primary", mb: 1, width: isTablet ? "100%" : "85%", opacity: 0.5 }} />
              </Stack>
            ))}
      
            {recipe && (
              <Stack sx={{ marginTop: 4, alignItems: "center" }}>
                <Stack direction={isTablet ? "column" : "row"} gap={2}>
                  <DefaultButton
                    label={t("recipes.edit")}
                    action={() => navigate(`/recipes/${id}/edit`)}
                    icon={EditIcon}
                  />
                  <DefaultButton
                    label={t("recipes.delete")}
                    action={handleOpen}
                    icon={DeleteIcon}
                  />
                </Stack>

                <Stack sx={{ mt: 4 }}>
                  {hasMissingItems ? 
                    <DefaultButton
                      label={t("recipes.list")}
                      action={() => navigate(`/lists/add`, { state: { items: missingItems } })}
                      icon={AddIcon}
                    />
                     :
                    <DefaultButton
                      label={t("recipes.cook")}
                      action={() => navigate(`/recipes`)}
                      icon={LocalDiningIcon}
                    />}
                </Stack>
            </Stack>
            )}

            <DefaultDialog title={t("recipes.dialog.title")} description={t("recipes.dialog.description")} open={dialogOpen} onConfirm={handleConfirm} onCancel={handleClose} />
          </Stack>
    </>
  );
}