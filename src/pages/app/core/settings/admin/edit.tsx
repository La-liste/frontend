import { useState } from "react";
import { Stack, Typography, Chip, useMediaQuery, useTheme } from "@mui/material";
import { TextInput, PasswordInput, DefaultButton, DefaultCheckbox, TitlePage, AutocompleteInput } from "../../../../../components";
import placeholderData from "../../../../../data/placeholder.json";
import CheckIcon from "@mui/icons-material/Check";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/œ/g, "oe")
    .replace(/æ/g, "ae")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

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

  const userHomes = user?.homes ?? [];
  const [addedHomes, setAddedHomes] = useState<string[]>(userHomes);
  const [availableHomes, setAvailableHomes] = useState<string[]>(
    placeholderData.homes.filter((h) => !userHomes.includes(h))
  );
  const [currentHome, setCurrentHome] = useState("");

  const handleHomeSelect = (value: string) => {
    const match = availableHomes.find((h) => normalize(h) === normalize(value.trim()));
    if (match) {
      setAddedHomes((prev) => [...prev, match]);
      setAvailableHomes((prev) => prev.filter((h) => h !== match));
      setCurrentHome("");
    }
  };

  const handleHomeDelete = (home: string) => {
    setAddedHomes((prev) => prev.filter((h) => h !== home));
    setAvailableHomes((prev) => [...prev, home]);
  };

  return (
    <Stack>
      <TitlePage text={t("settings.admin.edit.label")} isCentered />
      <Stack spacing={4} sx={{ maxWidth: 600, marginTop: 8, height: "70dvh" }}>
        <Typography variant={isMobile ? "h5" : isTablet ? "h5" : "h4"} sx={{ marginBottom: 2 }}>{t("common.informations")}</Typography>
        <Stack spacing={4}>
            <TextInput
              placeholder={t("auth.username")}
              variant="outlined"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />
            <PasswordInput placeholder={t("auth.password")} variant="outlined" onChange={() => {}} />
            <DefaultCheckbox
              label={t("settings.admin.edit.admin")}
              checked={isAdmin}
              action={() => setIsAdmin((prev) => !prev)}
            />
        </Stack>
        <Typography variant={isMobile ? "h5" : isTablet ? "h5" : "h4"} sx={{ marginBottom: 2, paddingTop: 2 }}>{t("settings.admin.add.homes")}</Typography>
        <Stack spacing={4}>
          <AutocompleteInput placeholder={t("settings.admin.add.search")} options={availableHomes} value={currentHome} onChange={(v) => setCurrentHome(v)} onSelect={handleHomeSelect} />
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {addedHomes.map((home) => (
              <Chip key={home} label={home} color="primary" onDelete={() => handleHomeDelete(home)} />
            ))}
          </Stack>
        </Stack>
      </Stack>
      <Stack sx={{ position: "absolute", bottom: isMobile ? 96 : 56, left: "50%", transform: "translateX(-50%)" }}>
        <DefaultButton label={t("settings.admin.edit.button")} icon={CheckIcon} action={() => navigate("/settings/admin")} />
      </Stack>
    </Stack>
  );
}