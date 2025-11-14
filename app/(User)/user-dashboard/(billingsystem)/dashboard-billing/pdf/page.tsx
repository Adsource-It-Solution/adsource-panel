export const dynamic = "force-dynamic";

import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image,
} from "@react-pdf/renderer";

export interface InvoiceItem {
    name: string;
    hsn: string;
    qty: number;
    rate: number;
}

export interface BankDetails {
    name: string;
    branch: string;
    account: string;
    ifsc: string;
}

export interface InvoiceData {
    companyName?: string;
    tagline?: string;
    address?: string;
    contactNumber?: string;
    website?: string;

    invoiceNo: string;
    date: string;
    pan: string;
    gst: string;

    customerName: string;
    customerAddress: string;
    challanNo?: string;
    transport?: string;

    items: InvoiceItem[];
    igstPercent: number;

    totalInWords: string;
    terms?: string;
    bank: BankDetails;
}

export interface CompanyData {
    logo?: string;
    name: string;
    website?: string;
}


// Styles
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 10,
        backgroundColor: "#ffffff",
    },

    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    logo: {
        width: 70,
        height: 70,
        marginRight: 10,
    },
    companyName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#0b4b2d",
    },
    tagline: {
        fontSize: 11,
        color: "#0b4b2d",
    },
    invoiceTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#0b4b2d",
    },

    divider: {
        marginVertical: 8,
        height: 1,
        backgroundColor: "#cccccc",
    },

    table: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#ddd",
        borderCollapse: "collapse",
    },
    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#e6f4ea",
        borderBottomWidth: 1,
        borderColor: "#ddd",
    },
    th: {
        flex: 1,
        padding: 6,
        fontWeight: "bold",
        borderRightWidth: 1,
        borderColor: "#ddd",
    },
    td: {
        flex: 1,
        padding: 6,
        borderRightWidth: 1,
        borderColor: "#ddd",
    },
    row: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "#ddd",
    },

    bankBox: {
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 6,
        borderRadius: 4,
    },
    termsBox: {
        marginTop: 6,
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: "#ddd",
        padding: 6,
    },
});

interface InvoicePDFProps {
    invoice: InvoiceData;
    company: CompanyData;
    subtotal: number;
    igst: number;
    grandTotal: number;
    qrData: string;
    qrImage: string;
}

const InvoicePDF: React.FC<InvoicePDFProps> = ({
    invoice,
    company,
    subtotal,
    igst,
    grandTotal,
    qrImage
}) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* HEADER */}
                <View style={styles.headerRow}>
                    {/* Left Section */}
                    <View style={{ flexDirection: "row", flex: 1 }}>
                        {company.logo ? (
                            <Image src={company.logo} style={styles.logo} />
                        ) : null}
                        <View>
                            <Text style={styles.companyName}>
                                {invoice.companyName || company.name}
                            </Text>
                            <Text style={styles.tagline}>{invoice.tagline}</Text>
                            <Text>{invoice.address}</Text>
                            <Text>
                                Tel: {invoice.contactNumber} | Web:{" "}
                                {invoice.website || company.website}
                            </Text>
                        </View>
                    </View>

                    {/* Right Section */}
                    <View style={{ textAlign: "right" }}>
                        <Text style={styles.invoiceTitle}>TAX INVOICE</Text>
                        <Text>Invoice No: {invoice.invoiceNo}</Text>
                        <Text>Date: {invoice.date}</Text>
                        <Text>PAN: {invoice.pan}</Text>
                        <Text>GSTIN: {invoice.gst}</Text>
                    </View>
                </View>

                <View style={styles.divider} />

                {/* BILL TO */}
                <View>
                    <Text style={{ fontWeight: "bold" }}>Bill To:</Text>
                    <Text>{invoice.customerName}</Text>
                    <Text>{invoice.customerAddress}</Text>
                    <Text>
                        Challan No: {invoice.challanNo || "-"} | Transport:{" "}
                        {invoice.transport || "-"}
                    </Text>
                </View>

                {/* TABLE */}
                <View style={{ marginTop: 15 }}>
                    <View style={styles.table}>
                        {/* HEADER */}
                        <View style={styles.tableHeader}>
                            <Text style={styles.th}>S.No</Text>
                            <Text style={styles.th}>Description</Text>
                            <Text style={styles.th}>HSN</Text>
                            <Text style={styles.th}>Qty</Text>
                            <Text style={styles.th}>Rate</Text>
                            <Text style={styles.th}>Taxable Value</Text>
                        </View>

                        {/* ROWS */}
                        {invoice.items.map((item, i) => (
                            <View style={styles.row} key={i}>
                                <Text style={styles.td}>{i + 1}</Text>
                                <Text style={styles.td}>{item.name}</Text>
                                <Text style={styles.td}>{item.hsn}</Text>
                                <Text style={styles.td}>{item.qty}</Text>
                                <Text style={styles.td}>{item.rate}</Text>
                                <Text style={styles.td}>{item.qty * item.rate}</Text>
                            </View>
                        ))}

                        {/* TOTAL ROWS */}
                        <View style={styles.row}>
                            <Text style={[styles.td, { flex: 5, textAlign: "right" }]}>
                                Total
                            </Text>
                            <Text style={[styles.td, { fontWeight: "bold" }]}>
                                {subtotal}
                            </Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={[styles.td, { flex: 5, textAlign: "right" }]}>
                                IGST ({invoice.igstPercent}%)
                            </Text>
                            <Text style={styles.td}>{igst}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text
                                style={[
                                    styles.td,
                                    { flex: 5, textAlign: "right", fontSize: 14, fontWeight: "bold" },
                                ]}
                            >
                                Grand Total
                            </Text>
                            <Text style={[styles.td, { fontSize: 14, fontWeight: "bold" }]}>
                                {grandTotal}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* BOTTOM SECTION */}
                <View
                    style={{
                        marginTop: 15,
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    {/* LEFT: Words + Terms */}
                    <View style={{ width: "50%" }}>
                        <Text style={{ fontWeight: "bold" }}>Total (in words)</Text>
                        <Text>{invoice.totalInWords}</Text>

                        <View style={styles.termsBox}>
                            <Text style={{ fontWeight: "bold" }}>Terms and Conditions</Text>
                            <Text>
                                {invoice.terms ||
                                    "Subject to Mumbai jurisdiction. Delivery ex-works."}
                            </Text>
                        </View>
                    </View>

                    {/* MIDDLE: Signature */}
                    <View
                        style={{
                            width: "20%",
                            textAlign: "center",
                        }}
                    >
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: "#eee",
                                padding: 10,
                                height: 120,
                            }}
                        >
                            <Text>Authorized Signatory</Text>
                            <View style={{ marginTop: 50 }} />
                            <Text style={{ fontSize: 8 }}>(Computer generated invoice)</Text>
                        </View>
                    </View>

                    {/* RIGHT: Bank + QR */}
                    <View style={{ width: "25%" }}>
                        <View style={styles.bankBox}>
                            <Text style={{ fontWeight: "bold" }}>Bank Details</Text>
                            <Text>Name: {invoice.bank.name}</Text>
                            <Text>Branch: {invoice.bank.branch}</Text>
                            <Text>A/C: {invoice.bank.account}</Text>
                            <Text>IFSC: {invoice.bank.ifsc}</Text>

                            <Image src={qrImage} style={{ width: 110, height: 110 }} />
                            <Text
                                style={{
                                    fontSize: 8,
                                    textAlign: "center",
                                    marginTop: 4,
                                }}
                            >
                                Scan to view transaction
                            </Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default InvoicePDF;
