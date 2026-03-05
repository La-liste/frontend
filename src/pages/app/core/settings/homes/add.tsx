import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { TextInput, DefaultButton, TitlePage } from "../../../../../components";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function AddHomeSettings() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Stack>
      <TitlePage text={t("settings.homes.add.label")} isCentered />
      <Stack spacing={4} sx={{ maxWidth: 600, marginTop: 8, height: "70dvh" }}>
          <Typography variant={isMobile ? "h5" : isTablet ? "h5" : "h4"} sx={{ marginBottom: 2 }}>{t("settings.homes.add.informations")}</Typography>
          <TextInput placeholder={t("settings.homes.add.name")} variant="outlined" onChange={() => {}} />
      </Stack>
      <Stack sx={{ position: "absolute", bottom: isMobile ? 96 : 56, left: "50%", transform: "translateX(-50%)" }}>
        <DefaultButton label={t("settings.homes.add.button")} icon={AddIcon} action={() => navigate("/settings/homes")} />
      </Stack>
    </Stack>
  );
}