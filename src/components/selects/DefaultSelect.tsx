import { FormControl, MenuItem, Select, useMediaQuery, useTheme } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";

export default function DefaultSelect({ label, variant, value, setValue, onChange, options }: { label?: string, variant: "standard" | "outlined" | "filled", value: string, setValue?: (value: string) => void, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void, options?: string[] }) {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.down("md"));

    function handleChange(event: SelectChangeEvent) {
        if (setValue) setValue(event.target.value);
    }

    return (
        <FormControl fullWidth>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label={label}
            variant={variant}
            size={isMobile ? "small" : "medium"}
            onChange={(e) => onChange ? onChange : handleChange(e)}
            MenuProps={{
                PaperProps: {
                    sx: {
                        backgroundColor: variant === "standard" ? undefined : "primary.main",
                        color: "primary.contrastText",
                        borderRadius: "8px",
                        "& .MuiMenuItem-root": {
                            fontSize: isTablet ? "0.8rem" : undefined,
                        },
                    }
                }
            }}
            sx={{ backgroundColor: variant === "standard" ? undefined : "primary.main", color: "primary.contrastText", width: variant === "standard" ? (isTablet ? "6rem" : "150px") : "300px", height: variant === "standard" ? undefined : "45px", caretColor: "transparent", "& .MuiSvgIcon-root": { color: "primary.contrastText" }, fontSize: isTablet ? "0.8rem" : undefined, }}
            >
                {options?.map((option, index) => (
                    <MenuItem key={index} value={option}>{option}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}