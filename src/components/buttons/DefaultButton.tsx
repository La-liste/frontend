import { Button, useMediaQuery, useTheme } from "@mui/material";

export default function DefaultButton({ label, icon: Icon, action, onKeyDown }: { label?: string, icon?: React.ElementType, action: () => void, onKeyDown?: (e: React.KeyboardEvent) => void }) {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Button
        variant="contained"
        color="primary"
        onClick={action}
        onKeyDown={onKeyDown}
        sx={{
            width: isMobile ? "18rem" : "20rem",
            height: isMobile ? "2.5rem" : "3rem",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.8rem",
            boxShadow: "none",
            fontSize: "1rem",
            lineHeight: 1.2,
            "&:hover": { boxShadow: "none" },
        }}
    >
      {Icon && <Icon sx={{ fontSize: isMobile ? 25 : 30, marginRight: 1 }} />}
      {label}
    </Button>
  );
}