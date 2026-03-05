import { Button, useMediaQuery, useTheme, Typography } from "@mui/material";

export default function BigButton({ label, icon: Icon, action }: { label?: string, icon?: React.ElementType, action: () => void }) {
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
            height: isMobile ? "3rem" : isTablet ? "3.5rem" : "4rem",
            padding: "0.8rem",
            boxShadow: "none",
            fontSize: "1.2rem",
            display: "flex",
            justifyContent: "flex-start ",
            alignItems: "center",
            margin: "12px auto",
            gap: "0.5rem",
            "&:hover": { boxShadow: "none" },
        }}
    >
        {Icon && <Icon sx={{ fontSize: isTablet ? 30 : 40 }} />}
        <Typography variant={isMobile ? "body1" : isTablet ? "h6" : "h5"}>{label}</Typography>
    </Button>
  );
}