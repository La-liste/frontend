import { useState } from "react";
import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { TextInput, PasswordInput, DefaultButton, DefaultCheckbox, TitlePage } from "../../../../../components";
import placeholderData from "../../../../../data/placeholder.json";
import CheckIcon from "@mui/icons-material/Check";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

export default function EditAdminSettings() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const { id } = useParams();

  const user = id ? placeholderData.users[Number(id)] : undefined;
  const [name, setName] = useState(user?.name ?? "");
  const [isAdmin, setIsAdmin] = useState(user?.admin ?? false);

  return (
    <Stack>
      <TitlePage text={t("settings.admin.edit.label")} isCentered />
      <Stack spacing={4} sx={{ maxWidth: 600, marginTop: 8, height: "70dvh" }}>
        <Typography variant={isMobile ? "h5" : isTablet ? "h5" : "h4"} sx={{ marginBottom: 2 }}>{t("settings.admin.edit.informations")}</Typography>
        <Stack spacing={4}>
            <TextInput
              placeholder={t("settings.admin.edit.name")}
              variant="outlined"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />
            <PasswordInput placeholder={t("settings.admin.edit.password")} variant="outlined" onChange={() => {}} />
            <DefaultCheckbox
              label={t("settings.admin.edit.admin")}
              checked={isAdmin}
              action={() => setIsAdmin((prev) => !prev)}
            />
        </Stack>
      </Stack>
      <Stack sx={{ position: "absolute", bottom: isMobile ? 96 : 56, left: "50%", transform: "translateX(-50%)" }}>
        <DefaultButton label={t("settings.admin.edit.button")} icon={CheckIcon} action={() => navigate("/settings/admin")} />
      </Stack>
    </Stack>
  );
}