import { Stack, Typography, Divider, useMediaQuery, useTheme } from "@mui/material";
import { TitlePage, DefaultButton } from "../../../../components";
import placeholderData from "../../../../data/placeholder.json";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Inventory() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const items = placeholderData.items;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <TitlePage text={t("inventory.title")} isCentered />

      <Stack sx={{ mt: 4, maxWidth: 1200, width: "100%", margin: "24px auto", px: { xs: 1, sm: 2, md: 3 } }}>
            <Stack
              sx={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr) auto",
                alignItems: "center",
                columnGap: 2,
                mb: 1,
              }}
            >
              <Typography variant="h5" sx={{ minWidth: 0 }}>
                {t("inventory.name")}
              </Typography>
              <Typography variant="h5">{t("inventory.quantity")}</Typography>
            </Stack>
      
            <Divider sx={{ backgroundColor: "text.primary", height: "2.5px", mb: 2 }} />
      
            {items.map((item, index) => (
              <Stack
                key={index}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr) auto",
                  alignItems: "center",
                  columnGap: 2,
                  mb: 2,
                }}
              >
                <Typography
                  variant={isMobile ? "h6" : "h5"}
                  sx={{
                    minWidth: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.name}
                </Typography>
      
                <Stack direction="row" gap={1} sx={{ flexShrink: 0 }}>
                  <Typography
                    variant={isMobile ? "h6" : "h5"}
                    sx={{
                      minWidth: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.quantity}
                  </Typography>
                </Stack>
              </Stack>
            ))}
      
            <Stack sx={{ mt: 4 }}>
              <DefaultButton
                label={t("inventory.edit")}
                action={() => navigate("/inventory/edit")}
                icon={EditIcon}
              />
            </Stack>
          </Stack>
    </>
  );
}