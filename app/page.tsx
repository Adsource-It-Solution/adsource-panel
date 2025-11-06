"use client";

import { useRef } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  useMediaQuery,
  Stack,
  IconButton
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import {
  FileText,
  Receipt,
  CreditCard,
  Award,
  IdCard,
  LayoutDashboard,
  LogOut,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import companylogo from "@/app/assets/adsource-logo.webp";
import Link from "next/link";
import NextLink from "next/link";
import { useInView, motion } from "framer-motion";


export default function Home() {
  const user = false;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const features = [
    {
      icon: <FileText size={40} color="#0f172a" />,
      title: "Proposals",
      description:
        "Create professional business proposals with customizable templates",
    },
    {
      icon: <Receipt size={40} color="#0f172a" />,
      title: "Receipts",
      description: "Generate and manage receipts for all your transactions",
    },
    {
      icon: <CreditCard size={40} color="#0f172a" />,
      title: "Invoices",
      description: "Design and send professional invoices to your clients",
    },
    {
      icon: <Award size={40} color="#0f172a" />,
      title: "Certificates",
      description: "Create custom certificates for awards and achievements",
    },
    {
      icon: <IdCard size={40} color="#0f172a" />,
      title: "ID Cards",
      desc: "Design professional identification cards for your organization",
    },
    {
      icon: <LayoutDashboard size={40} color="#0f172a" />,
      title: "More Documents",
      description: "Access additional document templates and tools",
    },
  ];

  const features2 = [
    {
      title: "Professional Templates",
      desc: "Access beautifully designed templates ready for customization.",
    },
    {
      title: "Easy Customization",
      desc: "Match your brand’s identity with total design flexibility.",
    },
    {
      title: "Cloud Storage",
      desc: "Keep all your documents secure and accessible from anywhere.",
    },
    {
      title: "Fast & Efficient",
      desc: "Generate polished documents in minutes, not hours.",
    },
  ];

  return (
    <Box sx={{ bgcolor: "#f3f4f6", minHeight: "100vh" }}>
      {/* ✅ HEADER */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "white",
          color: "text.primary",
          borderBottom: "1px solid",
          borderColor: "divider",
          backdropFilter: "blur(8px)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Image src={companylogo.src} alt="logo" width={150} height={60} />
          </Stack>

          {user ? (
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Welcome back!
              </Typography>
              <Button
                variant="outlined"
                size="small"
                startIcon={<LogOut size={16} />}
              >
                Sign Out
              </Button>
            </Stack>
          ) : (
            <div>
              <Link href="/login" className=" px-7 py-3 rounded-sm"
                style={{
                  background:
                    "linear-gradient(135deg, #1e40af, #2563eb, #3b82f6)",
                }}>Get Started</Link>
            </div>

          )}
        </Toolbar>
      </AppBar>

      {/* ✅ HERO SECTION */}
      <Container sx={{ py: { xs: 10, md: 14 }, textAlign: "center" }}>
        <Typography
          variant={isMobile ? "h4" : "h3"}
          fontWeight="bold"
          color="text.primary"
          gutterBottom
        >
          Create Stunning Documents Effortlessly
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 700, mx: "auto", mb: 5 }}
        >
          Build beautiful proposals, invoices, receipts, and certificates with a
          professional finish — all in one platform.
        </Typography>
        {!user && (
          <Button
            component={NextLink}
            href="/login"
            variant="contained"
            color="primary"
            size="large"
            sx={{
              px: 5,
              py: 1.5,
              fontSize: "1rem",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #1e40af, #2563eb, #3b82f6)",
              textDecoration: "none",
            }}
          >
            Start Creating
          </Button>

        )}
      </Container>

      {/* ✅ FEATURES SECTION */}
      <Box sx={{ bgcolor: "#f9fafb", py: { xs: 8, md: 10 } }} ref={ref}>
        <Container>
          {/* Header */}
          <motion.div
            initial={{ opacity: 1, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Typography
              variant="h4"
              align="center"
              fontWeight="bold"
              color="text.primary"
              gutterBottom
            >
              Everything You Need
            </Typography>
            <Typography
              align="center"
              color="text.secondary"
              sx={{ mb: 6, fontSize: "1.1rem" }}
            >
              A complete suite of tools for all your document needs
            </Typography>
          </motion.div>

          {/* Feature Cards */}
          <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 4,
        justifyContent: "center",
      }}
    >
      {features.map((feature, i) => (
        <Box
          key={i}
          sx={{
            flex: "1 1 300px",
            maxWidth: "350px",
          }}
        >
          <Card
            variant="outlined"
            sx={{
              height: "100%",
              borderRadius: 3,
              p: 4,
              transition: "0.3s",
              bgcolor: "white",
              borderColor: "grey.200",
              "&:hover": {
                boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                borderColor: "primary.main",
                transform: "translateY(-5px)",
              },
            }}
          >
            <Box sx={{ mb: 2, color: "primary.main" }}>{feature.icon}</Box>
            <Typography variant="h6" fontWeight="600" sx={{ mb: 1 }}>
              {feature.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {feature.description}
            </Typography>
          </Card>
        </Box>
      ))}
    </Box>
        </Container>
      </Box>

      {/* ✅ WHY CHOOSE SECTION */}
      <Box
        sx={{
          bgcolor: "#1e293b",
          color: "white",
          py: { xs: 8, md: 10 },
          mt: 10,
          borderRadius: "24px",
        }}
        ref={ref}
      >
        <Container>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Typography variant="h4" align="center" fontWeight="bold" sx={{ mb: 2 }}>
              Why Choose Adsource?
            </Typography>
            <Typography
              align="center"
              color="grey.400"
              sx={{ mb: 8, fontSize: "1.1rem", maxWidth: 700, mx: "auto" }}
            >
              Built for professionals who value design, efficiency, and control
            </Typography>
          </motion.div>

          {/* Feature Cards */}
          <Grid container spacing={4} justifyContent="center">
            {features2.map((item, i) => (
              <motion.div
                key={item.title || i}
                initial={{ opacity: 0, scale: 0.5, y: 80 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ delay: i * 0.2, duration: 0.8, type: "spring" }}
                whileHover={{ scale: 1.05 }}
              >
                <Box
                  sx={{
                    bgcolor: "#27375f",
                    p: 4,
                    borderRadius: 3,
                    height: "100%",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 12px 32px rgba(0,0,0,0.4)",
                      transform: "translateY(-6px)",
                    },
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <CheckCircle color="#4ade80" size={32} />
                    <Box>
                      <Typography variant="h6" fontWeight="600" gutterBottom>
                        {item.title}
                      </Typography>
                      <Typography color="grey.400" sx={{ lineHeight: 1.6 }}>
                        {item.desc}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </motion.div>
            ))}
          </Grid>

        </Container>
      </Box>
      {/* ✅ CTA SECTION */}
      <Container sx={{ textAlign: "center", py: 12 }}>
        <Card
          sx={{
            maxWidth: 600,
            mx: "auto",
            borderRadius: 3,
            textAlign: "center",
            p: 5,
            background: "linear-gradient(135deg, #ffffff, #f9fafb)",
            boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Ready to Get Started?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
            Join thousands of professionals creating impactful documents.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
            If your business type not listed here then contact offical to get your proposal ready.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Contact our offical and get your details.
          </Typography>
          {user ? (
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 4,
                py: 1.2,
                background: "linear-gradient(135deg, #2563eb, #3b82f6)",
              }}
            >
              Go to Dashboard
            </Button>
          ) : (
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 4,
                py: 1.2,
                background: "linear-gradient(135deg, #1e40af, #3b82f6)",
              }}
            >
              Let's get started
            </Button>
          )}
        </Card>
      </Container>

      {/* ✅ FOOTER */}
      <Box sx={{ bgcolor: "#0f0f25", color: "#fff", pt: 8 }}>
        <Container maxWidth="lg">
          {/* 🌐 Top Section */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: 6,
            }}
          >
            {/* Left - Logo & About */}
            <Box sx={{ flex: "1 1 280px", maxWidth: 400 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <img
                  src={companylogo.src}
                  alt="Adsource Logo"
                  style={{ height: 50, marginRight: 10 }}
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
                {[Facebook, Twitter, Instagram, LinkedIn].map((Icon, index) => (
                  <IconButton
                    key={index}
                    size="small"
                    sx={{
                      bgcolor: "rgba(255,255,255,0.1)",
                      color: "#fff",
                      mr: 1,
                      "&:hover": { bgcolor: "#f36f21" },
                    }}
                  >
                    <Icon fontSize="small" />
                  </IconButton>
                ))}
              </Box>
            </Box>

            {/* Company Links */}
            <Box sx={{ flex: "1 1 180px" }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Company
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {[
                  { text: "Home", href: "/" },
                  { text: "Contact Us", href: "/contact" },
                  { text: "Company website", href: "https://adsourceitsolutions.com/" }
                ].map(({ text, href }) => (
                  <Box
                    key={text}
                    component={NextLink}
                    href={href}
                    style={{
                      textDecoration: "none",
                      color: "rgba(255,255,255,0.7)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.textDecoration = "underline";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                      e.currentTarget.style.textDecoration = "none";
                    }}
                  >
                    <Typography variant="body2">{text}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Contact Info */}
            <Box sx={{ flex: "1 1 300px", maxWidth: 400 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Contact
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.7)", mb: 1 }}
              >
                Address – Plot No.12, Jain Road, Near Dwarka Mor Metro Station,
                Metro Pillar -786, New Delhi-110059
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.7)", mb: 1 }}
              >
                Opening Hours – Mon–Sat: 10.00 am to 7.00 pm
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.7)", mb: 1 }}
              >
                Mobile: +91 9716234515
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                Email: info@adsourceitsolutions.com
              </Typography>
            </Box>

            {/* Call Now */}
            <Box
              sx={{
                flex: "1 1 180px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Have a project in <br /> your mind?
              </Typography>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "blue",
                  borderRadius: "50%",
                  width: 60,
                  height: 60,
                  color: "primary",
                  "&:hover": { bgcolor: "#f36f21" },
                }}
              >
                <span className="text-xs">Contact Us</span>
              </Button>
            </Box>
          </Box>

          {/* 🔹 Divider & Bottom Bar */}
          <Box
            sx={{
              borderTop: "1px solid",
              borderColor: "rgba(255,255,255,0.1)",
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
              <Link
                href="#"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                Privacy Policy
              </Link>
              /
              <Link
                href="#"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                Terms & Conditions
              </Link>
              /
              <Link
                href="#"
                style={{
                  textDecoration: "none",
                  color: "inherit",

                }}
              >
                Return & Refund Policy
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
