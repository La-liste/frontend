import { Typography, useMediaQuery, useTheme } from "@mui/material";

export default function TitlePage({ text, isCentered }: { text: string, isCentered?: boolean }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Typography variant={isMobile ? "h4" : "h3"} textAlign={isCentered ? "center" : undefined}>{text}</Typography>
    );
}