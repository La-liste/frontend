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
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <TitlePage text={t("inventory.title")} isCentered />

      <Stack sx={{ mt: 4, maxWidth: 1200, width: "100%", margin: "24px auto" }}>
        <Stack direction="row">
          <Stack
            width={isMobile ? "65%" : "45%"}
          >
            <Typography variant="h5">
              {t("inventory.name")}
            </Typography>
          </Stack>
          <Stack>
            <Typography variant="h5">
              {t("inventory.quantity")}
            </Typography>
          </Stack>
        </Stack>
      
        <Divider sx={{ backgroundColor: "text.primary", height: "2.5px", mb: 2, width: isTablet ? "100%" : "85%" }} />
  
        {items.map((item, index) => (
          <>
          <Stack direction="row" sx={{ mt: 0, mb: 1 }} key={index}>
          <Stack
            width={isMobile ? "65%" : "45%"}
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
          </Stack>
          <Stack>
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
          <Divider sx={{ backgroundColor: "text.primary", mb: 2, width: isTablet ? "100%" : "85%", opacity: 0.5 }} />
          </>
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