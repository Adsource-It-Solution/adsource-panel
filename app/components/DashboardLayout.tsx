"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  MenuItem,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from '@mui/icons-material/Logout';
import { PiCertificateDuotone, PiIdentificationCardDuotone } from "react-icons/pi";
import { LiaReceiptSolid } from "react-icons/lia";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import companylogo from "@/app/assets/adsource-logo.webp";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const mainSections = [
  { name: "NGO" },
  { name: "Solar Proposal" },
  { name: "Billing System" },
];

const NGOroutes = [
  { path: "/user-dashboard/dashboard-ngo/receipt", name: "Receipt", icon: <LiaReceiptSolid />, roles: ["ngo", "admin"] },
  { path: "/user-dashboard/dashboard-ngo/id", name: "ID", icon: <PiIdentificationCardDuotone />, roles: ["ngo", "admin"] },
  { path: "/user-dashboard/dashboard-ngo/certificate", name: "Certificate", icon: <PiCertificateDuotone />, roles: ["ngo", "admin"] },
];

const SolarRoutes = [
  { path: "/user-dashboard/dashboard-solar/proposal", name: "Proposal", icon: <PiIdentificationCardDuotone />, roles: ["ngo", "admin"] },
  { path: "/user-dashboard/dashboard-solar/proposal-list", name: "Certificate", icon: <PiCertificateDuotone />, roles: ["ngo", "admin"] },
];

