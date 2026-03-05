import { Button } from "@mui/material";

export default function MenuButton({ label, icon: Icon, action, onKeyDown }: { label?: string, icon: React.ElementType, action: () => void, onKeyDown?: (e: React.KeyboardEvent) => void }) {
  return (
    <Button
        variant="contained"
        color="primary"
        onClick={action}
        onKeyDown={onKeyDown}
        sx={{
            width: "14rem",
            height: "2.8rem",
            padding: "0.8rem",
            boxShadow: "none",
            fontSize: "1.2rem",
            justifyContent: "flex-start",
            gap: "0.5rem",
            borderBottomLeftRadius: "0px",
            borderTopLeftRadius: "0px",
            "&:hover": { boxShadow: "none" },
        }}
    >
        <Icon sx={{ fontSize: 30 }} />
        {label}
    </Button>
  );
}