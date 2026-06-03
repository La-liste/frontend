import { FormControl, MenuItem, Select, useMediaQuery, useTheme } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";

export default function DefaultSelect({ label, variant, value, setValue, onChange, options }: { label?: string, variant: "standard" | "outlined" | "filled", value: string, setValue?: (value: string) => void, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void, options?: readonly string[] | readonly { value: string; label: string }[] }) {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.down("md"));

    function handleChange(event: SelectChangeEvent) {
        if (setValue) setValue(event.target.value);
    }

    return (
        <FormControl fullWidth>
            <Select
            labelId="select-label"
            id="select"
            value={value}
            label={label}
            variant={variant}
            size={isMobile ? "small" : "medium"}
            onChange={(e) => onChange ? onChange(e as any) : handleChange(e)}
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
            sx={{ backgroundColor: variant === "standard" ? undefined : "primary.main", color: "primary.contrastText", width: variant === "standard" ? (isTablet ? "6rem" : "150px") : "300px", height: variant === "standard" ? undefined : "45px", "& .MuiSvgIcon-root": { color: "primary.contrastText" }, fontSize: isTablet ? "0.8rem" : undefined, }}
            >
                {options?.map((option, index) => {
                    const val = typeof option === "string" ? option : option.value;
                    const lbl = typeof option === "string" ? option : option.label;
                    return <MenuItem key={index} value={val}>{lbl}</MenuItem>;
                })}
            </Select>
        </FormControl>
    );
}