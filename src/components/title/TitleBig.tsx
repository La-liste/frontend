import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useTranslation } from "react-i18next";

export default function TitleBig() {
    const { t } = useTranslation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Stack
            position="absolute"
            top="10%"
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ display: 'flex', justifyContent: "center", mb: 2, color: "text.primary" }}
        >
            <ReceiptIcon sx={{ fontSize: isMobile ? 40 : 60, display: "block" }} />
            <Typography variant={isMobile ? "h4" : "h3"} sx={{ textAlign: "center", lineHeight: 1 }}>
                {t("app.title")}
            </Typography>
        </Stack>
    );
}