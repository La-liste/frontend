import { useEffect } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { DefaultButton } from "../../../components";
import { Stack, Typography } from "@mui/material";
import { useTranslation, Trans } from "react-i18next";

export default function Welcome({ setStep }: { setStep: React.Dispatch<React.SetStateAction<number>> }) {
    const { t, i18n } = useTranslation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                const target = e.target as HTMLElement | null;
                if (target?.tagName === "BUTTON") return;
                setStep(2);
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [setStep]);

    function switchLanguage() {
        return () => {
            const newLang = i18n.language === "en" ? "fr" : "en";
            i18n.changeLanguage(newLang);
            localStorage.setItem("lang", newLang);
            localStorage.removeItem("i18nextLng");
        };
    }

    return (
        <>
            <Stack
                spacing={4}
                sx={{ justifyContent: "center", alignItems: "center" }}
            >
                <Typography variant={isMobile ? "body1" : "h5"} sx={{ textAlign: "center" }}>
                    <Trans
                        i18nKey="init.welcome.label"
                        values={{ appName: t("app.title") }}
                        components={[<br key="br" />]}
                    />
                </Typography>
                <DefaultButton label={t("init.button.start")} action={() => setStep(2)} />
                <Typography variant="body1" color="textSecondary" sx={{ textAlign: "center", cursor: "pointer", "&:hover": { textDecoration: "underline" } }} onClick={switchLanguage()}>
                    {t("init.welcome.language")}
                </Typography>
            </Stack>
        </>
    );
}