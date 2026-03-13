import { useState } from "react";
import { FormControlLabel, Checkbox } from "@mui/material";

export default function DefaultCheckbox({ label, cross, checked, action }: { label: string, cross?: boolean, checked?: boolean, action?: () => void }) {

    const [check, setCheck] = useState(false);
    const isChecked = checked ?? check;

    const isStriked = isChecked && cross;

    return (
        <FormControlLabel
            control={
                <Checkbox
                    color="default"
                    onClick={action}
                    checked={isChecked}
                    onChange={(e) => setCheck(e.target.checked)}
                    sx={{
                        color: "text.primary",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "none",
                        padding: 0,
                        '& .MuiSvgIcon-root': { fontSize: 28 },
                    }}
                >
                </Checkbox>
            }
            label={label}
            sx={{
                width: "100%",
                height: "fit-content",
                alignItems: "center",
                justifyContent: "flex-start",
                boxShadow: "none",
                textDecoration: isStriked ? "line-through" : "none",
                gap: 1,
                "&:hover": { boxShadow: "none" },
            }}
        />
    );
}