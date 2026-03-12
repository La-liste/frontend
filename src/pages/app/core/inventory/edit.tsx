import { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import { TitlePage, NumberInput, DefaultButton, AutocompleteInput, DefaultSelect } from "../../../../components";
import { getIngredientsData, getIngredientsDataSync } from "../../../../services/store/Ingredients";
import type { IngredientTaxonomy } from "../../../../services/store/Ingredients";
import { getUnitOptions } from "../../../../constants/units";
import placeholderData from "../../../../data/placeholder.json";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

type ItemRow = { id: string; name: string; quantity: string; unit: string };
type IngredientTaxonomyEntry = {
  name?: Record<string, string>;
};
type MapsState = { opts: string[]; idToName: Record<string, string>; nameToId: Record<string, string> };

let _idCounter = 0;
const createEmptyItem = (): ItemRow => ({ id: `item-${++_idCounter}`, name: "", quantity: "", unit: "none" });

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/œ/g, "oe")
    .replace(/æ/g, "ae")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function buildMaps(data: IngredientTaxonomy | null, lang: string): MapsState {
  if (!data) return { opts: [], idToName: {}, nameToId: {} };
  const opts: string[] = [];
  const idToName: Record<string, string> = {};
  const nameToId: Record<string, string> = {};
  (Object.entries(data) as [string, IngredientTaxonomyEntry][]).forEach(([id, entry]) => {
    const name = entry.name?.[lang] || entry.name?.en || entry.name?.fr;
    if (name) {
      opts.push(name);
      idToName[id] = name;
      nameToId[normalize(name)] = id;
    }
  });
  return { opts, idToName, nameToId };
}

export default function InventoryEdit() {
  const { t, i18n } = useTranslation();
  const unitOptions = getUnitOptions(t);
  const navigate = useNavigate();
  const [maps, setMaps] = useState<MapsState>(() =>
    buildMaps(getIngredientsDataSync(), i18n.language.split("-")[0])
  );
  const { opts: options, idToName, nameToId } = maps;;

  const [items, setItems] = useState<ItemRow[]>(() => [
    ...placeholderData.items.map((item) => ({
      id: `item-${++_idCounter}`,
      name: item.name ?? "",
      quantity: String(item.quantity ?? ""),
      unit: item.unit ?? "none",
    })),
    createEmptyItem(),
  ]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const data = await getIngredientsData();
      const lang = i18n.language.split("-")[0];

      if (!cancelled) setMaps(buildMaps(data, lang));
    };

    load();
    return () => { cancelled = true; }
  }, [i18n.language]);

  const handleItemChange = (index: number, field: "name" | "quantity" | "unit", value: string) => {
    setItems((prev) => {
      const next = prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      );

      const nonEmpty = next.filter((item) => !isEmptyItem(item));
      return [...nonEmpty, createEmptyItem()];
    });
  };

  const isEmptyItem = (item: { name: string; quantity: string | number; unit: string }) => {
    const nameEmpty = String(item.name ?? "").trim() === "";
    const quantityEmpty = String(item.quantity ?? "").trim() === "";
    const unitEmpty = String(item.unit ?? "").trim() === "" || item.unit === "none";

    return nameEmpty && quantityEmpty && unitEmpty;
  };

  return (
    <>
      <TitlePage text={t("inventory.title")} isCentered />

      <Stack sx={{ mt: 4, maxWidth: 800, width: "100%", margin: "24px auto", px: { xs: 1, sm: 2, md: 3 } }}>
        {items.map((item, index) => (
          <Stack
            key={item.id}
            sx={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) auto auto",
              alignItems: "center",
              columnGap: { xs: 1, sm: 2 },
              mb: 2,
            }}
          >
            <AutocompleteInput
                placeholder={t("inventory.placeholders.item")}
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
              placeholder={t("inventory.placeholders.quantity")}
              value={item.quantity}
              variant={"standard"}
              type={"small"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleItemChange(index, "quantity", e.target.value)
              }
            />

            <DefaultSelect
              value={item.unit}
              variant={"standard"}
              options={unitOptions}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleItemChange(index, "unit", e.target.value)
              }
            />
          </Stack>
        ))}
  
        <Stack sx={{ mt: 4, width: "100%", alignItems: "center" }}>
          <DefaultButton
            label={t("inventory.save")}
            action={() => navigate("/inventory")}
            icon={CheckIcon}
          />
        </Stack>
      </Stack>
    </>
  );
}