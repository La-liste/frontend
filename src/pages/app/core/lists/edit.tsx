import { useState } from "react";
import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { TitlePage, TextInput, DefaultButton, DefaultCheckbox } from "../../../../components";
import placeholderData from "../../../../data/placeholder.json";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

type ItemRow = { name: string; quantity: string };
const createEmptyItem = (): ItemRow => ({ name: "", quantity: "" });

export default function ListEdit() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const list = id ? placeholderData.lists[Number(id)] : undefined;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [name, setName] = useState(list?.name ?? "");
  const [shared, setShared] = useState(list?.shared ?? false);

  const [items, setItems] = useState<ItemRow[]>([
    ...(list?.items ?? []).map((item) => ({
      name: item.name ?? "",
      quantity: String(item.quantity ?? ""),
    })),
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
                    placeholder={t("lists.placeholders.item")}
                    value={item.name}
                    variant={"standard"}
                    type={"small"}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleItemChange(index, "name", e.target.value)
                    }
                  />
                </Typography>

                <TextInput
                  placeholder={t("lists.placeholders.quantity")}
                  value={item.quantity}
                  variant={"standard"}
                  type={"small"}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleItemChange(index, "quantity", e.target.value)
                  }
                />
              </Stack>
            ))}

            <Stack gap={2} sx={{ mt: 4, width: "100%", alignItems: "center" }}>
              <DefaultCheckbox label={t("lists.shared")} checked={shared} action={() => setShared((prev) => !prev)} />
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