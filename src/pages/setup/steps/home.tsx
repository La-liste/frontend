import { useState, useRef, useEffect } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { TextInput, DefaultButton } from "../../../components";
import { Stack, Typography } from "@mui/material";
import { useTranslation, Trans } from "react-i18next";

export default function Home({ setStep }: { setStep: React.Dispatch<React.SetStateAction<number>> }) {
    const { t } = useTranslation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [home, setHome] = useState("");
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState("");
    const homeRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        homeRef.current?.focus();
    }, []);

    useEffect(() => {
        setError(false);
        setHelperText("");
    }, [home]);

    function handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === "Enter") {
            validate();
        }
    }

    function validate() {
        setError(false);
        setHelperText("");

        if (!home) {
            setError(true);
            setHelperText(t("field.required"));
            return false;
        }

        setStep(5);
    }
    
    return (
        <Stack
            spacing={4}
            sx={{ justifyContent: "center", alignItems: "center" }}
        >
            <Typography variant={isMobile ? "body1" : "h5"} sx={{ textAlign: "center" }}>
                <Trans
                    i18nKey="init.home.label"
                    components={[<br key="br" />]}
                />
            </Typography>
            <TextInput placeholder={t("init.home.input")} value={home} variant="outlined" onChange={(e) => setHome(e.target.value)} error={error} helperText={helperText} onKeyDown={handleKeyDown} inputRef={homeRef} />
            <DefaultButton label={t("init.button.next")} action={validate} />
        </Stack>
    );
}