const BillingRoutes = [
  { path: "/user-dashboard/dashboard-billing/invoice", name: "Invoice", icon: <LiaReceiptSolid />, roles: ["ngo", "admin"] },
  { path: "/user-dashboard/dashboard-billing/summary", name: "Summary", icon: <PiCertificateDuotone />, roles: ["ngo", "admin"] },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const isMobile = useMediaQuery("(max-width:900px)");
  const router = useRouter();
  const [company, setCompany] = useState({
    logo: "",
    name: "",
    address: "",
    registrationNumber: "",
    panNumber: "",
    gstNumber: "",
  });
  const [, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [loadingCompany, setLoadingCompany] = useState(true);

  // ✅ Fetch logged-in user and company details
  useEffect(() => {
    async function fetchCompany() {
      console.log("🚀 Starting company fetch...");

      try {
        // 1️⃣ Fetch user info first
        console.log("🧑 Fetching current user info...");
        const userRes = await fetch("/api/auth/me");

        if (!userRes.ok) throw new Error(`❌ User fetch failed: ${userRes.status}`);

        const userData = await userRes.json();
        console.log("✅ User data received:", userData);

        const userid = userData?.id; // 👈 FIXED HERE
        if (!userid) {
          console.warn("⚠ No user ID found in /api/auth/me response");
          setLoadingCompany(false);
          return;
        }

        // 2️⃣ Fetch company data
        console.log(`🏢 Fetching company data for user ID: ${userid}`);
        const companyRes = await fetch(`/api/User/updateCompany/${userid}`, {
          method: "GET",
          cache: "no-store",
        });

        console.log("📡 API response status:", companyRes.status);

        if (!companyRes.ok)
          throw new Error(`❌ Failed to fetch company: ${companyRes.status}`);

        const data = await companyRes.json();
        console.log("📦 Full company response:", data);

        if (data.company) {
          console.log("✅ Setting company state:", data.company);
          setCompany(data.company);
        } else {
          console.warn("⚠ No company data found in response");
        }
      } catch (err) {
        console.error("❌ Failed to fetch company:", err);
      } finally {
        console.log("🏁 Finished company fetch");
        setLoadingCompany(false);
      }
    }

    fetchCompany();
  }, []);

  // ✅ Decode JWT from cookie
  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("/api/auth/me");
      if (!res.ok) {
        router.replace("/not-authenticated");
        return;
      }
      const data = await res.json();
      console.log("🧠 User role from /api/auth/me:", data.role);
      setUserRole(data.role);
    }

    fetchUser();
  }, [router]);


  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    console.log("📂 Account menu opened");
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    console.log("📁 Account menu closed");
    setAnchorEl(null);
  };
  const handleDrawerToggle = () => {
    console.log("📱 Drawer toggle");
    setMobileOpen(!mobileOpen);
  };

  const getSubRoutes = () => {
    const allRoutes =
      activeSection === "NGO"
        ? NGOroutes
        : activeSection === "Solar Proposal"
          ? SolarRoutes
          : activeSection === "Billing System"
            ? BillingRoutes
            : [];

    // 🧠 Handle both array and string roles
    if (!userRole) {
      console.log("⚠️ No userRole found");
      return [];
    }

    const userRoles = Array.isArray(userRole) ? userRole : [userRole];

    const filtered = allRoutes.filter((route) => {
      if (!route.roles) return true; // route has no role restriction
      return route.roles.some((role) => userRoles.includes(role));
    });

    console.log("📊 Active Section:", activeSection);
    console.log("👤 User Roles:", userRoles);
    console.log("🧭 Subroutes:", filtered);

    return filtered;
  };

  const subRoutes = getSubRoutes();

  const drawer = (
    <Box sx={{ width: 240, backgroundColor: "#0e1f47", color: "white", height: "100%" }}>
      <Typography variant="h6" sx={{ px: 2, py: 2 }}>
        Menu
      </Typography>
      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />
  
      <List>
        {mainSections
          .filter((section) => {
            if (!userRole) return false;
  
            const roles = Array.isArray(userRole) ? userRole : [userRole];
  
            // ✅ Map each section name to allowed roles
            const sectionRoles: Record<string, string[]> = {
              NGO: ["ngo"],
              "Solar Proposal": ["solar"],
              "Billing System": ["billing"],
            };
  
            // ✅ Allow "admin" to see everything
            if (roles.includes("admin")) return true;
  
            // ✅ Only show sections matching user’s roles
            return sectionRoles[section.name]?.some((r) => roles.includes(r));
          })
          .map((route) => (
            <ListItem
              key={route.name}
              onClick={() => {
                console.log("📦 Section clicked:", route.name);
                setActiveSection(route.name);
                setMobileOpen(false);
              }}
              sx={{
                color: "white",
                py: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
              }}
            >
              {route.name}
            </ListItem>
          ))}
      </List>
    </Box>
  );
  

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* ✅ MAIN NAVBAR */}
      <AppBar position="static" sx={{ backgroundColor: "#0e1f47" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {isMobile && (
              <IconButton edge="start" color="inherit" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            )}
            <Link href="/user-dashboard"><Image src={companylogo} alt="Logo" width={120} height={50} /></Link>
          </Box>
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 5 }}>
               {mainSections
               .filter((section) => {
                 if (!userRole) return false;
       
                 const roles = Array.isArray(userRole) ? userRole : [userRole];
       
                 // ✅ Map each section name to allowed roles
                 const sectionRoles: Record<string, string[]> = {
                   NGO: ["ngo"],
                   "Solar Proposal": ["solar"],
                   "Billing System": ["billing"],
                 };
       
                 if (roles.includes("admin")) return true;
                 return sectionRoles[section.name]?.some((r) => roles.includes(r));
               })
               .map((route) => (
                <Typography
                key={route.name}
                  onClick={() => {
                    console.log("🔹 Navbar section clicked:", route.name);
                    setActiveSection(route.name);
                     setMobileOpen(false);
                  }}
                  sx={{
                    color: "white",
                    fontWeight: 500,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    fontSize: 18,
                    borderBottom:
                      route.name === activeSection
                        ? "3px solid #fbc02d"
                        : "3px solid transparent",
                    transition: "border 0.2s",
                    "&:hover": { borderBottom: "3px solid #fbc02d" },
                  }}
                >
                  {route.name}
                </Typography>
               ))}
            </Box>
          )}

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>

            <IconButton size="large" edge="end" color="inherit">
            <Link href="/user-dashboard/UserProfile">
            {company.logo ? (
            <img
              src={company.logo}
              alt={company.name}
              className="w-8 h-8 rounded-full mb-2 object-contain"
            />
          ) : (
            <AccountCircle/>
          )}
            </Link>
            </IconButton>
            <MenuItem
                onClick={() => {
                  console.log("🚪 Logging out user");
                  Cookies.remove("token");
                  router.push("/login");
                }}
              >
                <span className="flex flex-row gap-2">
                Logout <LogoutIcon/>
                </span>
              </MenuItem>
          </Box>
        </Toolbar>
      </AppBar>

      {/* 🧭 SECONDARY NAVBAR */}
      {activeSection && subRoutes.length > 0 && (
        <Box
          sx={{
            backgroundColor: "#142a5c",
            color: "white",
            display: "flex",
            justifyContent: "center",
            gap: 6,
            py: 1,
            transition: "0.3s",
          }}
        >
          {subRoutes.map((sub) => (
            <Link
              key={sub.path}
              href={sub.path}
              style={{
                color: "white",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 16,
              }}
            >
              {sub.icon}
              {sub.name}
            </Link>
          ))}
        </Box>
      )}

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 } }}
      >
        {drawer}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: "#f4f6fa" }}>
        {children}
        <ToastContainer position="top-right" autoClose={3000} />
      </Box>
    </Box>
  );
}
