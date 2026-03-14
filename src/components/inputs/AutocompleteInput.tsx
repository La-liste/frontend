import {
  Autocomplete,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";

type Props = {
  placeholder?: string;
  value?: string;
  variant?: "outlined" | "filled" | "standard";
  type?: string;
  options: string[];
  strict?: boolean;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: boolean;
  helperText?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef?: React.Ref<HTMLInputElement>;
  onSelect?: (value: string) => void;
};

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/œ/g, "oe")
    .replace(/æ/g, "ae")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function AutocompleteInput({
  placeholder,
  value = "",
  variant = "outlined",
  type,
  options,
  strict = false,
  onChange,
  onBlur,
  error,
  helperText,
  onKeyDown,
  inputRef,
  onSelect,
}: Props) {
  const MIN_QUERY_LENGTH = 2;
  const [isEditing, setIsEditing] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const normalizedInput = normalize(value.trim());

  const filteredOptions =
    normalizedInput.length >= MIN_QUERY_LENGTH
      ? options
          .filter((o) => normalize(o).includes(normalizedInput))
          .slice(0, 80)
      : [];

  const hasSuggestions = filteredOptions.length > 0;

  return (
    <Autocomplete
      freeSolo
      options={filteredOptions}
      open={isEditing && hasSuggestions}
      value={null}
      inputValue={value}
      onInputChange={(_, newValue, reason) => {
        if (reason === "input" || reason === "clear") {
          onChange?.(newValue);
          setIsEditing(true);
        } else if (reason === "reset") {
          setIsEditing(true);
        }
      }}
      onChange={(_, newValue) => {
        if (typeof newValue === "string") {
          if (onSelect) {
            onSelect(newValue);
          } else {
            onChange?.(newValue);
          }
        }
        setIsEditing(false);
      }}
      onClose={(_, reason) => {
        setIsEditing(false);
        if (strict && reason === "blur") {
          const normalized = normalize(value.trim());
          if (normalized && !options.some((o) => normalize(o) === normalized)) {
            onChange?.("");
          }
        }
      }}
      getOptionLabel={(option) => option}
      isOptionEqualToValue={(option, val) => option === val}
      noOptionsText={null}
      slotProps={{
        paper: {
          sx: {
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
            borderRadius: "12px",
            mt: 0.5,
          },
        },
        listbox: {
          sx: {
            maxHeight: 220,
            overflowY: "auto",
            "& .MuiAutocomplete-option": {
              fontSize: isTablet ? "0.8rem" : undefined,
            },
            "&::-webkit-scrollbar": { width: "6px" },
            "&::-webkit-scrollbar-track": { background: "transparent" },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(255,255,255,0.25)",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "rgba(255,255,255,0.4)",
            },
          },
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          variant={variant}
          size={isMobile ? "small" : "medium"}
          error={error}
          helperText={helperText}
          inputRef={inputRef}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          sx={{
            width: type === "small" ? "100%" : (isMobile ? "20rem" : isTablet ? "22rem" : "32rem"),
            ...(type === "big" && {
              "& .MuiInputBase-input": {
                fontSize: "2rem",
              },
            }),
          }}
        />
      )}
    />
  );
}