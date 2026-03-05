import { Stack, useTheme, useMediaQuery } from "@mui/material";
import { TitlePage, DefaultButton, DefaultCheckbox } from "../../../../components";
import placeholderData from "../../../../data/placeholder.json";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function List() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const list = placeholderData.lists[id];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <TitlePage text={list ? list.name : t("lists.notFound")} isCentered />

      <Stack gap={2} sx={{ maxWidth: 400, width: "100%", margin: "36px auto", alignItems: "flex-start" }}>
        {list && list.items.map((item, index) => (
          <DefaultCheckbox key={index} label={`${item.name} ${item.quantity}`} cross />
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