import { useState } from "react";
import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { TextInput, DefaultButton, TitlePage } from "../../../../../components";
import placeholderData from "../../../../../data/placeholder.json";
import CheckIcon from "@mui/icons-material/Check";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

export default function EditHomeSettings() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const { id } = useParams();

  const home = id ? placeholderData.homes[Number(id)] : undefined;
  const [name, setName] = useState(home ?? "");

  return (
    <Stack>
      <TitlePage text={t("settings.homes.edit.label")} isCentered />
      <Stack spacing={4} sx={{ maxWidth: 600, marginTop: 8, height: "70dvh" }}>
        <Typography variant={isMobile ? "h5" : isTablet ? "h5" : "h4"} sx={{ marginBottom: 2 }}>{t("settings.homes.edit.informations")}</Typography>
        <TextInput
          placeholder={t("settings.homes.edit.name")}
          variant="outlined"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
      </Stack>
      <Stack sx={{ position: "absolute", bottom: isMobile ? 96 : 56, left: "50%", transform: "translateX(-50%)" }}>
        <DefaultButton label={t("settings.homes.edit.button")} icon={CheckIcon} action={() => navigate("/settings/homes")} />
      </Stack>
    </Stack>
  );
}