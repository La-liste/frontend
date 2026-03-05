import { FormControl, MenuItem, Select } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";

export default function DefaultSelect({ label, value, setValue, options }: { label?: string, value: string, setValue: (value: string) => void, options?: string[] }) {

    function handleChange(event: SelectChangeEvent) {
        setValue(event.target.value);
    }

    return (
        <FormControl fullWidth>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label={label}
            onChange={handleChange}
            MenuProps={{
                PaperProps: {
                    sx: {
                        backgroundColor: "primary.main",
                        color: "primary.contrastText",
                        borderRadius: "8px",
                    }
                }
            }}
            sx={{ backgroundColor: "primary.main", color: "primary.contrastText", width: "300px", height: "45px", "& .MuiSvgIcon-root": { color: "primary.contrastText" } }}
            >
                {options?.map((option, index) => (
                    <MenuItem key={index} value={option}>{option}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}