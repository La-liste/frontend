import { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import { TextInput, NumberInput, AutocompleteInput, DefaultButton, DefaultSelect } from "../../../../components";
import { getIngredientsData, getIngredientsDataSync, buildMaps, normalize } from "../../../../services/store/Ingredients";
import type { MapsState } from "../../../../services/store/Ingredients";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

type ItemRow = { name: string; quantity: string; unit: string };
const createEmptyItem = (): ItemRow => ({ name: "", quantity: "", unit: "none" });

export default function RecipeAdd() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [maps, setMaps] = useState<MapsState>(() =>
    buildMaps(getIngredientsDataSync(), i18n.language.split("-")[0])
  );
  const { opts: options, idToName, nameToId } = maps;

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const data = await getIngredientsData();
      if (!cancelled) setMaps(buildMaps(data, i18n.language.split("-")[0]));
    };
    load();
    return () => { cancelled = true; };
  }, [i18n.language]);

  const [items, setItems] = useState<ItemRow[]>([
    createEmptyItem(),
  ]);

  const units = [t("inventory.placeholders.none"), "g", "kg", "L", "cL", "mL"];

  const handleItemChange = (index: number, field: "name" | "quantity" | "unit", value: string) => {
    setItems((prev) => {
      const next = prev.map((item, i) => (i === index ? { ...item, [field]: value } : item));

      const isLast = index === next.length - 1;
      if (isLast && !isEmptyItem(next[index])) {
        next.push(createEmptyItem());
      }

      return next;
    });
  };

  const isEmptyItem = (item: { name: string; quantity: string; unit: string }) =>
    item.name.trim() === "" && item.quantity.trim() === "" && (item.unit === "none" || item.unit.trim() === "");

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
                  gridTemplateColumns: "minmax(0, 1fr) auto auto",
                  alignItems: "center",
                  columnGap: { xs: 1, sm: 2 },
                  mb: 2,
                }}
              >
                <AutocompleteInput
                  placeholder={t("recipes.placeholders.ingredient")}
                    value={idToName[item.name] ?? item.name}
                    variant={"standard"}
                    type={"small"}
                    options={options}
                    strict
                    onBlur={() => {
                      if (!item.name.trim()) return;
                      const displayValue = idToName[item.name] ?? item.name;
                      if (!displayValue.trim()) return;
                      const match = options.find((o) => normalize(o) === normalize(displayValue));
                      const matchId = match ? (nameToId[normalize(match)] ?? match) : "";
                      handleItemChange(index, "name", matchId);
                    }}
                    onChange={(newValue) => handleItemChange(index, "name", newValue)}
                />

                <NumberInput
                  placeholder={t("recipes.placeholders.quantity")}
                  value={item.quantity}
                  variant={"standard"}
                  type={"small"}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleItemChange(index, "quantity", e.target.value)
                  }
                />

                <DefaultSelect
                  value={item.unit === "none" ? t("inventory.placeholders.none") : item.unit}
                  variant={"standard"}
                  options={units}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleItemChange(index, "unit", e.target.value)
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