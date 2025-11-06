"use client";

import { Box, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import BoltIcon from "@mui/icons-material/Bolt";

export default function DashboardHome() {
  return (
    <Box sx={{ p: 4, backgroundColor: "#f5f7fb", minHeight: "100vh" }}>
      {/* 🧭 HEADER */}
      <div className="flex justify-center flex-col items-center mb-10">
      <p className=" text-4xl font-bold">
        Welcome to Adsource Pdf Generator
        </p>
        <p className="text-gray-500 mb-4 ">
        Learn how to design and generate PDFs for each section below.
        </p>
      </div>

      {/* 💡 OVERVIEW SECTIONS */}
      <Grid container spacing={4}>
        {/* NGO Section */}
        <Card
          sx={{
            borderRadius: 3,
            p: 2,
            backgroundColor: "white",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            transition: "0.3s",
            "&:hover": { transform: "translateY(-6px)" },
          }}
        >
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
              <DescriptionIcon sx={{ color: "#1565c0" }} />
              <Typography variant="h6" fontWeight={600}>
                NGO PDFs
              </Typography>
            </Box>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              Generate donation receipts, certificates, and ID cards for NGOs.
            </Typography>
            <Box sx={{ height: 160, background: "#e3f2fd", borderRadius: 2 }}>
              {/* placeholder for NGO image */}
              <Typography
                align="center"
                sx={{ color: "#1565c0", lineHeight: "160px" }}
              >
                NGO PDF Preview (Image Coming Soon)
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Solar Section */}
        <Card
          sx={{
            borderRadius: 3,
            p: 2,
            backgroundColor: "white",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            transition: "0.3s",
            "&:hover": { transform: "translateY(-6px)" },
          }}
        >
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
              <BoltIcon sx={{ color: "#f9a825" }} />
              <Typography variant="h6" fontWeight={600}>
                Solar Proposals
              </Typography>
            </Box>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              Create professional solar proposals with auto-filled client details.
            </Typography>
            <Box sx={{ height: 160, background: "#fff8e1", borderRadius: 2 }}>
              <Typography
                align="center"
                sx={{ color: "#f9a825", lineHeight: "160px" }}
              >
                Solar PDF Preview (Image Coming Soon)
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Billing Section */}
        <Card
          sx={{
            borderRadius: 3,
            p: 2,
            backgroundColor: "white",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            transition: "0.3s",
            "&:hover": { transform: "translateY(-6px)" },
          }}
        >
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
              <PictureAsPdfIcon sx={{ color: "#2e7d32" }} />
              <Typography variant="h6" fontWeight={600}>
                Billing Invoices
              </Typography>
            </Box>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              Manage invoices, payment summaries, and PDF receipts efficiently.
            </Typography>
            <Box sx={{ height: 160, background: "#e8f5e9", borderRadius: 2 }}>
              <Typography
                align="center"
                sx={{ color: "#2e7d32", lineHeight: "160px" }}
              >
                Invoice PDF Preview (Image Coming Soon)
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* 🧾 Generated PDF Showcase */}
      <Box sx={{ mt: 6, p: 3, background: "white", borderRadius: 3, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          Generated PDF Example
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: 350,
            background: "#eceff1",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#607d8b",
          }}
        >
          Generated PDF Image (Upload coming soon)
        </Box>
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#0e1f47",
              textTransform: "none",
              borderRadius: 2,
              px: 4,
              py: 1,
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#142a5c" },
            }}
          >
            Learn How to Generate PDFs
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
