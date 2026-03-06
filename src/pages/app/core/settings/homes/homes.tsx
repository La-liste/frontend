import { Stack, Typography, Divider, useMediaQuery, useTheme } from "@mui/material";
import { IconButton, DefaultButton, TitlePage } from "../../../../../components";
import placeholderData from "../../../../../data/placeholder.json";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function HomeSettings() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const homes = placeholderData.homes;

return (
  <Stack sx={{ maxWidth: 1200, width: "100%", margin: "0 auto" }}>
    <TitlePage text={t("settings.homes.title")} isCentered />

      <Stack sx={{ maxWidth: 1200, width: "100%", margin: "24px auto" }}>
        <Stack direction="row">
          <Stack
            width={isMobile ? "65%" : "45%"}
          >
            <Typography variant="h5" sx={{ minWidth: 0 }}>
              {t("settings.homes.homes")}
            </Typography>
          </Stack>
          <Stack>
            <Typography variant="h5">
              {t("settings.homes.actions")}
            </Typography>
        </Stack>
      </Stack>

      <Divider sx={{ backgroundColor: "text.primary", height: "2.5px", width: isMobile ? "100%" : "85%", mb: 2 }} />

      {homes.map((home, index) => (
        <Stack sx={{ maxWidth: 1200, width: "100%", margin: "6px auto 0px" }} key={index}>
          <Stack direction="row" alignItems={"center"} sx={{ pb: 1 }}>
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
                {home}
              </Typography>
            </Stack>
            <Stack>
              <Stack direction="row" gap={1}>
                <IconButton icon={EditIcon} action={() => navigate(`/settings/homes/${index}/edit`)} />
                <IconButton icon={DeleteIcon} action={() => {}} />
              </Stack>
            </Stack>
          </Stack>
          <Divider sx={{ backgroundColor: "text.primary", mb: 1, width: isMobile ? "100%" : "85%", opacity: 0.5 }} />
        </Stack>
      ))}

      <Stack sx={{ mt: 4 }}>
        <DefaultButton
          label={t("settings.homes.add.label")}
          action={() => navigate("/settings/homes/add")}
          icon={AddIcon}
        />
      </Stack>
    </Stack>
  </Stack>
);
}