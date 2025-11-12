import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 25,
    fontSize: 11,
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
  },
  borderBox: {
    border: "2 solid #009688",
    borderRadius: 4,
    padding: 12,
  },
  header: {
    backgroundColor: "#ECF4E8",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1 solid #009688",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  headerLeft: { width: "70%" },
  headerTitle: { fontSize: 16, fontWeight: "bold", color: "#00695c" },
  headerSubText: { fontSize: 10, color: "#444", marginTop: 2 },
  headerRight: { alignItems: "center", textAlign: "right" },
  logo: { width: 200, height: 40 },
  sign: { width: 115, height: 75 },
  sectionTitle: {
    textAlign: "center",
    fontSize: 16,
    color: "#00695c",
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 5,
  },
  table: {
    marginTop: 5,
    borderTop: "1 solid #009688",
    borderBottom: "1 solid #009688",
    borderRadius: 4,
    padding: 12,
  },
  row: { flexDirection: "row", marginBottom: 4 },
  cellLabel: { width: "30%", fontWeight: "bold" },
  cellValue: { width: "70%" },
  noteText: {
    fontSize: 10,
    color: "#444",
    lineHeight: 1.4,
    marginTop: 8,
    textAlign: "justify",
  },
  signBox: { marginTop: 15, alignItems: "center" },
  signText: { fontSize: 10, color: "#333", marginTop: 4 },
  footer: {
    borderTop: "1 solid #009688",
    marginTop: 10,
    paddingTop: 8,
    fontSize: 10,
    textAlign: "center",
    color: "#555",
  },
  footerLogo: {
    width: 40,
    height: 40,
    objectFit: "contain",
    marginTop: 8,
  },
});

export interface ReceiptDocumentPdfProps {
  transaction?: {
    receiptNo?: string;
    date?: string;
    name?: string;
    totalAmount?: string;
    mobile?: string;
    contact?: string;
    pan?: string;
    address?: string;
    paymentMethod?: string;
    transactionID?: string;
    sign?: string;
  };
  company?: {
    name?: string;
    address?: string;
    registrationNumber?: string;
    panNumber?: string;
    gstNumber?: string;
    logo?: string;
    email?: string;
    contactNumber?: string;
    website?: string;
  };
}

export default function ReceiptDocument({
  transaction = {},
  company = {},
}: ReceiptDocumentPdfProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.borderBox}>
          {/* 🏢 Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              {/* 🖼️ Company Logo or Name */}
              {company?.logo ? (
                <Image src={company.logo} style={styles.logo} />
              ) : (
                <Text style={styles.headerTitle}>
                  {company?.name || "Your Company"}
                </Text>
              )}
              {company?.registrationNumber && (
                <Text style={styles.headerSubText}>
                  Reg. No: {company.registrationNumber}
                </Text>
              )}
              {company?.gstNumber && (
                <Text style={styles.headerSubText}>
                  GST: {company.gstNumber}
                </Text>
              )}
              {company?.panNumber && (
                <Text style={styles.headerSubText}>
                  PAN: {company.panNumber}
                </Text>
              )}
            </View>

            <View style={styles.headerRight}>
              {company?.logo && (
                <Image style={styles.logo} src={company.logo} />
              )}
            </View>
          </View>

          <Text style={styles.sectionTitle}>Donation Receipt</Text>

          {/* 💵 Transaction Info */}
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.cellLabel}>Receipt No:</Text>
              <Text style={styles.cellValue}>
                {transaction?.receiptNo || "-"}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.cellLabel}>Date:</Text>
              <Text style={styles.cellValue}>{transaction?.date || "-"}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.cellLabel}>Donor Name:</Text>
              <Text style={styles.cellValue}>{transaction?.name || "-"}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.cellLabel}>Amount:</Text>
              <Text style={styles.cellValue}>
                ₹{transaction?.totalAmount || "0"} /-
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.cellLabel}>Mobile:</Text>
              <Text style={styles.cellValue}>{transaction?.mobile || "-"}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.cellLabel}>Email:</Text>
              <Text style={styles.cellValue}>{transaction?.contact || "-"}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.cellLabel}>PAN:</Text>
              <Text style={styles.cellValue}>{transaction?.pan || "-"}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.cellLabel}>Address:</Text>
              <Text style={styles.cellValue}>
                {transaction?.address || "-"}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.cellLabel}>Payment Mode:</Text>
              <Text style={styles.cellValue}>
                {transaction?.paymentMethod || "-"}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.cellLabel}>Transaction ID:</Text>
              <Text style={styles.cellValue}>
                {transaction?.transactionID || "-"}
              </Text>
            </View>
          </View>

          {/* 📝 Note */}
          <Text style={styles.noteText}>
            Thank you for contributing to{" "}
            <Text style={{ fontWeight: "bold" }}>
              {company?.name || "our organization"}
            </Text>
            . Your donation helps support our ongoing mission. Please keep this
            receipt as acknowledgment of your contribution.
          </Text>

          {/* ✍ Signature */}
          {transaction?.sign && (
            <View style={styles.signBox}>
              <Image style={styles.sign} src={transaction.sign} />
              <Text style={styles.signText}>Authorized Signatory</Text>
            </View>
          )}

          {/* 📞 Footer */}
          <View style={styles.footer}>
            <Text style={{ fontSize: 14, fontWeight: "bold", color: "#00695c" }}>
              Contact Us
            </Text>
            {company?.contactNumber && (
              <Text>Phone: {company.contactNumber}</Text>
            )}
            {company?.website && <Text>Website: {company.website}</Text>}
            {company?.email && <Text>Email: {company.email}</Text>}
            {company?.address && <Text>Address: {company.address}</Text>}
            {company?.logo && <Image src={company.logo} style={styles.footerLogo} />}
          </View>
        </View>
      </Page>
    </Document>
  );
}
