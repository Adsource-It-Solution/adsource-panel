"use client";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import BoltIcon from "@mui/icons-material/Bolt";
import Link from "next/link";
import {
  Box,
  Typography,
  Button,
  Container,
  CardContent,
  IconButton,
  Paper,
} from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import companylogo from "@/app/assets/adsource-logo.webp";
import NextLink from "next/link";

export default function DashboardHome() {
  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/AdSourceITSolutions",
      label: "Facebook",
    },
    {
      icon: Twitter,
      href: "https://twitter.com/yourcompany",
      label: "Twitter",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/yourcompany",
      label: "Instagram",
    },
    {
      icon: LinkedIn,
      href: "https://www.linkedin.com/company/adsource-it-solutions",
      label: "LinkedIn",
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: "#f5f7fb", minHeight: "100vh" }}>
      {/* 🧭 HEADER */}
      <Box
        sx={{
          textAlign: "center",
          mb: { xs: 6, md: 10 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography variant="h4" fontWeight={700}>
          Welcome to Adsource PDF Generator
        </Typography>
        <Typography color="text.secondary" fontSize={{ xs: 14, md: 16 }}>
          Learn how to design and generate PDFs for each section below.
        </Typography>
      </Box>

      {/* 💡 OVERVIEW SECTIONS */}
      <Box
        sx={{
          display: "grid",
          gap: 4,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
        }}
      >
        {[
          {
            icon: <DescriptionIcon sx={{ color: "#1565c0" }} />,
            title: "NGO PDFs",
            desc: "Generate donation receipts, certificates, and ID cards for NGOs.",
            bg: "#e3f2fd",
            color: "#1565c0",
          },
          {
            icon: <BoltIcon sx={{ color: "#f9a825" }} />,
            title: "Solar Proposals",
            desc: "Create professional solar proposals with auto-filled details.",
            bg: "#fff8e1",
            color: "#f9a825",
          },
          {
            icon: <PictureAsPdfIcon sx={{ color: "#2e7d32" }} />,
            title: "Billing Invoices",
            desc: "Manage invoices, payment summaries, and PDF receipts efficiently.",
            bg: "#e8f5e9",
            color: "#2e7d32",
          },
        ].map((section, i) => (
          <Box
            key={i}
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
                {section.icon}
                <Typography variant="h6" fontWeight={600}>
                  {section.title}
                </Typography>
              </Box>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                {section.desc}
              </Typography>
              <Box
                sx={{
                  height: 160,
                  background: section.bg,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography align="center" sx={{ color: section.color }}>
                  PDF Preview (Coming Soon)
                </Typography>
              </Box>
            </CardContent>
          </Box>
        ))}
      </Box>



      {/* 🧾 Generated PDF Showcase */}
      <Box
        sx={{
          mt: 6,
          p: { xs: 2, md: 3 },
          background: "white",
          borderRadius: 3,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          Generated PDF Example
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: { xs: 200, sm: 300, md: 350 },
            background: "#eceff1",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#607d8b",
            textAlign: "center",
          }}
        >
          Generated PDF Image (Upload coming soon)
        </Box>
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Link
            href="/user-dashboard/documentation"
            className="bg-[#0e1f47] rounded-md px-5 py-2 hover:bg-[#142a5c] font-bold text-white transition-all"
          >
            Learn How to Generate PDFs
          </Link>
        </Box>
      </Box>

      {/* 📘 Help CTA */}
      <Paper
        sx={{
          mt: 6,
          background: "linear-gradient(to right, #0f172a, #1e293b)",
          color: "white",
          borderRadius: 3,
          p: { xs: 3, md: 4 },
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: { xs: "center", sm: "left" },
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
        <Link
          href="/user-dashboard/documentation"
          className="bg-[#e6e6e6] text-[#23252a] text-base sm:text-lg font-semibold hover:bg-white px-4 py-2 rounded-lg transition-all"
        >
          View Documentation
        </Link>
      </Paper>

      {/* 🌐 FOOTER */}
      <Box
        sx={{
          background: "linear-gradient(to right, #0f172a, #1e293b)",
          color: "#fff",
          pt: 8,
          borderRadius: 4,
          mt: 4,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: 6,
            }}
          >
            {/* Left Section */}
            <Box sx={{ flex: "1 1 280px", maxWidth: 400 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <img
                  src={companylogo.src}
                  alt="Adsource Logo"
                  style={{ height: 45, marginRight: 10 }}
                />
              </Box>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.7)", mb: 2, lineHeight: 1.8 }}
              >
                Transforming ideas into digital realities with cutting-edge
                websites, apps, and software. From design to marketing, we craft
                your complete online success story.
              </Typography>
              <Box>
              <div className="flex justify-center md:justify-start gap-3 mt-4 flex-wrap">
      {socialLinks.map(({ icon: Icon, href, label }, index) => (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
        >
          <IconButton
            size="medium"
            sx={{
              bgcolor: "rgba(255,255,255,0.1)",
              color: "#fff",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "#f36f21",
                transform: "scale(1.1)",
              },
            }}
          >
            <Icon fontSize="small" />
          </IconButton>
        </a>
      ))}
    </div>
              </Box>
            </Box>

            {/* Company Links */}
            <Box sx={{ flex: "1 1 180px" }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Company
              </Typography>
              {[
                { text: "Home", href: "/" },
                { text: "Contact Us", href: "/dashboard-section/contact" },
                {text: "Term & Condition", href: "/dashboard-section/term-cond"},
                {text: "Settings", href: "/dashboard-section/setting"},
              ].map(({ text, href }) => (
                <Box
                  key={text}
                  component={NextLink}
                  href={href}
                  sx={{
                    textDecoration: "none",
                    color: "rgba(255,255,255,0.7)",
                    mb: 1,
                    display: "block",
                    "&:hover": { color: "#fff", textDecoration: "underline" },
                  }}
                >
                  <Typography variant="body2">{text}</Typography>
                </Box>
              ))}
            </Box>

            {/* Contact Info */}
            <Box sx={{ flex: "1 1 280px", maxWidth: 400 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Contact
              </Typography>
              {[
                "Address – Plot No.12, Jain Road, Near Dwarka Mor Metro Station, Metro Pillar -786, New Delhi-110059",
                "Opening Hours – Mon–Sat: 10.00 am to 7.00 pm",
                "Mobile: +91 9716234515",
                "Email: info@adsourceitsolutions.com",
              ].map((text, i) => (
                <Typography
                  key={i}
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.7)", mb: 1 }}
                >
                  {text}
                </Typography>
              ))}
            </Box>

            {/* Call to Action */}
            <Box
              sx={{
                flex: "1 1 200px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Want to generate new type of document?
              </Typography>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#f36f21",
                  borderRadius: "50%",
                  width: 60,
                  height: 60,
                  color: "#fff",
                  "&:hover": { bgcolor: "#fb8c00" },
                }}
              >
                <Link href="https://wa.me/+919716234515"
                className="text-xs">Contact</Link>
              </Button>
            </Box>
          </Box>

          {/* Bottom Bar */}
          <Box
            sx={{
              borderTop: "1px solid rgba(255,255,255,0.1)",
              mt: 6,
              py: 3,
              textAlign: "center",
            }}
          >
            <Typography variant="body2" color="rgba(255,255,255,0.6)">
              © 2025 All Rights Reserved. Adsource IT Solutions
            </Typography>
            <Box
              sx={{
                mt: 1,
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 2,
                color: "rgba(255,255,255,0.6)",
              }}
            >
              {["Privacy Policy", "Terms & Conditions", "Return & Refund Policy"].map(
                (text, i) => (
                  <Link
                    key={i}
                    href="#"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    {text}
                  </Link>
                )
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
