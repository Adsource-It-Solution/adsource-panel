"use client";

import { Fragment } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { IoMdHome } from "react-icons/io";
import { LiaReceiptSolid } from "react-icons/lia";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const drawerWidth = 240;

const routes = [
  { path: "/admin-dashboard", name: "Home", icon: <IoMdHome /> },
  { path: "/admin-dashboard/add-user", name: "Add the User", icon: <LiaReceiptSolid /> },
];


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#0e1f47",
            color: "white",
          },
        }}
      >
        <ToastContainer position="top-right" autoClose={3000} />
        <Box sx={{ overflow: "auto", height: "100vh" }}>
          <div>
            <span className="text-3xl px-4 py-4 font-bold flex flex-row justify-start items-center">
              Admin Panel
            </span>
          </div>
          <Divider />
          <List>
            {routes.map((route, index) => (
              <Fragment key={route.path}>
                <ListItem component={Link} href={route.path} className="flex items-center gap-2 py-2 px-4">
                  <ListItemIcon sx={{ color: "white" }}>{route.icon}</ListItemIcon>
                  {route.name}
                </ListItem>
                {index < routes.length - 1 && (
                  <Divider variant="middle" className="py-1" sx={{ borderColor: "white" }} />
                )}
              </Fragment>
            ))}
          </List>

          {/* <ListItem
            sx={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "white",
              backgroundColor: "#3f51b5",
              borderRadius: "4px",
              padding: "12px 16px",
              "&:hover": { backgroundColor: "#2c387e" },
              marginTop: 1,
            }}
          >
            <ListItemIcon sx={{ color: "white" }}>
              <PiListStarFill />
            </ListItemIcon>
            List
          </ListItem> */}

          {/* <List>
            {list.map((item, index) => (
              <Fragment key={item.path}>
                <ListItem component={Link} href={item.path} className="flex items-center gap-2 py-2 px-4">
                  <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                  {item.name}
                </ListItem>
                {index < list.length - 1 && (
                  <Divider variant="middle" className="py-1" sx={{ borderColor: "white" }} />
                )}
              </Fragment>
            ))}
          </List> */}
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}
