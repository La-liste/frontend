import { useState, useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import { DefaultSelect, TitlePage } from "../../../../components";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES } from "../../../../i18n";

type ThemeOption = { name: string; value: string };

export default function GeneralSettings() {
  const { t, i18n } = useTranslation();

  const languages = Object.values(SUPPORTED_LANGUAGES);

  const [language, setLanguage] = useState<string>(
    SUPPORTED_LANGUAGES[i18n.language] ?? "English"
  );

  const themes = t("settings.general.themes", { returnObjects: true }) as ThemeOption[];
  const themeNames = themes.map((th) => th.name);

  const storedThemeValue = localStorage.getItem("theme") ?? themes[0]?.value ?? "";
  const [themeValue, setThemeValue] = useState<string>(storedThemeValue);
  const selectedThemeName =
    themes.find((th) => th.value === themeValue)?.name ?? themes[0]?.name ?? "";

  useEffect(() => {
    const langCode = Object.entries(SUPPORTED_LANGUAGES).find(
      ([, label]) => label === language
    )?.[0];

    if (langCode) {
      i18n.changeLanguage(langCode);
      localStorage.setItem("lang", langCode);
      localStorage.removeItem("i18nextLng");
    }
  }, [language, i18n]);

  useEffect(() => {
      const current = localStorage.getItem("theme");
      if (current !== themeValue) {
        localStorage.setItem("theme", themeValue);
        window.location.reload();
      }
    }, [themeValue]);

  return (
    <Stack>
      <TitlePage text={t("settings.general.title")} isCentered />

      <Stack spacing={2} sx={{ maxWidth: 600, marginTop: 8 }}>
        <Typography variant="h5">{t("settings.general.language")}</Typography>
        <DefaultSelect options={languages} value={language} setValue={setLanguage} />
      </Stack>

      <Stack spacing={2} sx={{ maxWidth: 600, marginTop: 6 }}>
        <Typography variant="h5">{t("settings.general.theme")}</Typography>
        <DefaultSelect
          options={themeNames}
          value={selectedThemeName}
          setValue={(themeName: string) => {
            const selected = themes.find((th) => th.name === themeName);
            if (selected) setThemeValue(selected.value);
          }}
        />
      </Stack>
    </Stack>
  );
}