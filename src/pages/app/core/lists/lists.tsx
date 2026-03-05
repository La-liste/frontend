import { Stack } from "@mui/material";
import { TitlePage, ListButton, DefaultButton } from "../../../../components";
import placeholderData from "../../../../data/placeholder.json";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Lists() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const lists = placeholderData.lists;

  return (
    <>
      <TitlePage text={t("lists.title")} isCentered />

      <Stack gap={4} sx={{ maxWidth: 500, width: "100%", margin: "24px auto" }}>
        {lists.map((list, index) => (
          <ListButton key={index} label={list.name} items={list.items} isShared={list.shared} action={() => navigate(`/lists/${index}`)} />
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