import { useState, useRef, useEffect } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { TextInput, DefaultButton } from "../../../components";
import { Stack, Typography } from "@mui/material";
import { useTranslation, Trans } from "react-i18next";

export default function Username({ setStep }: { setStep: React.Dispatch<React.SetStateAction<number>> }) {
    const { t } = useTranslation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [username, setUsername] = useState("");
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState("");
    const usernameRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        usernameRef.current?.focus();
    }, []);

    useEffect(() => {
        setError(false);
        setHelperText("");
    }, [username]);

    function handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === "Enter") {
            validate();
        }
    }

    function validate() {
        setError(false);
        setHelperText("");

        if (!username) {
            setError(true);
            setHelperText(t("field.required"));
            return false;
        }

        setStep(3);
    }

    return (
        <Stack
            spacing={4}
            sx={{ justifyContent: "center", alignItems: "center" }}
        >
            <Typography variant={isMobile ? "body1" : "h5"} sx={{ textAlign: "center" }}>
                <Trans
                    i18nKey="init.user.label"
                    components={[<br key="br" />]}
                />
            </Typography>
            <TextInput placeholder={t("auth.username")} value={username} variant="outlined" onChange={(e) => setUsername(e.target.value)} error={error} helperText={helperText} onKeyDown={handleKeyDown} inputRef={usernameRef} />
            <DefaultButton label={t("init.button.next")} action={validate} />
        </Stack>
    );
}