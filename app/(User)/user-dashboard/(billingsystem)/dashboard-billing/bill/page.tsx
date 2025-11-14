"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Paper,
  Divider,
  Button,
} from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import QRCode from "qrcode";
import { pdf } from "@react-pdf/renderer";
import InvoicePDF from "../pdf/page";

const formatINR = (n = 0) => `₹${n.toLocaleString("en-IN")}`;

export default function InvoicePage() {
  const [company, setCompany] = useState({
    logo: "",
    name: "",
    address: "",
    registrationNumber: "",
    panNumber: "",
    gstNumber: "",
    contactNumber: "",
    email: "",
    website: "",
  });

  const [loadingCompany, setLoadingCompany] = useState(true);

  // ✅ Fetch logged-in user and company details
  useEffect(() => {
    async function fetchCompany() {
      try {
        console.log("🚀 Starting company fetch...");

        // Fetch current user
        const userRes = await fetch("/api/auth/me");
        if (!userRes.ok) throw new Error(`User fetch failed: ${userRes.status}`);
        const userData = await userRes.json();

        const userId = userData?.id;
        if (!userId) {
          console.warn("⚠ No user ID found");
          setLoadingCompany(false);
          return;
        }

        // Fetch company
        const companyRes = await fetch(`/api/User/updateCompany/${userId}`, {
          method: "GET",
          cache: "no-store",
        });
        if (!companyRes.ok)
          throw new Error(`Company fetch failed: ${companyRes.status}`);

        const data = await companyRes.json();
        console.log("📦 Company response:", data);

        if (data.company) {
          const c = data.company;
          setCompany({
            logo: c.logo || "",
            name: c.name || "",
            address: c.address || "",
            registrationNumber: c.registrationNumber || "",
            panNumber: c.panNumber || "",
            gstNumber: c.gstNumber || "",
            contactNumber: c.contactNumber || "",
            email: c.email || "",
            website: c.website || "",
          });

          setInvoice((prev) => ({
            ...prev,
            companyName: c.name || prev.companyName,
            address: c.address || prev.address,
            pan: c.panNumber || prev.pan,
            gst: c.gstNumber || prev.gst,
            contactNumber: c.contactNumber || prev.contactNumber,
            email: c.email || prev.email,
            website: c.website || prev.website,
          }));
        }
      } catch (err) {
        console.error("❌ Failed to fetch company:", err);
      } finally {
        setLoadingCompany(false);
      }
    }

    fetchCompany();
  }, []);

  // 🧾 Invoice State
  const [invoice, setInvoice] = useState({
    companyName: "",
    tagline: "",
    address: "",
    contactNumber: "",
    email: "",
    website: "",
    pan: "",
    gst: "",
    customerName: "",
    customerAddress: "",
    invoiceNo: "",
    date: "",
    transactionId: "",

    // Newly added fields (fixing errors)
    challanNo: "",
    transport: "",
    igstPercent: 18,
    totalInWords: "",
    terms: "",
    bank: {
      name: "",
      branch: "",
      account: "",
      ifsc: "",
    },

    items: [
      { name: "", qty: 0, rate: 0, hsn: "" },
      { name: "", qty: 0, rate: 0, hsn: "" },
    ],
  });

  const [qrImage, setQrImage] = useState("");


  const handleChange = (field: string, value: any) => {
    setInvoice((prev) => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const updated = [...invoice.items];
    (updated[index] as any)[field] = value;
    setInvoice((prev) => ({ ...prev, items: updated }));
  };

  const addItem = () =>
    setInvoice((prev) => ({
      ...prev,
      items: [...prev.items, { name: "", qty: 1, rate: 0, hsn: "" }],
    }));


  const subtotal = invoice.items.reduce((sum, i) => sum + i.qty * i.rate, 0);
  const igst = subtotal * 0.18;
  const grandTotal = subtotal + igst;

  const qrData = JSON.stringify({
    transactionId: invoice.transactionId,
    invoiceNo: invoice.invoiceNo,
    date: invoice.date,
    customer: invoice.customerName,
    total: grandTotal,
    items: invoice.items.map((i) => ({ name: i.name, qty: i.qty, amount: i.qty * i.rate })),
  });

  const downloadPDF = async () => {
    const blob = await pdf(
      <InvoicePDF
        invoice={invoice}
        company={company}
        subtotal={subtotal}
        igst={igst}
        grandTotal={grandTotal}
        qrData={qrData}
        qrImage={qrImage}
      />
    ).toBlob();
  
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Invoice-${invoice.invoiceNo || "Draft"}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    let isMounted = true;

    async function generateQr() {
      try {
        const dataUrl = await QRCode.toDataURL(qrData);
        if (isMounted) setQrImage(dataUrl);
      } catch (err) {
        console.error("Failed to generate QR image:", err);
      }
    }

    generateQr();
    return () => {
      isMounted = false;
    };
  }, [qrData]);
  

  if (loadingCompany) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography>Loading company details...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 4,
        p: 4,
        bgcolor: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      {/* ===== LEFT: INVOICE PREVIEW ===== */}
      <Paper
        sx={{
          flex: "1 1 60%",
          p: 4,
          borderRadius: 3,
          boxShadow: 4,
          bgcolor: "white",
          minWidth: "360px",
          maxWidth: 1000,
          mx: "auto",
        }}
      >
        {/* Header (top band like image) */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            {company.logo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={company.logo} alt="Company Logo" style={{ height: 70, objectFit: "contain" }} />
            )}
            <Box>
              <Typography sx={{ fontWeight: 800, fontSize: 18, color: "#0b4b2d" }}>{invoice.companyName || company.name}</Typography>
              <Typography sx={{ fontSize: 12, color: "#0b4b2d", fontWeight: 700 }}>{invoice.tagline}</Typography>
              <Typography sx={{ fontSize: 11, color: "#333" }}>{invoice.address}</Typography>
              <Typography sx={{ fontSize: 11, color: "#333" }}>{`Tel: ${invoice.contactNumber}  |  Web: ${invoice.website || company.website}`}</Typography>
            </Box>
          </Box>

          <Box sx={{ textAlign: "right", minWidth: 220 }}>
            <Typography sx={{ fontWeight: 800, fontSize: 20, color: "#0b4b2d" }}>TAX INVOICE</Typography>
            <Typography sx={{ fontSize: 12 }}>Invoice No: <strong>{invoice.invoiceNo}</strong></Typography>
            <Typography sx={{ fontSize: 12 }}>Date: {invoice.date}</Typography>
            <Typography sx={{ fontSize: 12 }}>PAN: <strong>{invoice.pan}</strong></Typography>
            <Typography sx={{ fontSize: 12 }}>GSTIN: <strong>{invoice.gst}</strong></Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box sx={{ display: "flex", gap: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 700 }}>Bill To:</Typography>
            <Typography>{invoice.customerName}</Typography>
            <Typography sx={{ color: "gray" }}>{invoice.customerAddress}</Typography>
            <Typography sx={{ mt: 1, fontSize: 12 }}>Challan No: {invoice.challanNo || "-"} | Transport: {invoice.transport || "-"}</Typography>
          </Box>
        </Box>

        {/* Items table */}
        <Box sx={{ mt: 3 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ddd" }}>
            <thead style={{ background: "#e6f4ea" }}>
              <tr>
                <th style={thStyle}>S.No</th>
                <th style={thStyle}>Description</th>
                <th style={thStyle}>HSN / SAC</th>
                <th style={thStyle}>Qty</th>
                <th style={thStyle}>Rate</th>
                <th style={thStyle}>Taxable Value</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, i) => (
                <tr key={i}>
                  <td style={tdStyle}>{i + 1}</td>
                  <td style={tdStyle}>{item.name}</td>
                  <td style={tdStyle}>{item.hsn || "-"}</td>
                  <td style={tdStyle}>{item.qty}</td>
                  <td style={tdStyle}>{formatINR(item.rate)}</td>
                  <td style={tdStyle}>{formatINR(item.qty * item.rate)}</td>
                </tr>
              ))}

              {/* totals row styled like image */}
              <tr>
                <td colSpan={5} style={{ ...tdStyle, textAlign: "right", fontWeight: 700 }}>Total</td>
                <td style={{ ...tdStyle, fontWeight: 700 }}>{formatINR(subtotal)}</td>
              </tr>
              <tr>
                <td colSpan={5} style={{ ...tdStyle, textAlign: "right" }}>IGST ({invoice.igstPercent || 18}%)</td>
                <td style={tdStyle}>{formatINR(igst)}</td>
              </tr>
              <tr>
                <td colSpan={5} style={{ ...tdStyle, textAlign: "right", fontSize: 16, fontWeight: 800 }}>Grand Total</td>
                <td style={{ ...tdStyle, fontSize: 16, fontWeight: 800 }}>{formatINR(grandTotal)}</td>
              </tr>
            </tbody>
          </table>

          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <Box sx={{ maxWidth: 420 }}>
              <Typography sx={{ fontSize: 12, fontWeight: 700 }}>Total (in words)</Typography>
              <Typography sx={{ fontSize: 12, color: "#333" }}>{invoice.totalInWords || ""}</Typography>

              <Box sx={{ mt: 2, p: 2, border: "1px dashed #ddd", borderRadius: 1 }}>
                <Typography sx={{ fontSize: 11, fontWeight: 700 }}>Terms and Conditions</Typography>
                <Typography sx={{ fontSize: 11 }}>{invoice.terms || "Subject to Mumbai jurisdiction. Delivery ex-works."}</Typography>
              </Box>
            </Box>

            <Box sx={{ textAlign: "center" }}>
              <Box sx={{ width: 220, height: 120, border: "1px solid #eee", p: 2 }}>
                <Typography sx={{ fontSize: 12 }}>Authorized Signatory</Typography>
                <Box sx={{ mt: 4 }} />
                <Typography sx={{ fontSize: 10, color: "gray" }}>(This is a computer generated invoice)</Typography>
              </Box>
            </Box>
            <Box sx={{ width: 220 }}>
              <Box sx={{ border: "1px solid #ddd", p: 1, borderRadius: 1 }}>
                <Typography sx={{ fontSize: 12, fontWeight: 700 }}>Bank Details</Typography>
                <Typography sx={{ fontSize: 12 }}>Name: {invoice.bank?.name}</Typography>
                <Typography sx={{ fontSize: 12 }}>Branch: {invoice.bank?.branch}</Typography>
                <Typography sx={{ fontSize: 12 }}>A/C: {invoice.bank?.account}</Typography>
                <Typography sx={{ fontSize: 12 }}>IFSC: {invoice.bank?.ifsc}</Typography>
                <Box sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
                  <QRCodeSVG value={qrData} size={110} includeMargin={true} />
                </Box>
                <Typography sx={{ fontSize: 10, mt: 1, textAlign: "center" }}>Scan to view transaction</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* ===== RIGHT: EDITABLE FORM ===== */}
      <Paper
        sx={{
          flex: "1 1 35%",
          p: 4,
          borderRadius: 3,
          boxShadow: 4,
          minWidth: "320px",
          bgcolor: "#ffffff",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
          Edit Invoice Details
        </Typography>

        {/* Company Details */}
        {[
          "companyName",
          "tagline",
          "address",
          "contactNumber",
          "email",
          "website",
          "pan",
          "gst",
        ].map((field) => (
          <TextField
            key={field}
            fullWidth
            label={field.replace(/([A-Z])/g, " $1")}
            value={(invoice as any)[field]}
            onChange={(e) => handleChange(field, e.target.value)}
            sx={{ mb: 2 }}
          />
        ))}

        {/* Customer Info */}
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
          Customer Details
        </Typography>

        <TextField
          fullWidth
          label="Customer Name"
          value={invoice.customerName}
          onChange={(e) => handleChange("customerName", e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Customer Address"
          multiline
          value={invoice.customerAddress}
          onChange={(e) => handleChange("customerAddress", e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Invoice Meta */}
        <TextField
          fullWidth
          label="Invoice Number"
          value={invoice.invoiceNo}
          onChange={(e) => handleChange("invoiceNo", e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Date"
          type="date"
          value={invoice.date}
          onChange={(e) => handleChange("date", e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
        />

        {/* Items Section */}
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
          Items
        </Typography>

        {invoice.items.map((item, i) => (
          <Box key={i} sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Item Name"
              value={item.name}
              onChange={(e) => handleItemChange(i, "name", e.target.value)}
              sx={{ mb: 1 }}
            />
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="Qty"
                type="number"
                value={item.qty}
                onChange={(e) => handleItemChange(i, "qty", +e.target.value)}
              />
              <TextField
                label="Rate"
                type="number"
                value={item.rate}
                onChange={(e) => handleItemChange(i, "rate", +e.target.value)}
              />
            </Box>
          </Box>
        ))}

        <Button variant="outlined" color="success" onClick={addItem} sx={{ mb: 2 }}>
          ➕ Add Item
        </Button>

        {/* Bank Details */}
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
          Bank Details
        </Typography>

        <TextField
          fullWidth
          label="Bank Name"
          value={invoice.bank?.name || ""}
          onChange={(e) =>
            setInvoice((prev) => ({
              ...prev,
              bank: { ...prev.bank, name: e.target.value },
            }))
          }
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Branch"
          value={invoice.bank?.branch || ""}
          onChange={(e) =>
            setInvoice((prev) => ({
              ...prev,
              bank: { ...prev.bank, branch: e.target.value },
            }))
          }
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Account Number"
          value={invoice.bank?.account || ""}
          onChange={(e) =>
            setInvoice((prev) => ({
              ...prev,
              bank: { ...prev.bank, account: e.target.value },
            }))
          }
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="IFSC Code"
          value={invoice.bank?.ifsc || ""}
          onChange={(e) =>
            setInvoice((prev) => ({
              ...prev,
              bank: { ...prev.bank, ifsc: e.target.value },
            }))
          }
          sx={{ mb: 2 }}
        />


        <Divider sx={{ my: 2 }} />
        <Button variant="contained" color="success" fullWidth>
          💾 Save Invoice
        </Button>
        <Button
  variant="contained"
  color="success"
  fullWidth
  sx={{ mt: 2 }}
  onClick={downloadPDF}
>
  ⬇ Download Invoice PDF
</Button>

        {/* <PDFDownloadLink
          document={
            <InvoicePDF
              invoice={invoice}
              company={company}
              subtotal={subtotal}
              igst={igst}
              grandTotal={grandTotal}
              qrData={qrData}
            />
          }
          fileName={`Invoice-${invoice.invoiceNo}.pdf`}
          style={{
            marginTop: 16,
            display: "block",
            backgroundColor: "#0b4b2d",
            color: "white",
            padding: "12px",
            textAlign: "center",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          {({ loading }) => (loading ? "Generating PDF..." : "⬇ Download Invoice PDF")}
        </PDFDownloadLink> */}
      </Paper>
    </Box>
  );
}

const thStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left" as const,
  fontWeight: 600,
  fontSize: "14px",
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  fontSize: "14px",
};
