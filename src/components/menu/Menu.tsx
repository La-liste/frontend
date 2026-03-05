import { useState } from "react";
import { Box, Stack, Slide } from "@mui/material";
import { TitleSmall, MenuButton, MenuSelect } from "../";
import HomeIcon from "@mui/icons-material/Home";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import SettingsIcon from "@mui/icons-material/Settings";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import placeholderData from "../../data/placeholder.json";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface MenuProps {
  isMobile?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function Menu({ isMobile = false, isOpen = true, onToggle }: MenuProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const homes = placeholderData.homes;
  const [home, setHome] = useState(homes[0] ?? "");

  const handleNavigate = (path: string) => {
    navigate(path);
    if (isMobile) onToggle?.();
  };

  const content = (
    <Stack
      gap={4}
      sx={{
        width: 240,
        height: "100%",
        backgroundColor: "background.paper",
      }}
    >
      <TitleSmall />

      <MenuSelect value={home} setValue={setHome} options={homes}/>

      <Stack gap={2.5}>
        <MenuButton label={t("menu.home")} icon={HomeIcon} action={() => handleNavigate("/home")} />
        <MenuButton label={t("menu.lists")} icon={ReceiptIcon} action={() => handleNavigate("/lists")} />
        <MenuButton label={t("menu.inventory")} icon={AllInboxIcon} action={() => handleNavigate("/inventory")} />
        <MenuButton label={t("menu.recipes")} icon={LocalDiningIcon} action={() => handleNavigate("/recipes")} />
      </Stack>

      <Stack gap={2.5} sx={{ marginTop: "auto", marginBottom: 4 }}>
        <MenuButton label={t("menu.settings")} icon={SettingsIcon} action={() => handleNavigate("/settings")} />
        <MenuButton label={t("menu.logout")} icon={MeetingRoomIcon} action={() => handleNavigate("/login")} />
      </Stack>
    </Stack>
  );

  if (!isMobile) return content;

  return (
    <>
      {isOpen && (
        <Box
          onClick={onToggle}
          sx={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.3)", zIndex: 1200 }}
        />
      )}

      <Slide direction="right" in={isOpen} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100%",
            zIndex: 1500,
          }}
        >
          {content}
        </Box>
      </Slide>
    </>
  );
}