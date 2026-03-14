import { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import { TitlePage, TextInput, NumberInput, AutocompleteInput, DefaultButton, DefaultCheckbox, DefaultSelect } from "../../../../components";
import { getIngredientsData, getIngredientsDataSync, buildMaps, normalize } from "../../../../services/store/Ingredients";
import type { MapsState } from "../../../../services/store/Ingredients";
import { getUnitOptions } from "../../../../constants/units";
import placeholderData from "../../../../data/placeholder.json";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

type ItemRow = { name: string; quantity: string; unit: string };
const createEmptyItem = (): ItemRow => ({ name: "", quantity: "", unit: "none" });

export default function ListEdit() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const list = id ? placeholderData.lists[Number(id)] : undefined;

  const location = useLocation();
  const [name, setName] = useState(list?.name ?? "");
  const [shared, setShared] = useState(list?.shared ?? false);

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

  const [items, setItems] = useState<ItemRow[]>(() => {
    const existingItems: ItemRow[] = (list?.items ?? []).map((item) => ({
      name: item.name ?? "",
      quantity: String(item.quantity ?? ""),
      unit: item.unit ?? "none",
    }));
    const extraItems: ItemRow[] = (location.state?.items ?? [])
      .filter((extra: ItemRow) => !existingItems.some((e) => e.name === extra.name))
      .map((item: ItemRow) => ({ name: item.name, quantity: item.quantity, unit: item.unit }));
    return [...existingItems, ...extraItems, createEmptyItem()];
  });

  const unitOptions = getUnitOptions(t);

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
      {list ? (
        <>
          <Stack sx={{ alignItems: "center" }}>
            <TextInput
              placeholder={t("lists.placeholders.name")}
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
                    placeholder={t("lists.placeholders.item")}
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
                  placeholder={t("lists.placeholders.quantity")}
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

            <Stack gap={2} sx={{ mt: 4, width: "100%", alignItems: "center" }}>
              <DefaultCheckbox label={t("lists.shared")} checked={shared} action={() => setShared((prev) => !prev)} isCentered />
                <DefaultButton
                    label={t("lists.save")}
                    action={() => navigate(`/lists/${id}`)}
                    icon={CheckIcon}
                />
            </Stack>
          </Stack>
        </>
      ) : (
        <TitlePage text={t("lists.notFound")} isCentered />
      )}
    </>
  );
}