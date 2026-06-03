import { useState, useContext, useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import { DefaultSelect, TitlePage } from "../../../../components";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES } from "../../../../i18n";
import { ThemeContext, ColorContext } from "../../../../theme";

type ThemeOption = { name: string; value: string };
type ColorOption = { name: string; value: string };

export default function GeneralSettings() {
  const { t, i18n } = useTranslation();
  const { setThemeKey } = useContext(ThemeContext);
  const { setColorKey } = useContext(ColorContext);

  const languages = Object.values(SUPPORTED_LANGUAGES);

  const [language, setLanguage] = useState<string>(
    SUPPORTED_LANGUAGES[i18n.language] ?? "English"
  );

  const themes = t("settings.general.themes", { returnObjects: true }) as ThemeOption[];
  const themeNames = themes.map((th) => th.name);

  const colors = t("settings.general.colors", { returnObjects: true }) as ColorOption[];
  const colorNames = colors.map((cl) => cl.name);

  const storedThemeValue = localStorage.getItem("theme") ?? themes[0]?.value ?? "";
  const [themeValue, setThemeValue] = useState<string>(storedThemeValue);
  const selectedThemeName =
    themes.find((th) => th.value === themeValue)?.name ?? themes[0]?.name ?? "";

  const storedColorValue = localStorage.getItem("color") ?? colors[0]?.value ?? "";
  const [colorValue, setColorValue] = useState<string>(storedColorValue);
  const selectedColorName =
    colors.find((cl) => cl.value === colorValue)?.name ?? colors[0]?.name ?? "";

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

  return (
    <Stack>
      <TitlePage text={t("settings.general.title")} isCentered />

      <Stack spacing={2} sx={{ maxWidth: 600, marginTop: 8 }}>
        <Typography variant="h5">{t("settings.general.language")}</Typography>
        <DefaultSelect value={language} setValue={setLanguage} variant={"outlined"} options={languages} />
      </Stack>

      <Stack spacing={2} sx={{ maxWidth: 600, marginTop: 6 }}>
        <Typography variant="h5">{t("settings.general.theme")}</Typography>
        <DefaultSelect
          value={selectedThemeName}
          setValue={(themeName: string) => {
            const selected = themes.find((th) => th.name === themeName);
            if (selected) {
              setThemeValue(selected.value);
              setThemeKey(selected.value);
            }
          }}
          variant={"outlined"}
          options={themeNames}
        />
      </Stack>

      <Stack spacing={2} sx={{ maxWidth: 600, marginTop: 6 }}>
        <Typography variant="h5">{t("settings.general.color")}</Typography>
        <DefaultSelect
          value={selectedColorName}
          setValue={(colorName: string) => {
            const selected = colors.find((cl) => cl.name === colorName);
            if (selected) {
              setColorValue(selected.value);
              setColorKey(selected.value);
            }
          }}
          variant={"outlined"}
          options={colorNames}
        />
      </Stack>
    </Stack>
  );
}