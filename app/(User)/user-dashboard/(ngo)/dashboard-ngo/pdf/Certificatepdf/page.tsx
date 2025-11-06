"use client";

import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import defaultSign from "@/app/assets/signature.jpg";

interface CertificatePDFProps {
  cretificate: {
    name: string;
    title: string;
    description: string;
    leaderName: string;
    advisorName: string;
    leaderTitle: string;
    advisorTitle: string;
    headSign?: string;
    advisorSign?: string;
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
  medal: string;
  corner: string;
  bottomimage: string;
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: 30,
  },
  border: {
    borderWidth: 8,
    borderColor: "#0E1F47",
    borderRadius: 12,
    width: "100%",
    height: "100%",
    position: "relative",
    overflow: "hidden",
    padding: 30,
  },
  logo: {
    width: 400,
    height: 80,
    alignSelf: "center",
    marginBottom: 10,
    objectFit: "contain",
  },
  title: {
    fontSize: 28,
    color: "#0E1F47",
    textTransform: "uppercase",
    fontWeight: "bold",
    marginTop: 10,
  },
  medalContainer: {
    marginTop: 10,
  },
  medal: {
    width: 60,
    height: 60,
    alignSelf: "center",
  },
  presented: {
    fontSize: 16,
    color: "#555",
    marginTop: 10,
  },
  name: {
    fontSize: 26,
    color: "#0E1F47",
    fontWeight: "extrabold",
    marginTop: 8,
  },
  description: {
    fontSize: 14,
    color: "#333",
    width: "80%",
    marginHorizontal: "auto",
    marginTop: 16,
    lineHeight: 1.5,
  },
  cornerTL: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 80,
    height: 80,
  },
  cornerTR: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 80,
    height: 80,
    transform: "rotate(90deg)",
  },
  bottomImage: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "100%",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 70,
    width: "100%",
    paddingHorizontal: 50,
  },
  signatureBlock: {
    textAlign: "center",
    width: "40%",
  },
  signatureImage: {
    width: 100,
    height: 50,
    objectFit: "contain",
    alignSelf: "center",
    marginBottom: 4,
  },
  signatureName: {
    fontSize: 10,
    fontWeight: "bold",
  },
  signatureTitle: {
    fontSize: 8,
    color: "#777",
  },
  customFooter: {
    position: "absolute",
    bottom: 10,
    left: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  footerLogo: {
    width: 40,
    height: 40,
    objectFit: "contain",
  },
});

export default function CertificatePDF({
  cretificate,
  company,
  medal,
  corner,
  bottomimage,
}: CertificatePDFProps) {
  return (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={styles.border}>
        {/* Corners & Decorations */}
        <Image src={corner} style={styles.cornerTL} />
        <Image src={corner} style={styles.cornerTR} />
        <Image src={bottomimage} style={styles.bottomImage} />

        {/* ✅ Dynamic Company Logo */}
        <View>
          {company.logo && <Image style={styles.logo} src={company.logo} />}
        </View>

        <Text style={styles.title}>{cretificate.title}</Text>

        {/* Medal */}
        <View style={styles.medalContainer}>
          <Image src={medal} style={styles.medal} />
        </View>

        {/* Recipient */}
        <Text style={styles.presented}>Presented to</Text>
        <Text style={styles.name}>{cretificate.name}</Text>
        <Text style={styles.description}>{cretificate.description}</Text>

        {/* Signatures */}
        <View style={styles.footer}>
          {/* Leader */}
          <View style={styles.signatureBlock}>
            <Image
              src={cretificate.headSign || defaultSign.src}
              style={styles.signatureImage}
            />
            <Text style={styles.signatureName}>{cretificate.leaderName}</Text>
            <Text style={styles.signatureTitle}>{cretificate.leaderTitle}</Text>
          </View>

          {/* Advisor */}
          <View style={styles.signatureBlock}>
            <Image
              src={cretificate.advisorSign || defaultSign.src}
              style={styles.signatureImage}
            />
            <Text style={styles.signatureName}>{cretificate.advisorName}</Text>
            <Text style={styles.signatureTitle}>{cretificate.advisorTitle}</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
)};
