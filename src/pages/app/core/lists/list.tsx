import { useState, useEffect } from "react";
import { Stack, useTheme, useMediaQuery } from "@mui/material";
import { TitlePage, DefaultButton, DefaultCheckbox } from "../../../../components";
import placeholderData from "../../../../data/placeholder.json";
import { getIngredientsData, getIngredientsDataSync, buildMaps } from "../../../../services/store/Ingredients";
import { getUnitOptions } from "../../../../constants/units";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function List() {
  const { t, i18n } = useTranslation();
  const unitOptions = getUnitOptions(t);
  const getUnitLabel = (value: string) => unitOptions.find((u) => u.value === value)?.label ?? value;
  const navigate = useNavigate();
  const { id } = useParams();
  const list = placeholderData.lists[id];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [idToName, setIdToName] = useState<Record<string, string>>(
    () => buildMaps(getIngredientsDataSync(), i18n.language.split("-")[0]).idToName
  );

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const data = await getIngredientsData();
      if (!cancelled) setIdToName(buildMaps(data, i18n.language.split("-")[0]).idToName);
    };
    load();
    return () => { cancelled = true; };
  }, [i18n.language]);

  return (
    <>
      <TitlePage text={list ? list.name : t("lists.notFound")} isCentered />

      <Stack gap={2} sx={{ maxWidth: 400, width: "100%", margin: "36px auto", alignItems: "flex-start" }}>
        {list && list.items.map((item, index) => (
          <DefaultCheckbox key={index} label={`${idToName[item.name] ?? item.name} ${item.quantity}${item.unit !== "none" ? getUnitLabel(item.unit) : ""}`} cross />
        ))}
      </Stack>

      {list && (
          <Stack sx={{ position: "absolute", bottom: isMobile ? 36 : 56, left: "50%", transform: "translateX(-50%)", alignItems: "center" }}>
            <Stack direction={isMobile ? "column" : "row"} gap={2}>
              <DefaultButton
                label={t("lists.edit")}
                action={() => navigate(`/lists/${id}/edit`)}
                icon={EditIcon}
              />
              <DefaultButton
                label={t("lists.delete")}
                action={() => navigate("/lists")}
                icon={DeleteIcon}
              />
            </Stack>
            <Stack sx={{ mt: 4 }}>
              <DefaultButton
                label={t("lists.validate")}
                action={() => navigate("/lists")}
                icon={CheckIcon}
              />
            </Stack>
          </Stack>
        )}
    </>
  );
}