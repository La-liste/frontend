import { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import { TitlePage, ListButton, DefaultButton } from "../../../../components";
import placeholderData from "../../../../data/placeholder.json";
import { getIngredientsData, getIngredientsDataSync, buildMaps } from "../../../../services/store/Ingredients";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Lists() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lists = placeholderData.lists;
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
      <TitlePage text={t("lists.title")} isCentered />

      <Stack gap={4} sx={{ maxWidth: 500, width: "100%", margin: "24px auto" }}>
        {lists.map((list, index) => (
          <ListButton key={index} label={list.name} items={list.items.map(item => ({ ...item, name: idToName[item.name] ?? item.name }))} isShared={list.shared} action={() => navigate(`/lists/${index}`)} />
        ))}

        <Stack sx={{ mt: 4 }}>
          <DefaultButton
            label={t("lists.add")}
            action={() => navigate("/lists/add")}
            icon={AddIcon}
          />
        </Stack>
      </Stack>
    </>
  );
}