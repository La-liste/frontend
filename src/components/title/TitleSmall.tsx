import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useTranslation } from "react-i18next";

export default function TitleSmall() {
    const { t } = useTranslation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Stack
            direction="row"
            padding="24px 24px 0px 12px"
            alignItems="center"
            spacing={1}
        >
            <ReceiptIcon sx={{ fontSize: 40, display: "block" }} />
            <Typography variant={"h4"} sx={{ textAlign: "center", lineHeight: 1, whiteSpace: "nowrap" }}>
                {t("app.title")}
            </Typography>
        </Stack>
    );
}