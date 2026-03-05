import { useState } from "react";
import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { TextInput, DefaultButton } from "../../../../components";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

type ItemRow = { name: string; quantity: string };
const createEmptyItem = (): ItemRow => ({ name: "", quantity: "" });

export default function RecipeAdd() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [name, setName] = useState("");

  const [items, setItems] = useState<ItemRow[]>([
    createEmptyItem(),
  ]);

  const handleItemChange = (index: number, field: "name" | "quantity", value: string) => {
    setItems((prev) => {
      const next = prev.map((item, i) => (i === index ? { ...item, [field]: value } : item));

      const isLast = index === next.length - 1;
      if (isLast && !isEmptyItem(next[index])) {
        next.push(createEmptyItem());
      }

      return next;
    });
  };

  const isEmptyItem = (item: { name: string; quantity: string }) =>
    item.name.trim() === "" && item.quantity.trim() === "";

  const handleRowBlur = (index: number, e: React.FocusEvent<HTMLDivElement>) => {
    const nextFocused = e.relatedTarget as Node | null;
    if (nextFocused && e.currentTarget.contains(nextFocused)) return;

    setItems((prev) => {
      const current = prev[index];
      if (!current) return prev;

      const isLast = index === prev.length - 1;

      if (isEmptyItem(current) && !isLast) {
        const filtered = prev.filter((_, i) => i !== index);
        const last = filtered[filtered.length - 1];
        if (!last || !isEmptyItem(last)) filtered.push(createEmptyItem());
        return filtered;
      }

      return prev;
    });
  };

  return (
    <>
      <Stack sx={{ alignItems: "center" }}>
        <TextInput
          placeholder={t("recipes.placeholders.name")}
          value={name}
          variant={"standard"}
          type={"big"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
      </Stack>

      <Stack sx={{ mt: 4, maxWidth: 800, width: "100%", margin: "24px auto", px: { xs: 1, sm: 2, md: 3 } }}>      
            {items.map((item, index) => (
              <Stack
                key={index}
                onBlur={(e) => handleRowBlur(index, e)}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr) auto",
                  alignItems: "center",
                  columnGap: 2,
                  mb: 2,
                }}
              >
                <Typography
                  variant={isMobile ? "h6" : "h5"}
                  sx={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                >
                <TextInput
                  placeholder={t("recipes.placeholders.ingredient")}
                    value={item.name}
                    variant={"standard"}
                    type={"small"}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleItemChange(index, "name", e.target.value)
                    }
                />
                </Typography>

                <TextInput
                  placeholder={t("recipes.placeholders.quantity")}
                    value={item.quantity}
                    variant={"standard"}
                    type={"small"}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleItemChange(index, "quantity", e.target.value)
                }
                />
              </Stack>
            ))}
      
            <Stack sx={{ mt: 4, width: "100%", alignItems: "center" }}>
              <DefaultButton
                label={t("recipes.save")}
                action={() => navigate("/recipes")}
                icon={CheckIcon}
              />
            </Stack>
          </Stack>
    </>
  );
}