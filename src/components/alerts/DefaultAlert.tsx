import { useEffect } from "react";
import { Snackbar } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function DefaultAlert({ content, success, setSuccess }: { content: string, success: boolean, setSuccess: React.Dispatch<React.SetStateAction<boolean>>; }) {
  
    const { t } = useTranslation();

    useEffect(() => {
        if (success) {
        const timer = setTimeout(() => {
            setSuccess(false);
        }, 2000);

        return () => clearTimeout(timer);
        }
    }, [success, setSuccess]);

    return (
    <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={success}
        autoHideDuration={2000}
        message={t(content)}
        sx={{ "& .MuiSnackbarContent-root": {
            backgroundColor: "primary.main",
            color: "text.primary"
        }, }}
    />
  );
}