import { useState } from "react";
import { Stack, Typography, Divider, Pagination, useMediaQuery, useTheme } from "@mui/material";
import { IconButton, DefaultButton, TitlePage, DefaultDialog } from "../../../../../components";
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
  const ITEMS_PER_PAGE = 8;
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(users.length / ITEMS_PER_PAGE);
  const pagedUsers = users.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const [dialogOpen, setdialogOpen] = useState(false);

  const handleOpen = () => {
    setdialogOpen(true);
  };

  const handleClose = () => {
    setdialogOpen(false);
  };

  const handleConfirm = () => {
    setdialogOpen(false);
  };

  return (
    <Stack sx={{ maxWidth: 1200, width: "100%", margin: "0 auto", px: { xs: 1, sm: 2, md: 3 } }}>
      <TitlePage text={t("settings.admin.title")} isCentered />

      <Stack sx={{ maxWidth: 1200, width: "100%", margin: "24px auto" }}>
        <Stack direction="row">
          <Stack width={isMobile ? "35%" : "25%"}>
            <Typography variant={isMobile ? "h6" : "h5"} sx={{ minWidth: 0 }}>
              { isTablet ? t("settings.admin.users.mobile") : t("settings.admin.users.desktop") }
            </Typography>
          </Stack>
          <Stack width={"30%"}>
            <Typography variant={isMobile ? "h6" : "h5"} sx={{ minWidth: 0 }}>
              { isTablet ? t("settings.admin.admin.mobile") : t("settings.admin.admin.desktop") }
            </Typography>
          </Stack>
          <Stack>
            <Typography variant={isMobile ? "h6" : "h5"}>
              { isTablet ? t("settings.admin.actions.mobile") : t("settings.admin.actions.desktop") }
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ backgroundColor: "text.primary", height: "2.5px", mb: 2, width: isTablet ? "100%" : "85%" }} />

        {pagedUsers.map((user, index) => {
          const realIndex = (page - 1) * ITEMS_PER_PAGE + index;
          return (
          <Stack key={index}>
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                pb: 1,
              }}
            >
              <Stack width={isMobile ? "35%" : "25%"}>
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
              </Stack>

              <Stack width={"30%"}>
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
              </Stack>

              <Stack>
                <Stack direction="row" gap={1} sx={{ flexShrink: 0 }}>
                  <IconButton icon={EditIcon} action={() => navigate(`/settings/admin/${realIndex}/edit`)} />
                  <IconButton icon={DeleteIcon} action={handleOpen} />
                </Stack>
              </Stack>
            </Stack>
            <Divider sx={{ backgroundColor: "text.primary", mb: 1, width: isTablet ? "100%" : "85%", opacity: 0.5 }} />
          </Stack>
        );
        })}

        {pageCount > 1 && <Pagination count={pageCount} page={page} onChange={(_, value) => setPage(value)} color="primary" size={isTablet ? undefined : "large"} sx={{ mt: 1 }} />}

        <Stack sx={{ mt: 4 }}>
          <DefaultButton
            label={t("settings.admin.add.label")}
            action={() => navigate("/settings/admin/add")}
            icon={AddIcon}
          />
        </Stack>
      </Stack>

      <DefaultDialog title={t("settings.admin.dialog.title")} description={t("settings.admin.dialog.description")} open={dialogOpen} onConfirm={handleConfirm} onCancel={handleClose} />
    </Stack>
  );
}