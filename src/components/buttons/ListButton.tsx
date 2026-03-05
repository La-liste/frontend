import { Button, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function ListButton({ label, items, isShared, action }: { label: string, items: any[], isShared?: boolean, action: () => void }) {
    const { t } = useTranslation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Button
        variant="contained"
        color="primary"
        onClick={action}
        sx={{
            width: isMobile ? "20rem" : isTablet ? "24rem" : "38rem",
            padding: "0.8rem",
            boxShadow: "none",
            fontSize: "1.2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start ",
            alignItems: "flex-start",
            gap: "0.5rem",
            "&:hover": { boxShadow: "none" },
        }}
    >
        <Typography variant={isMobile ? "body1" : isTablet ? "h6" : "h5"}>{label}</Typography>

        <Stack sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.25rem" }}>
        {items.slice(0, 2).map((item, index) => (
            <Typography key={index} variant="body2">
                - {item.name} {item.quantity}
            </Typography>
        ))}
        {items.length > 2 && <Typography variant="body2">...</Typography>}
        </Stack>

        {isShared && <Typography variant={"body1"} sx={{ position: "absolute", bottom: "0.5rem", right: "1rem" }}>{t("lists.shared")}</Typography>}
    </Button>
  );
}