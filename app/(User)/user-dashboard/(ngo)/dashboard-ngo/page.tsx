"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  InputBase,
  Menu,
  MenuItem,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { PiCertificateDuotone, PiIdentificationCardDuotone } from "react-icons/pi";
import { LiaReceiptSolid } from "react-icons/lia";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import companylogo from "@/app/assets/adsource-logo.webp";

const routes = [
  { path: "/dashboard-ngo", name: "NGO", icon: <LiaReceiptSolid /> },
  { path: "/dashboard-ngo", name: "Solar Proposal", icon: <PiIdentificationCardDuotone /> },
  { path: "/dashboard-ngo", name: "Billing System", icon: <PiCertificateDuotone /> },
];

// 🔍 Styled components for search
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: { marginLeft: theme.spacing(1), width: "auto" },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: { width: "20ch" },
  },
}));

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:900px)");

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  // 🧭 Drawer (for mobile)
  const drawer = (
    <Box sx={{ width: 240, backgroundColor: "#0e1f47", color: "white", height: "100%" }}>
      <Typography variant="h6" sx={{ px: 2, py: 2 }}>
        Menu
      </Typography>
      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />
      <List>
        {routes.map((route) => (
          <ListItem
            key={route.path}
            component={Link}
            href={route.path}
            onClick={() => setMobileOpen(false)}
            sx={{
              color: "white",
              py: 1,
              display: "flex",
              alignItems: "center",
              gap: 1,
              "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
            }}
          >
            <ListItemIcon sx={{ color: "white" }}>{route.icon}</ListItemIcon>
            {route.name}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* ✅ NAVBAR */}
      <AppBar position="static" sx={{ backgroundColor: "#0e1f47" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Left: Menu (mobile only) + Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {isMobile && (
              <IconButton edge="start" color="inherit" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            )}
            <Image src={companylogo} alt="Logo" width={120} height={50} />
          </Box>

          {/* Center: Routes (desktop only) */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 5 }}>
              {routes.map((route) => (
                <Link
                  key={route.path}
                  href={route.path}
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: 20,
                    textAlign: "center"
                  }}
                >
                  {route.icon}
                  {route.name}
                  <Divider variant="middle" orientation="vertical" className="px-1" sx={{ borderColor: "white" }} />
                </Link>
              ))}
            </Box>
          )}

          {/* Right: Search + Profile */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
            </Search>

            <IconButton size="large" edge="end" color="inherit" onClick={handleMenu}>
              <AccountCircle />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={handleClose}> <Link href="/UserProfile">Profile</Link></MenuItem>
              <MenuItem onClick={handleClose}><Link href="/login">Logout</Link></MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* 📱 Drawer for mobile */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 } }}
      >
        {drawer}
      </Drawer>

      {/* 🧩 Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: "#f4f6fa" }}>
        <ToastContainer position="top-right" autoClose={3000} />
      </Box>

    </Box>
  );
}
