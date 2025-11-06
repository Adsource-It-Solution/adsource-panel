"use client";

import { useEffect, useRef, useState } from "react";
import {
  TextField,
  Grid,
  InputAdornment,
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  Avatar,
  CircularProgress,
} from "@mui/material";
import {
  Email,
  Home,
  Description,
  CreditCard,
  Receipt,
  LocalPhone,
} from "@mui/icons-material";
import { FaRupeeSign } from "react-icons/fa";
import { ClientOnly } from "@/app/components/ClientOnly";
import { ReceiptDocument } from "../pdf/receiptpdf/page";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { useRouter } from "next/navigation";
import Image from "next/image";
import defaultSign from "@/app/assets/signature.jpg"
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export type transaction = {
  receiptNo: string;
  name: string;
  contact: string;
  mobile: string;
  address: string;
  itemDescription: string;
  unitPrice: string;
  totalAmount: string;
  paymentMethod: string;
  pan: string;
  transactionID: string;
  sign: string;
  date: string;
};

const today = new Date();
const DEFAULT_DATE = `${String(today.getDate()).padStart(2, "0")}/${String(
  today.getMonth() + 1
).padStart(2, "0")}/${today.getFullYear()}`;

function ReceiptPage() {
  const router = useRouter();
  const receiptRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    receiptNo: "",
    name: "",
    contact: "",
    mobile: "",
    address: "",
    itemDescription: "",
    quantity: 1,
    unitPrice: "",
    totalAmount: "",
    paymentMethod: "",
    pan: "",
    transactionID: "",
    sign: "",
    date: DEFAULT_DATE,
  });

  const [loadingPdf, setLoadingPdf] = useState(false);
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, sign: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  // ✅ Access control
  useEffect(() => {
    async function verifyAccess() {
      const res = await fetch("/api/auth/me");
      if (!res.ok) {
        router.replace("/not-authorized");
        return;
      }

      const data = await res.json();
      const userRoles = data.role || [];
      console.log("👤 User roles for route check:", userRoles);

      const allowedRoles = ["ngo", "admin"];
      if (!allowedRoles.some((r) => userRoles.includes(r))) {
        router.replace("/not-authorized");
      }
    }

    verifyAccess();
  }, [router]);

  // ✅ Generate unique receipt number
  useEffect(() => {
    if (company?.name) {
      const prefix = company.name.substring(0, 3).toUpperCase(); // first 3 letters of company name
      const uniqueNumber = `${prefix}_${Math.floor(100000 + Math.random() * 900000)}`;
      setForm((prev) => ({ ...prev, receiptNo: uniqueNumber }));
    }
  }, [company]);  

  // ✅ Auto-calc total
  useEffect(() => {
    if (form.quantity && form.unitPrice) {
      const total = form.quantity * parseFloat(form.unitPrice || "0");
      setForm((prev) => ({ ...prev, totalAmount: total.toFixed(2) }));
    }
  }, [form.quantity, form.unitPrice]);

  const handleChange = (field: keyof typeof form, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleDownloadPdf = async () => {
    try {
      setLoadingPdf(true);
  
      // 🧾 Generate PDF with both form (receipt data) and company data
      const blob = await pdf(
        <ReceiptDocument
          transaction={form}
          company={company}
        />
      ).toBlob();
  
      // 💾 Trigger download
      saveAs(blob, `Receipt_${form.transactionID || "draft"}.pdf`);
    } catch (err) {
      console.error("❌ PDF generation failed:", err);
      setSnackbar({
        open: true,
        message: "Failed to generate PDF",
        severity: "error",
      });
    } finally {
      setLoadingPdf(false);
    }
  };

  if (loadingCompany) {
    return (
      <Box textAlign="center" py={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ClientOnly>
      <Box px={{ xs: 2, sm: 4 }} py={4}>
        <Grid container spacing={4} justifyContent="center" alignItems="flex-start">
          {/* =================== RECEIPT PREVIEW =================== */}
          <Card
            ref={receiptRef}
            sx={{
              width: "100%",
              maxWidth: 800,
              mx: "auto",
              mt: 4,
              border: "2px solid #009688",
              borderRadius: 2,
              bgcolor: "white",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            {/* Header */}
            <div className="flex flex-row px-10 py-4 bg-[#ECF4E8] border-b-2 rounded-b-md items-center justify-between">
              <div>
                <div className="flex justify-start items-center text-left">
                  {company.logo ? (
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-[250px] h-[100px] rounded-lg mb-2 object-contain"
                    />
                  ) : (
                    <h2 className="text-gray-600 text-lg font-semibold">
                      {company.name || "Your Organization"}
                    </h2>
                  )}
                </div>

                <Typography variant="body2" fontWeight="bold">
                  REGD NO: {company.registrationNumber}
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  NGO DARPAN ID- {company.gstNumber}
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  PAN NO: {company.panNumber?.toUpperCase()}
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  ALL DONATIONS ARE EXEMPTED U/S 80G OF
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  INCOME TAX ACT, 1961
                </Typography>
              </div>
            </div>

            {/* Title */}
            <Box textAlign="center" py={2}>
              <Typography variant="h6" fontWeight="bold" color="teal">
                Donation Receipt
              </Typography>
            </Box>

            {/* Receipt Body */}
            <CardContent sx={{ px: 4, pb: 4 }}>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="body2" fontWeight="bold">
                  Receipt No: {form.receiptNo}
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  Date: {form.date}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Donor Info */}
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2" fontWeight="bold">
                  Donor Name: {form.name}
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  Email: {form.contact}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2" fontWeight="bold">
                  Donation for: {form.itemDescription}
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  Mobile: {form.mobile}
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2" fontWeight="bold">
                  Payment Mode: {form.paymentMethod}
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  Address: {form.address}
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2" fontWeight="bold">
                  Transaction Id: {form.transactionID}
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  PAN No: {form.pan}
                </Typography>
              </Box>

              <Box mt={3}>
                <Typography variant="body2">
                  Thank you for contributing to{" "}
                  <span className="font-bold">
                    {company.name || "Health and Education Trust"}
                  </span>
                  .
                </Typography>
                <Image
                src={form.sign || defaultSign.src}
                alt="Sign"
                width={100}
                height={50}
                className="mx-auto object-contain"
                unoptimized
              />
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography variant="body2" color="text.secondary">
                NOTE: Your donation benefits food, clothing, education, and healthcare
                for underprivileged children. Donations are exempted under Section 80G of the Income Tax Act, 1961.
              </Typography>
            </CardContent>
          </Card>

          {/* =================== INPUT FORM =================== */}
          <Card sx={{ p: 3, width: "100%" }}>
            <Typography
              variant="h5"
              gutterBottom
              bgcolor="error.main"
              color="white"
              px={3}
              py={2}
              borderRadius={2}
            >
              Enter Receipt Information
            </Typography>

            <Grid container spacing={2} mt={2}>
              <TextField
                label="Receipt No."
                type="text"
                value={form.receiptNo}
                variant="outlined"
                fullWidth
                disabled
              />
            </Grid>

            <Box display="flex" flexDirection="column" gap={2} mt={2}>
              {[
                { label: "Name", icon: <Receipt />, field: "name" },
                { label: "Pan Card", icon: <CreditCard />, field: "pan" },
                { label: "Email", icon: <Email />, field: "contact" },
                { label: "Phone No.", icon: <LocalPhone />, field: "mobile" },
                { label: "Address", icon: <Home />, field: "address" },
                { label: "Donation For", icon: <Description />, field: "itemDescription" },
                { label: "Payment Via", icon: <CreditCard />, field: "paymentMethod" },
                { label: "Transaction ID", icon: <Receipt />, field: "transactionID" },
              ].map((input) => (
                <TextField
                  key={input.field}
                  label={input.label}
                  value={(form as any)[input.field]}
                  onChange={(e) =>
                    handleChange(input.field as keyof typeof form, e.target.value)
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">{input.icon}</InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  fullWidth
                />
              ))}

              <TextField
                label="Amount"
                type="number"
                value={form.totalAmount}
                onChange={(e) => handleChange("totalAmount", e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaRupeeSign />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                fullWidth
              />

              <TextField
                label="Date"
                type="date"
                value={form.date}
                onChange={(e) => handleChange("date", e.target.value)}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                fullWidth
              />
               <div className="col-span-1 md:col-span-3 space-y-2">
                <input
                  accept="image/*"
                  id="advisor-sign-upload"
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => handleImageUpload}
                />
                <label htmlFor="advisor-sign-upload" className="w-full flex flex-col items-center">
                  <Button
                    variant="contained"
                    component="span"
                    color="error"
                    fullWidth
                    startIcon={<CloudUploadIcon />}
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                      py: 1.5,
                      fontWeight: 600,
                    }}
                  >
                    Upload Advisor Signature
                  </Button>
                </label>
              </div>

              <Button
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ py: 1.5 }}
                onClick={handleDownloadPdf}
              >
                {loadingPdf ? "⏳ Generating..." : "Download PDF"}
              </Button>
            </Box>
          </Card>
        </Grid>
      </Box>
    </ClientOnly>
  );
}

export default ReceiptPage;
