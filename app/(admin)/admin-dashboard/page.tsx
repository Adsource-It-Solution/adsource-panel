"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Stack,
} from "@mui/material";
import {
  People,
  Description,
  Notifications,
} from "@mui/icons-material";

export default function AdminPanel() {
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchUserCount() {
      try {
        console.log("📡 Fetching user count...");
        const res = await fetch("/api/admin/get-users", { credentials: "include" });
        const data = await res.json();
  
        console.log("✅ API Response:", data);
  
        // ✅ Use totalUsers instead of count
        if (data.success && typeof data.totalUsers === "number") {
          setTotalUsers(data.totalUsers);
        } else {
          console.error("❌ Invalid response format:", data);
          setTotalUsers(0);
        }
      } catch (err) {
        console.error("❌ Error fetching users:", err);
        setTotalUsers(0);
      } finally {
        setLoading(false);
      }
    }
  
    fetchUserCount();
  }, []);
  
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #f8fafc, #f1f5f9)",
        p: 4,
      }}
    >
      {/* Header */}
      <Box mb={5}>
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          Welcome back, Administrator
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Manage your application from this central dashboard
        </Typography>
      </Box>

      {/* Stats Section */}
      <Stack
        direction="row"
        flexWrap="wrap"
        spacing={3}
        justifyContent="flex-start"
      >
        {/* Total Users */}
        <Paper
          elevation={2}
          sx={{
            flex: "1 1 250px",
            p: 3,
            borderRadius: 3,
            border: "1px solid #e2e8f0",
            transition: "0.3s",
            "&:hover": { boxShadow: 4 },
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Box
              sx={{
                backgroundColor: "#e0f2fe",
                p: 1.5,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <People sx={{ color: "#0284c7" }} />
            </Box>
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              <Typography variant="h5" fontWeight="bold">
                {totalUsers ?? 0}
              </Typography>
            )}
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Total Users
          </Typography>
          <Typography variant="caption" color="success.main" fontWeight={500}>
            +12% from last month
          </Typography>
        </Paper>

        {/* Content Items */}
        <Paper
          elevation={2}
          sx={{
            flex: "1 1 250px",
            p: 3,
            borderRadius: 3,
            border: "1px solid #e2e8f0",
            transition: "0.3s",
            "&:hover": { boxShadow: 4 },
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Box
              sx={{
                backgroundColor: "#dcfce7",
                p: 1.5,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Description sx={{ color: "#16a34a" }} />
            </Box>
            <Typography variant="h5" fontWeight="bold">
              342
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Content Items
          </Typography>
          <Typography variant="caption" color="success.main" fontWeight={500}>
            +8% from last month
          </Typography>
        </Paper>

        {/* Pending Actions */}
        <Paper
          elevation={2}
          sx={{
            flex: "1 1 250px",
            p: 3,
            borderRadius: 3,
            border: "1px solid #e2e8f0",
            transition: "0.3s",
            "&:hover": { boxShadow: 4 },
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Box
              sx={{
                backgroundColor: "#fef9c3",
                p: 1.5,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Notifications sx={{ color: "#ca8a04" }} />
            </Box>
            <Typography variant="h5" fontWeight="bold">
              23
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Pending Actions
          </Typography>
          <Typography variant="caption" color="warning.main" fontWeight={500}>
            Requires attention
          </Typography>
        </Paper>
      </Stack>

      {/* Help Section */}
      <Paper
        sx={{
          mt: 6,
          background: "linear-gradient(to right, #0f172a, #1e293b)",
          color: "white",
          borderRadius: 3,
          p: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight="bold" mb={1}>
            Need help getting started?
          </Typography>
          <Typography variant="body2" sx={{ color: "#cbd5e1" }}>
            Check out our documentation and guides to make the most of your admin panel.
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#fff",
            color: "#0f172a",
            fontWeight: 600,
            "&:hover": { backgroundColor: "#f1f5f9" },
          }}
        >
          View Documentation
        </Button>
      </Paper>
    </Box>
  );
}
