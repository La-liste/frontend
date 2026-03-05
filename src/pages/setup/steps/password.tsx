import { useState, useRef, useEffect } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { PasswordInput, DefaultButton } from "../../../components";
import { Stack, Typography } from "@mui/material";
import { useTranslation, Trans } from "react-i18next";

export default function Password({ setStep }: { setStep: React.Dispatch<React.SetStateAction<number>> }) {
    const { t } = useTranslation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorVerify, setErrorVerify] = useState(false);
    const [helperPasswordText, setHelperPasswordText] = useState("");
    const [helperVerifyText, setHelperVerifyText] = useState("");
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const verifyRef = useRef<HTMLInputElement | null>(null);
    
    useEffect(() => {
        setErrorPassword(false);
        setHelperPasswordText("");
        passwordRef.current?.focus();
    }, []);

    useEffect(() => {
        setErrorPassword(false);
        setHelperPasswordText("");
    }, [password]);

    useEffect(() => {
        setErrorVerify(false);
        setHelperVerifyText("");
    }, [verifyPassword]);

    function handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === "Enter") {

            e.preventDefault();
            const target = e.target as HTMLElement | null;

            if (target === passwordRef.current) {
                verifyRef.current?.focus();
            }

            if (target === verifyRef.current) {
                validate();
            }
        }
    }

    function validate() {
        setErrorPassword(false);
        setHelperPasswordText("");
        setErrorVerify(false);
        setHelperVerifyText("");

        if (!password) {
            setErrorPassword(true);
            setHelperPasswordText(t("field.required"));
            return false;
        }

        if (!verifyPassword) {
            setErrorVerify(true);
            setHelperVerifyText(t("field.required"));
            return false;
        }

        if (password !== verifyPassword) {
            setErrorVerify(true);
            setHelperVerifyText(t("field.mismatch"));
            return false;
        }

        setStep(4);
    }

    return (
        <Stack
            spacing={4}
            sx={{ justifyContent: "center", alignItems: "center" }}
        >
            <Typography variant={isMobile ? "body1" : "h5"} sx={{ textAlign: "center" }}>
                <Trans
                    i18nKey="init.password.label"
                    components={[<br key="br" />]}
                />
            </Typography>
            <PasswordInput placeholder={t("auth.password")} value={password} variant={"outlined"} onChange={(e) => setPassword(e.target.value)} error={errorPassword} helperText={helperPasswordText} onKeyDown={handleKeyDown} inputRef={passwordRef} />
            <PasswordInput placeholder={t("auth.verify")} value={verifyPassword} variant={"outlined"} onChange={(e) => setVerifyPassword(e.target.value)} error={errorVerify} helperText={helperVerifyText} onKeyDown={handleKeyDown} inputRef={verifyRef} />
            <DefaultButton label={t("init.button.next")} action={validate} />
        </Stack>
    );
}