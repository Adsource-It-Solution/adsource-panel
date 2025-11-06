"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Chip,
  Card,
  CircularProgress,
  Snackbar,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton
} from "@mui/material";
import {
  FileCopyOutlined,
  DoneAll,
  Pending,
  Download,
  TrendingUp,
  AccessTime,
} from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#4caf50", "#ff9800", "#2196f3", "#f44336"];

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
  })

export default function ProfilePage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const [openCompanyDialog, setOpenCompanyDialog] = useState(false);
  const [companyForm, setCompanyForm] = useState({
    name: "",
    address: "",
    registrationNumber: "",
    panNumber: "",
    gstNumber: "",
    logo: "",
    email: "",
    contactNumber: "",
    website: "",
  });

  const fetchCompanyDetails = async (_id: string) => {
    console.log(_id);
    try {
      const res = await fetch(`/api/User/updateCompany/${_id}`, {
        method: "GET",
        cache: "no-store",
      });
      console.log("🧑‍💻 Sending update request for user:", _id);
      const data = await res.json();
      console.log("📦 Response from backend:", data);
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch company details");
      }

      return data.company;
    } catch (error) {
      console.error("❌ Error fetching company details:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (data?.company) {
      setCompanyForm({
        name: data.company.name || "",
        address: data.company.address || "",
        logo: data.company.logo || "",
        registrationNumber: data.company.registration || "",
        panNumber: data.company.panNumber || "",
        gstNumber: data.company.gstNumber || "",
        email: data.company.email || "",
        contactNumber: data.company.contactNumber || "",
        website: data.company.website || "",
      });
    }
  }, [data]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const base64Image = await fileToBase64(file);
        setCompanyForm({ ...companyForm, logo: base64Image });
      } catch (err) {
        console.error("Error converting image to Base64", err);
      }
    }
  };

  const fetchDashboard = async () => {
    try {
      const res = await fetch("/api/User/profile", { credentials: "include" });
      const json = await res.json();

      console.log("📥 User profile data:", json);

      if (res.ok) {
        setData(json);

        if (json.user?._id) {
          console.log("✅ User ID found:", json.user._id);
          const company = await fetchCompanyDetails(json.user._id);
          console.log("🏢 Company data fetched:", company);
          setCompanyForm({
            name: company?.name || "",
            address: company?.address || "",
            logo: company?.logo || "",
            registrationNumber: company?.registrationNumber || "",
            panNumber: company?.panNumber || "",
            gstNumber: company?.gstNumber || "",
            email: company?.email || "",
            contactNumber: company?.contactNumber || "",
            website: company?.website || "",
          });
        } else {
          console.warn("⚠ No user ID found in profile response");
        }
      } else {
        throw new Error(json.message);
      }
    } catch (err: any) {
      console.error("❌ Dashboard fetch failed:", err);
      setSnackbar({ open: true, message: err.message, severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );

  if (!data)
    return (
      <Typography align="center" sx={{ mt: 10 }}>
        Failed to load dashboard
      </Typography>
    );

  const { user, stats, pdfGenerationData } = data;
  const chartData = [
    { name: "Used", value: stats.pdfGenerated },
    { name: "Remaining", value: stats.maxPdfs - stats.pdfGenerated },
  ];

  const handleSave = async () => {
    try {
      console.log("🟡 handleSave triggered");
      console.log("📦 Sending companyForm data:", companyForm);
      console.log("👤 User ID:", user?._id);

      const res = await fetch(`/api/User/updateCompany/${user._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: companyForm.name,
          address: companyForm.address,
          logo: companyForm.logo,
          registrationNumber: companyForm.registrationNumber,
          panNumber: companyForm.panNumber,
          gstNumber: companyForm.gstNumber,
        }),
      });

      console.log("📨 Raw Response:", res);

      const data = await res.json();
      console.log("✅ Parsed Response Data:", data);

      if (data.success) {
        console.log("✅ Company updated successfully:", data);
        setSnackbar({
          open: true,
          message: "Company details updated!",
          severity: "success",
        });
        setOpenCompanyDialog(false);
      } else {
        console.warn("⚠️ Failed to update company details:", data);
        setSnackbar({
          open: true,
          message: "Failed to update company details!",
          severity: "error",
        });
      }
    } catch (err: any) {
      console.error("❌ Error during company update:", err);
      setSnackbar({
        open: true,
        message: err.message,
        severity: "error",
      });
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#f9fafb", minHeight: "100vh" }}>
      <Paper
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          background: "linear-gradient(145deg, #f7f9fc, #ffffff)",
          maxWidth: "1200px",
          mx: "auto",
        }}
      >
        {/* 🌟 Profile + Company Row */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
          flexWrap="wrap"
          gap={4}
          mt={4}
        >
          {/* 🧑 Header Section */}
          <Box
            textAlign="center"
            sx={{
              flex: "1 1 320px",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
              padding: 3,
              maxWidth: 350,
              mx: "auto",
            }}
          >
            {/* Avatar */}
            <Avatar
              sx={{
                width: 100,
                height: 100,
                mx: "auto",
                bgcolor: "primary.main",
                fontSize: 40,
                borderRadius: "50%",
                border: "3px solid #fff",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              {user.name[0].toUpperCase()}
            </Avatar>

            {/* Name */}
            <Typography>
              <strong>Company Name:</strong> {companyForm.name || "—"}
            </Typography>
            <Typography
              variant="h5"
              fontWeight={700}
              mt={2}
              sx={{ fontFamily: "Roboto, sans-serif", letterSpacing: "0.5px" }}
            >
              {user.name}
            </Typography>

            {/* Email */}
            <Typography
              sx={{
                fontSize: "0.9rem",
                fontFamily: "Roboto, sans-serif",
                marginTop: "4px",
                color: "#8e8e8e",
              }}
            >
              {user.email}
            </Typography>

            {/* Role Chips */}
            <Box mt={2} sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
              {(Array.isArray(user.role) ? user.role : [user.role]).map((r: string) => (
                <Chip
                  key={r}
                  label={r.toUpperCase()}
                  color="info"
                  sx={{
                    mx: 0.5,
                    borderRadius: "16px",
                    padding: "5px 12px",
                    fontSize: "0.75rem",
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* 🏢 Company Section */}
          <Box
            textAlign="center"
            sx={{
              flex: "1 1 320px",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
              padding: 3,
              maxWidth: 350,
              mx: "auto",
              position: "relative", // for edit icon
            }}
          >
            {/* 🏢 Company Header */}
            <Typography
              variant="h5"
              fontWeight={700}
              mb={2}
              sx={{
                fontFamily: "Roboto, sans-serif",
                letterSpacing: "0.5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Company Details
            </Typography>

            {/* ✏️ Edit Icon */}
            <IconButton
              size="small"
              onClick={() => setOpenCompanyDialog(true)}
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                color: "#555",
                "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" },
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  backgroundColor: "#f5f5f5",
                  boxShadow: "0 10px 10px rgba(0,0,0,0.15)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                <EditIcon color="primary" fontSize="small" />
              </span>
            </IconButton>

            {/* 🧾 Company Info */}
            {companyForm.name ||
              companyForm.address ||
              companyForm.logo ||
              companyForm.registrationNumber ||
              companyForm.panNumber ||
              companyForm.gstNumber ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                  fontSize: "0.9rem",
                  color: "#555",
                }}
              >
                {companyForm.logo && (
                  <Avatar
                    src={companyForm.logo}
                    alt="Company Logo"
                    sx={{
                      width: 80,
                      height: 80,
                      mb: 1,
                      border: "2px solid #eee",
                    }}
                  />
                )}

                {companyForm.address && (
                  <Typography>
                    <strong>Address:</strong> {companyForm.address}
                  </Typography>
                )}

                {companyForm.registrationNumber && (
                  <Typography>
                    <strong>Registration No:</strong> {companyForm.registrationNumber}
                  </Typography>
                )}

                {companyForm.panNumber && (
                  <Typography>
                    <strong>PAN No:</strong> {companyForm.panNumber.toUpperCase()}
                  </Typography>
                )}

                {companyForm.gstNumber && (
                  <Typography>
                    <strong>GST No:</strong> {companyForm.gstNumber}
                  </Typography>
                )}
              </Box>
            ) : (
              <Typography color="text.secondary" sx={{ fontSize: "0.85rem" }}>
                Add your company details to personalize receipts.
              </Typography>
            )}
          </Box>
        </Box>


        {/* 📊 Stats Cards Section */}
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 3, mt: 4 }}>
          {[
            {
              icon: <FileCopyOutlined color="primary" fontSize="large" />,
              value: stats.totalProposals,
              label: "Total Proposals",
              bg: "#e3f2fd",
            },
            {
              icon: <DoneAll color="success" fontSize="large" />,
              value: stats.approved,
              label: "Approved",
              bg: "#e8f5e9",
            },
            {
              icon: <Pending color="warning" fontSize="large" />,
              value: stats.pending,
              label: "Pending",
              bg: "#fff3e0",
            },
            {
              icon: <Download color="secondary" fontSize="large" />,
              value: stats.pdfGenerated,
              label: "PDFs Generated",
              bg: "#f3e5f5",
            },
          ].map((s, i) => (
            <Card
              key={i}
              sx={{
                py: 3,
                px: 2,
                textAlign: "center",
                bgcolor: s.bg,
                boxShadow: 2,
              }}
            >
              {s.icon}
              <Typography variant="h6">{s.value}</Typography>
              <Typography variant="body2">{s.label}</Typography>
            </Card>
          ))}
        </Box>

        {/* 📈 Line Chart */}
        <Box sx={{ width: "100%", mb: 4 }}>
          <Card sx={{ p: 3, boxShadow: 3 }}>
            <Typography variant="h6" mb={2} display="flex" alignItems="center">
              <TrendingUp sx={{ mr: 1 }} /> PDF Generation Trends
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={pdfGenerationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#1976d2"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Box>

        {/* 🥧 Pie Chart */}
        <Box sx={{ width: "100%", mb: 4 }}>
          <Card sx={{ p: 3, boxShadow: 3 }}>
            <Typography variant="h6" mb={2} display="flex" alignItems="center">
              <AccessTime sx={{ mr: 1 }} /> PDF Usage
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={chartData} dataKey="value" outerRadius={100} label>
                  {chartData.map((entry, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <Typography align="center" variant="body2">
              {stats.pdfGenerated} of {stats.maxPdfs} PDFs used
            </Typography>
          </Card>
        </Box>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>

      {/* 🏢 Company Details Dialog */}
      <Box>
        <Dialog
          open={openCompanyDialog}
          onClose={() => setOpenCompanyDialog(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit Company Details</DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            {/* Company Name */}
            <TextField
              label="Company Name"
              fullWidth
              margin="normal"
              value={companyForm.name}
              onChange={(e) =>
                setCompanyForm({ ...companyForm, name: e.target.value })
              }
            />
            <TextField
              label="Company Email"
              fullWidth
              margin="normal"
              value={companyForm.email}
              onChange={(e) =>
                setCompanyForm({ ...companyForm, email: e.target.value })
              }
            />
            <TextField
              label="Phone No. "
              fullWidth
              margin="normal"
              value={companyForm.contactNumber}
              onChange={(e) =>
                setCompanyForm({ ...companyForm, contactNumber: e.target.value })
              }
            />

            {/* Company Address */}
            <TextField
              label="Company Address"
              fullWidth
              margin="normal"
              value={companyForm.address}
              onChange={(e) =>
                setCompanyForm({ ...companyForm, address: e.target.value })
              }
            />

            {/* Registration Number */}
            <TextField
              label="Registration Number"
              fullWidth
              margin="normal"
              value={companyForm.registrationNumber || ""}
              onChange={(e) =>
                setCompanyForm({ ...companyForm, registrationNumber: e.target.value })
              }
            />

            {/* PAN Number */}
            <TextField
              label="PAN Number"
              fullWidth
              margin="normal"
              value={companyForm.panNumber || ""}
              onChange={(e) =>
                setCompanyForm({ ...companyForm, panNumber: e.target.value })
              }
            />

            {/* GST / Regd No */}
            <TextField
              label="GST Number"
              fullWidth
              margin="normal"
              value={companyForm.gstNumber || ""}
              onChange={(e) =>
                setCompanyForm({ ...companyForm, gstNumber: e.target.value })
              }
            />
            <TextField
              label="Company Website"
              fullWidth
              margin="normal"
              value={companyForm.website}
              onChange={(e) =>
                setCompanyForm({ ...companyForm, website: e.target.value })
              }
            />

            {/* Image Upload Input */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Company Logo
              </Typography>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
                id="logo-upload"
              />
              <label htmlFor="logo-upload">
                <Button variant="outlined" component="span">
                  Upload Logo Image
                </Button>
              </label>

              {companyForm.logo && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Logo Preview
                  </Typography>
                  <img
                    src={companyForm.logo}
                    alt="Company Logo Preview"
                    style={{
                      maxWidth: "150px",
                      maxHeight: "150px",
                      marginTop: "8px",
                      borderRadius: "8px",
                    }}
                  />
                </Box>
              )}
            </Box>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpenCompanyDialog(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleSave}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
