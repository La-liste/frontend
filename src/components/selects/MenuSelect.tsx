import { FormControl, MenuItem, Select } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import EditIcon from "@mui/icons-material/Edit";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function MenuSelect({ label, value, setValue, options }: { label?: string, value: string, setValue: (value: string) => void, options?: string[] }) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    function handleChange(event: SelectChangeEvent) {
        if (event.target.value === "last") {
            navigate("/settings/homes");
        } else {
            setValue(event.target.value);
        }
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
                    slotProps: {
                        root: { sx: { zIndex: 1700 } },
                        paper: {
                            sx: {
                                backgroundColor: "primary.main",
                                color: "primary.contrastText",
                                borderRadius: "8px",
                            },
                        },
                    },
                }}
                sx={{
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                    width: "90%",
                    height: "45px",
                    margin: "0 auto",
                    "& .MuiSvgIcon-root": { color: "primary.contrastText" },
                }}
            >
                {options?.map((option, index) => (
                    <MenuItem key={index} value={option}>{option}</MenuItem>
                ))}
                <MenuItem key={"last"} value={"last"} sx={{ gap: "0.5rem" }}>
                    <EditIcon /> {t("menu.manage")}
                </MenuItem>
            </Select>
        </FormControl>
    );
}