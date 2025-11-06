"use client";
import React from "react";
import {
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Document,
} from "@react-pdf/renderer";
import topbar from "@/app/assets/Untitled.png";
import defaultLogo from "@/app/assets/logo-pdf.png";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: 320,
    height: 200,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d1d5db",
    overflow: "hidden",
    backgroundColor: "#ffffff",
    position: "relative",
  },
  topImage: {
    width: "100%",
    height: 60,
    transform: "scaleX(-1)",
    position: "absolute",
    top: 0,
    left: 0,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingTop: 65,
    paddingBottom: 5,
  },
  leftSection: {
    width: "60%",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  logo: {
    width: 160,
    height: 35,
    marginBottom: 6,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 3,
  },
  label: {
    width: 50,
    fontSize: 7.5,
    fontWeight: 700,
    color: "#0E1F47",
  },
  colon: {
    fontSize: 7.5,
    marginHorizontal: 2,
    color: "#0E1F47",
  },
  value: {
    fontSize: 7.5,
    color: "#111827",
    flexShrink: 1,
  },
  roleText: {
    fontSize: 10,
    fontWeight: 700,
    color: "#0E1F47",
    marginTop: 3,
  },
  rightSection: {
    width: "35%",
    alignItems: "center",
  },
  imageBox: {
    width: 70,
    height: 90,
    borderRadius: 6,
    backgroundColor: "#5A8DBE",
    borderWidth: 1,
    borderColor: "#d1d5db",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  idContainer: {
    alignItems: "center",
    paddingVertical: 4,
  },
  idText: {
    fontSize: 9,
    fontWeight: 600,
    color: "#0E1F47",
  },
  bottomBarYellow: {
    height: 5,
    backgroundColor: "#F4B740",
  },
  bottomBarBlue: {
    height: 5,
    backgroundColor: "#0E1F47",
  },
});

interface IDCardPDFProps {
  IdCard: {
    name?: string;
    phone?: string;
    email?: string;
    DOB?: string;
    address?: string;
    role?: string;
    idNumber?: string;
    imageUrl?: string;
    companyLogo?: string;
  },
  company: {
    name: string;
    address: string;
    registrationNumber?: string;
    panNumber?: string;
    gstNumber?: string;
    logo?: string;
    email?: string;
    contactNumber?: string;
    website?: string;
  };
}

// 🪪 ID Card Component (single-page compact)
export const IDCardPDF = ({
  IdCard,
  company
}: IDCardPDFProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <Document>
      <Page size={{ width: 350, height: 220 }} style={styles.page}>
        <View style={styles.card}>
          {/* 🌄 Topbar */}
          <Image src={topbar.src} style={styles.topImage} />

          {/* 🔹 Main Content */}
          <View style={styles.content}>
            {/* Left Section */}
            <View style={styles.leftSection}>
              {/* ✅ Company Logo (Fallback to defaultLogo) */}
              <View>
                {company.logo && <Image style={styles.logo} src={company.logo} />}
              </View>

              {[
                { label: "NAME", value: IdCard.name },
                { label: "PHONE", value: IdCard.phone },
                { label: "EMAIL", value: IdCard.email },
                { label: "D.O.B", value: formatDate(IdCard.DOB || "") },
                { label: "ADDRESS", value: IdCard.address },
              ].map((item) => (
                <View key={item.label} style={styles.labelRow}>
                  <Text style={styles.label}>{item.label}</Text>
                  <Text style={styles.colon}>:</Text>
                  <Text style={styles.value}>{item.value}</Text>
                </View>
              ))}

              <Text style={styles.roleText}>{IdCard.role}</Text>
            </View>

            {/* Right Section */}
            <View style={styles.rightSection}>
              <View style={styles.imageBox}>
                <Image src={IdCard.imageUrl} style={styles.image} />
              </View>
            </View>
          </View>

          {/* ID Number */}
          <View style={styles.idContainer}>
            <Text style={styles.idText}>{IdCard.idNumber}</Text>
          </View>

          {/* Bottom Bars */}
          <View style={styles.bottomBarYellow} />
          <View style={styles.bottomBarBlue} />
        </View>
      </Page>
    </Document>
  );
};
