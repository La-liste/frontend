import { Stack } from "@mui/material";
import { BigButton, TitlePage } from "../../../../components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

export default function Settings() {

  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Stack gap={4} sx={{ maxWidth: 600, width: "100%", margin: "0 auto" }}>
      <TitlePage text={t("settings.title")} isCentered />
      <Stack>
        <BigButton label={t("settings.buttons.general")} icon={SettingsIcon} action={() => navigate("/settings/general")} />
        <BigButton label={t("settings.buttons.account")} icon={PersonIcon} action={() => navigate("/settings/account")} />
        <BigButton label={t("settings.buttons.homes")} icon={HomeIcon} action={() => navigate("/settings/homes")} />
        <BigButton label={t("settings.buttons.admin")} icon={ManageAccountsIcon} action={() => navigate("/settings/admin")} />
      </Stack>
    </Stack>
  );
}