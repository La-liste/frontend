import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { TextInput, PasswordInput, DefaultButton, TitlePage } from "../../../../components";
import CheckIcon from "@mui/icons-material/Check";
import { useTranslation } from "react-i18next";

export default function AccountSettings() {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Stack>
      <TitlePage text={t("settings.account.title")} isCentered />
      <Stack spacing={4} sx={{ maxWidth: 600, marginTop: 8, height: "70dvh" }}>
        <Typography variant={isMobile ? "h5" : isTablet ? "h5" : "h4"} sx={{ marginBottom: 2 }}>{t("settings.account.informations")}</Typography>
        <TextInput placeholder={t("auth.username")} variant="outlined" onChange={() => {}} />

        <Typography variant={isMobile ? "h5" : isTablet ? "h5" : "h4"} sx={{ marginBottom: 2 }}>{t("settings.account.security")}</Typography>
        <PasswordInput placeholder={t("auth.password")} variant="outlined" onChange={() => {}} />
        <PasswordInput placeholder={t("auth.verify")} variant="outlined" onChange={() => {}} />
      </Stack>
      <Stack direction="row" justifyContent="center" sx={{ mt: "auto", mb: 4 }}>
        <DefaultButton label={t("settings.buttons.save")} icon={CheckIcon} action={() => {}} />
      </Stack>
    </Stack>
  );
}