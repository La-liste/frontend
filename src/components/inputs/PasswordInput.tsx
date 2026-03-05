import { TextField, useMediaQuery, useTheme } from "@mui/material";

export default function PasswordInput({ placeholder, value, variant, onChange, error, helperText, onKeyDown, inputRef }: { placeholder?: string, value?: string, variant: "outlined" | "filled" | "standard", onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void, error?: boolean, helperText?: string, onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void, inputRef?: React.Ref<HTMLInputElement> }) {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <TextField
            placeholder={placeholder}
            variant={variant}
            type="password"
            size={isMobile ? "small" : "medium"}
            value={value}
            onChange={onChange}
            error={error}
            helperText={helperText}
            onKeyDown={onKeyDown}
            inputRef={inputRef}
            sx={{
                width: isMobile ? "20rem" : isTablet ? "22rem" : "32rem",
            }}
        />
    );
}