import { useState, useEffect, useRef } from "react";
import { Stack, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { TitleBig, TextInput, PasswordInput, DefaultButton } from "../../../components";

export default function Login({ setIsLogin }: { setIsLogin: React.Dispatch<React.SetStateAction<boolean>> }) {

    const { t } = useTranslation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const [usernameError, setUsernameError] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [helperUsernameText, setHelperUsernameText] = useState("");
    const [helperPasswordText, setHelperPasswordText] = useState("");
    
    useEffect(() => {
        usernameRef.current?.focus();
    }, []);

    useEffect(() => {
        setUsernameError(false);
        setHelperUsernameText("");
    }, [username]);

    useEffect(() => {
        setErrorPassword(false);
        setHelperPasswordText("");
    }, [password]);

    function handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === "Enter") {

            e.preventDefault();
            const target = e.target as HTMLElement | null;

            if (target === usernameRef.current) {
                passwordRef.current?.focus();
            }

            if (target === passwordRef.current) {
                validate();
            }
        }
    }

    function validate() {
        setUsernameError(false);
        setHelperUsernameText("");
        setErrorPassword(false);
        setHelperPasswordText("");

        if (!username) {
            setUsernameError(true);
            setHelperUsernameText(t("field.required"));
            return false;
        }

        if (!password) {
            setErrorPassword(true);
            setHelperPasswordText(t("field.required"));
            return false;
        }

        setIsLogin(true);
    }

    return (
        <Stack spacing={isMobile ? 5 : 8} sx={{ justifyContent: "center", alignItems: "center", minHeight: "80dvh" }}>
            <TitleBig />
            <Stack spacing={4} sx={{ justifyContent: "center", alignItems: "center" }}>
                <TextInput placeholder={t("auth.username")} value={username} variant="outlined" onChange={(e) => setUsername(e.target.value)} error={usernameError} helperText={helperUsernameText} onKeyDown={handleKeyDown} inputRef={usernameRef} />
                <PasswordInput placeholder={t("auth.password")} value={password} variant="outlined" onChange={(e) => setPassword(e.target.value)} error={errorPassword} helperText={helperPasswordText} onKeyDown={handleKeyDown} inputRef={passwordRef} />
                <DefaultButton label={t("auth.button")} action={validate} />
            </Stack>
        </Stack>
    );
}