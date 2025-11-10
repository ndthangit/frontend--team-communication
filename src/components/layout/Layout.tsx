// Layout.tsx
import { CssBaseline, styled } from "@mui/material";
import { Box } from "@mui/material";
import styles from "./Layout.module.css";
import Sidebar from "./SideBar.tsx";
import Header from "./header/Header.tsx";
import React from "react";

interface LayoutProps {
    children: React.ReactNode;
}

const Main = styled("main")(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: "80px", // Chiều rộng của sidebar
    width: "calc(100% - 80px)",
    height: "calc(100vh - 64px)", // Trừ đi chiều cao header
    overflow: "auto",
    marginTop: "64px" // Đẩy main content xuống dưới header
}));

function Layout({ children }: LayoutProps) {
    return (
        <Box className={styles.root} sx={{ height: "100vh" }}>
            <CssBaseline />

            {/* Header - trên cùng, chiếm toàn bộ chiều ngang */}
            <Header />

            {/* Sidebar - bên trái, chiều cao full phần còn lại */}
            <Sidebar />

            {/* Main content - bên phải, chiều cao full phần còn lại */}
            <Main className={styles.mainContent}>
                {children}
            </Main>
        </Box>
    );
}

export default Layout;