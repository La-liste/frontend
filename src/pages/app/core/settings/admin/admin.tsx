import { Stack, Typography, Divider, useMediaQuery, useTheme } from "@mui/material";
import { IconButton, DefaultButton, TitlePage } from "../../../../../components";
import placeholderData from "../../../../../data/placeholder.json";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function AdminSettings() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const users = placeholderData.users;

  return (
    <Stack sx={{ maxWidth: 1200, width: "100%", margin: "0 auto", px: { xs: 1, sm: 2, md: 3 } }}>
      <TitlePage text={t("settings.admin.title")} isCentered />

      <Stack sx={{ mt: 4 }}>
        <Stack
          sx={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr) auto",
            alignItems: "center",
            columnGap: 2,
            mb: 1,
          }}
        >
          <Typography variant={isMobile ? "h6" : "h5"} sx={{ minWidth: 0 }}>
            { isTablet ? t("settings.admin.users.mobile") : t("settings.admin.users.desktop") }
          </Typography>
          <Typography variant={isMobile ? "h6" : "h5"} sx={{ minWidth: 0 }}>
            { isTablet ? t("settings.admin.admin.mobile") : t("settings.admin.admin.desktop") }
          </Typography>
          <Typography variant={isMobile ? "h6" : "h5"}> 
            { isTablet ? t("settings.admin.actions.mobile") : t("settings.admin.actions.desktop") }
          </Typography>
        </Stack>

        <Divider sx={{ backgroundColor: "text.primary", height: "2.5px", mb: 2 }} />

        {users.map((user, index) => (
          <Stack
            key={index}
            sx={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr) auto",
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
              {user.name}
            </Typography>

            <Typography
              variant={isMobile ? "h6" : "h5"}
              sx={{ minWidth: 0 }}
            >
              {user.admin ? (
                <CheckIcon sx={{ fontSize: isMobile ? 24 : 36 }} />
              ) : (
                <CloseIcon sx={{ fontSize: isMobile ? 24 : 36 }} />
              )}
            </Typography>

            <Stack direction="row" gap={1} sx={{ flexShrink: 0 }}>
              <IconButton icon={EditIcon} action={() => navigate(`/settings/admin/${index}/edit`)} />
              <IconButton icon={DeleteIcon} action={() => {}} />
            </Stack>
          </Stack>
        ))}

        <Stack sx={{ mt: 4 }}>
          <DefaultButton
            label={t("settings.admin.add.label")}
            action={() => navigate("/settings/admin/add")}
            icon={AddIcon}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}