import { useEffect } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { DefaultButton } from "../../../components";
import { Stack, Typography } from "@mui/material";
import { useTranslation, Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Done({ setNeedsSetup }: { setNeedsSetup: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { t } = useTranslation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const navigate = useNavigate();

    const finish = () => {
        setNeedsSetup(false);
        navigate("/login");
    };

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                const target = e.target as HTMLElement | null;

                if (
                    target?.tagName === "INPUT" ||
                    target?.tagName === "TEXTAREA" ||
                    target?.tagName === "SELECT" ||
                    target?.isContentEditable
                ) {
                    return;
                }

                if (target?.tagName === "BUTTON") return;
                finish();
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [setNeedsSetup]);

    return (
        <Stack
            spacing={4}
            sx={{ justifyContent: "center", alignItems: "center" }}
        >
            <Typography variant={isMobile ? "body1" : "h5"} sx={{ textAlign: "center" }}>
                <Trans
                    i18nKey="init.done.label"
                    values={{ appName: t("app.title") }}
                    components={[<br key="br" />]}
                />
            </Typography>
            <DefaultButton label={t("init.button.finish")} action={finish} />
        </Stack>
    );
}