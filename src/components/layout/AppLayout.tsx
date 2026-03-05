import { ReactNode, useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "../menu/Menu";
import IconButton from "../buttons/IconButton";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const drawerWidth = 240;

  return (
    <Box sx={{ display: "flex", minHeight: "100dvh" }}>
      
      {!isMobile && (
        <Box
          sx={{
            width: drawerWidth,
            flexShrink: 0,
          }}
        >
          <Menu />
        </Box>
      )}

      <Box
        sx={{
          flexGrow: 1,
          padding: 3,
          position: "relative",
        }}
      >
        {isMobile && (
          <Box
            sx={{
              position: "fixed",
              bottom: 16,
              left: 16,
              zIndex: 1400,
            }}
          >
            <IconButton
              icon={MenuIcon}
              fixedSize={true}
              action={() => setIsMenuOpen(true)}
            />
          </Box>
        )}

        {children}
      </Box>

      {isMobile && (
        <Menu
          isMobile
          isOpen={isMenuOpen}
          onToggle={() => setIsMenuOpen(false)}
        />
      )}
    </Box>
  );
}