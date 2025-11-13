"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, FileText, Award, FilePlus, SquareUser } from "lucide-react";
import Link from "next/link";
import LockOpenIcon from '@mui/icons-material/LockOpen';

const sections = [
    { id: "login", title: "Get Login Details", icon: <LockOpenIcon /> },
    { id: "UserProfile", title: "User Profile", icon: <SquareUser /> },
    { id: "solar-proposal", title: "Solar Proposal PDF Generation", icon: <FileText /> },
    { id: "certificate", title: "Certificate Generation", icon: <Award /> },
    { id: "custom", title: "Custom PDF Templates", icon: <FilePlus /> },
];

const userProfile = [
    {
        title: "1️⃣ View and Edit Your Profile",
        desc: "Access your personal dashboard to view your name, email, and contact details. Manage your account securely.",
        img: ["/images/user_profile.png",],
    },
    {
        title: "2️⃣ Add or Update Company Details",
        desc: "Easily add your business information — logo, address, GST number, and contact details. This data automatically appears on your generated PDFs and proposals.",
        img: ["/images/template2.png", "/images/company_preview.png"],
    },
    {
        title: "3️⃣ Track Your Proposals and Progress",
        desc: "Monitor all your created proposals in one place. View status (Draft, Sent, Approved), download previous files, and check analytics like proposal views and success rate.",
        img: ["/images/pdfusagegraph.png"],
    },
    {
        title: "4️⃣ Manage Templates and Settings",
        desc: "Access saved PDF templates, adjust your default styles, and fine-tune branding preferences — all synced with your account.",
        img: ["/images/details_profile.png", "/images/pdfusagegraph.png"],
    },
];

const sections2 = [
    {
        title: "1️⃣ Add Brand Information",
        desc: "Upload your company logo, set your brand colors, and add company tagline. This information appears in all generated PDFs to maintain consistent branding.",
        img: ["/images/add_brands.png"],
    },
    {
        title: "2️⃣ Client & Project Details",
        desc: "Enter client name, contact info, and project specifications like location, roof area, and expected energy output. This makes every proposal personalized and precise.",
        img: ["/images/cilent_details.png"],
    },
    {
        title: "3️⃣ Solar Panel Configuration",
        desc: "Select your preferred solar panels, input wattage, quantity, and efficiency. The system dynamically calculates energy output and cost estimates in real-time.",
        img: ["/images/panel_section.png"],
    },
    {
        title: "4️⃣ Inverter & Battery Section",
        desc: "Choose compatible inverters and battery models. Add brand, capacity, voltage, and warranty info. The system validates compatibility automatically.",
        img: ["/images/inverter_section.png"],
    },
    {
        title: "5️⃣ Cables & Accessories",
        desc: "Add all supporting materials — cables, junction boxes, and mounts. Pricing and total proposal cost update instantly as you modify the accessories.",
        img: ["/images/more_details.png"],
    },
    {
        title: "6️⃣ Dropdown Sections (Dynamic Inputs)",
        desc: "Use dropdown menus to quickly select predefined options for common fields — inverter types, cable lengths, or warranty durations — ensuring faster data entry.",
        img: ["/images/all_section.png"],
    },
    {
        title: "7️⃣ Add & Preview Images",
        desc: "Attach images of installation sites, layout diagrams, and final design previews. You can rearrange, delete, or zoom in on uploaded images before finalizing the proposal.",
        img: ["/images/add-preview.png"],
    },
    {
        title: "8️⃣ Add Bank Details",
        desc: "Enter your company’s banking details for direct payment integration in your proposal PDF. You can toggle between multiple accounts as needed.",
        img: ["/images/bank_details.png"],
    },
    {
        title: "9️⃣ Billing Section",
        desc: "Automatically generate itemized billing with GST/tax calculations, discounts, and payment milestones. Export-ready billing tables appear directly in your final proposal.",
        img: ["/images/table_billing.png"],
    },
    {
        title: "🔟 Terms & Conditions",
        desc: "Define all project-related terms, service conditions, and warranty details. Add multiple clause blocks with bullet points or checklists.",
        img: ["/images/terms_cond.png"],
    },
];

const steps = [
    {
        title: "1️⃣ Check the Layout",
        desc: "Design your other section with pdf design shown with the input filed and add the field and that are realvent to add ",
        img: ["/images/receipt.png", "/images/id-card.png"],
    },
    {
        title: "2️⃣ Insert Dynamic Data",
        desc: "Add smart variables for client names, pricing, or proposal details. Your templates auto-fill data at runtime.",
        img: ["/images/receipt-placeholder.png", "/images/id-placeholder.png"],
    },
    {
        title: "3️⃣ Save & Reuse",
        desc: "Save your templates to the cloud. Easily apply them across multiple clients or project types in seconds.",
        img: ["/images/receipt-placeholder.png", "/images/id-placeholder.png"],
    },
];


export default function DocumentationPage() {
    const [activeSection, setActiveSection] = useState("login");

    const renderContent = () => {
        switch (activeSection) {
            case "login":
                return (
                    <div className="py-20 px-6 md:px-16 bg-gray-50 space-y-12">
                        {/* Header */}
                        <motion.div
                            className="text-center max-w-4xl mx-auto space-y-4"
                            initial={{ opacity: 0, y: -16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="text-4xl md:text-5xl font-extrabold text-green-700">
                                How to Get Your Login Email & Password
                            </h1>
                            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
                                If you don't yet have a login, the admin will create a secure account for you. Follow the steps
                                below to request credentials, what the admin will do, and how to sign in safely.
                            </p>
                        </motion.div>

                        {/* Steps */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <motion.div
                                className="bg-white rounded-2xl shadow-md p-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">1. Request Access</h3>
                                <ol className="list-decimal list-inside text-gray-700 space-y-2">
                                    <li>Open the <strong>Contact Admin</strong> form or email the support address.</li>
                                    <li>Provide required details: full name, company name, phone, email, and role.</li>
                                    <li>Specify what access you need (e.g., create proposals, view invoices, admin privileges).</li>
                                </ol>
                            </motion.div>

                            <motion.div
                                className="bg-white rounded-2xl shadow-md p-6"
                                initial={{ opacity: 0, y: 18 }}
                                transition={{ duration: 0.6, delay: 0.05 }}
                                whileInView={{ opacity: 1, y: 0 }}
                            >
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">2. Admin: Create Account</h3>
                                <ul className="list-disc list-inside text-gray-700 space-y-2">
                                    <li>Admin verifies your details and creates an account tied to your email.</li>
                                    <li>Admin sets a secure temporary password (or invites you via a secure signup link).</li>
                                    <li>Admin sends credential details (see sample message below).</li>
                                </ul>
                            </motion.div>

                            <motion.div
                                className="bg-white rounded-2xl shadow-md p-6"
                                initial={{ opacity: 0, y: 18 }}
                                transition={{ duration: 0.6, delay: 0.05 }}
                                whileInView={{ opacity: 1, y: 0 }}
                            >
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">3. Sign In & Secure Your Account</h3>
                                <ul className="list-disc list-inside text-gray-700 space-y-2">
                                    <li>Use the emailed email & temporary password to sign in at the login page.</li>
                                    <li>Change the temporary password immediately to a strong, unique password.</li>
                                    <li>Enable 2-factor authentication if available in your profile settings.</li>
                                </ul>
                            </motion.div>
                        </div>

                        {/* Visual / Illustration */}
                        <motion.div
                            className="bg-white rounded-3xl shadow-lg p-8 md:flex md:items-center gap-8"
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="md:w-1/2 space-y-4">
                                <h2 className="text-2xl font-bold text-gray-800">What the Admin Will Send</h2>
                                <p className="text-gray-600">
                                    Admins typically send either a secure invitation link or a temporary username & password.
                                    The message will include:
                                </p>
                                <ul className="list-disc list-inside text-gray-700 space-y-1">
                                    <li>Your login email address</li>
                                    <li>A temporary password OR a secure sign-up link</li>
                                    <li>Quick steps to sign in and a prompt to change password</li>
                                    <li>Contact info in case of issues</li>
                                </ul>
                            </div>

                            <div className="md:w-1/2">
                                {/* Placeholder image box — replace with screenshot */}
                                <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm bg-linear-to-br from-green-50 to-white p-6 h-full">
                                    <div className="w-full h-48 md:h-56 flex items-center justify-center text-gray-400">
                                        Credential Email Preview (screenshot)
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Sample Admin Email */}
                        <motion.div
                            className="bg-white rounded-3xl shadow-md p-8"
                            initial={{ opacity: 0, y: 18 }}
                            transition={{ duration: 0.6, delay: 0.05 }}
                            whileInView={{ opacity: 1, y: 0 }}
                        >
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Sample Admin Message</h3>

                            <div className="bg-gray-50 border border-gray-100 rounded-xl p-6">
                                <pre className="whitespace-pre-wrap text-sm text-gray-800">
                                    {`Subject: Your Adsource Account — Access Details
          
Hello [User Name],
          
An account has been created for you on the Adsource PDF platform.
          
Login Email: user@example.com
Temporary Password: P@ssw0rd!123
          
Please sign in at https://yourdomain.com/login and change your password immediately.
For security, we recommend using a unique password and enabling two-factor authentication from your profile.
          
If you did not request this account or have any issues, contact admin at admin@yourdomain.com.
          
Regards,
Adsource Support Team`}
                                </pre>
                            </div>
                        </motion.div>

                        {/* Security Notes & Best Practices */}
                        <motion.div
                            className="bg-white rounded-3xl shadow-md p-8"
                            whileInView={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 18 }}
                            transition={{ duration: 0.6, delay: 0.05 }}
                        >
                            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Security Notes</h3>
                            <ul className="list-disc list-inside text-gray-700 space-y-2">
                                <li>Temporary passwords expire after they are used or after a short period.</li>
                                <li>Never share your password by unsecured channels (e.g., plain SMS). Request a secure link if needed.</li>
                                <li>Change the temporary password immediately and use a long, unique password.</li>
                                <li>Enable 2FA if your account supports it — this greatly improves account security.</li>
                            </ul>
                        </motion.div>

                        {/* FAQ */}
                        <motion.div
                            className="bg-white rounded-3xl shadow-md p-8 space-y-6"

                            whileInView={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 18 }}
                            transition={{ duration: 0.6, delay: 0.05 }}

                        >
                            <h3 className="text-2xl font-semibold text-gray-800">FAQ</h3>

                            <div>
                                <h4 className="font-semibold text-gray-800">Q: How long before I get access?</h4>
                                <p className="text-gray-700">Admin will process your request and share credentials following verification.</p>
                            </div>

                            <div>
                                <h4 className="font-semibold text-gray-800">Q: I didn't receive the email — what now?</h4>
                                <p className="text-gray-700">Check spam/junk folders, confirm the email address you provided, and contact admin if still missing.</p>
                            </div>

                            <div>
                                <h4 className="font-semibold text-gray-800">Q: Can I request additional permissions later?</h4>
                                <p className="text-gray-700">Yes — contact the admin and request the additional access required (they will verify and grant it).</p>
                            </div>
                        </motion.div>

                        {/* CTA */}
                        <motion.div
                            className="text-center py-10"
                            initial={{ opacity: 0, y: 18 }}
                            transition={{ duration: 0.6, delay: 0.05 }}
                            whileInView={{ opacity: 1, y: 0 }}
                        >
                            <Link href="/contact" className="inline-block">
                                <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold shadow">
                                    Contact Admin to Request Login
                                </button>
                            </Link>
                            <p className="text-gray-500 mt-3">Need help? Email <strong className="text-gray-800">info@adsourceitsolutions.com</strong></p>
                        </motion.div>
                    </div>
                )
            case "solar-proposal":
                return (
                    <div className="py-20 px-6 md:px-16 bg-gray-50 space-y-32">
                        {/* Header */}
                        <motion.div
                            className="text-center space-y-4"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-6xl font-extrabold text-green-700">
                                Solar Proposal PDF Builder Guide
                            </h1>
                            <p className="text-gray-600 text-xl max-w-4xl mx-auto leading-relaxed">
                                Learn how to create complete, professional solar proposals — from brand setup to final
                                PDF generation — with interactive tools and smart automation.
                            </p>
                        </motion.div>

                        {/* Sections */}
                        {sections2.map((s, i) => (
                            <motion.section
                                key={i}
                                className={`flex flex-col md:flex-row ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                    } items-center gap-16 md:gap-20`}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                {/* Text */}
                                <div className="md:w-1/2 space-y-6">
                                    <h2 className="text-4xl font-bold text-gray-800">{s.title}</h2>
                                    <p className="text-gray-600 text-lg leading-relaxed">{s.desc}</p>
                                </div>

                                {/* Images */}
                                <div className="md:w-9/12 flex flex-wrap gap-6 justify-center">
                                    {s.img.map((imgPath, index) => (
                                        <motion.div
                                            key={index}
                                            className="relative overflow-hidden rounded-3xl shadow-lg border border-gray-100 bg-white"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.6, delay: index * 0.2 }}
                                        >
                                            <img
                                                src={imgPath}
                                                alt={s.title}
                                                className="w-full h-auto max-h-[480px] object-contain md:max-w-[600px]"
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.section>
                        ))}

                        {/* Performance & ROI Section */}
                        <motion.section
                            className="text-center space-y-10 py-20 bg-linear-to-b from-green-50 via-white to-green-50"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-5xl font-bold text-green-700">
                                📊 Performance & ROI Analytics
                            </h2>
                            <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed">
                                Understand energy generation, return on investment, and environmental impact — all visualized with interactive graphs.
                            </p>

                            <div className="flex flex-col md:flex-row items-center justify-center gap-10 mt-8">
                                <motion.img
                                    src="/images/graph_section.png"
                                    alt="Energy Output Graph"
                                    className="rounded-3xl shadow-md border border-gray-100 w-full md:w-[48%] max-h-[500px] object-contain"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8 }}
                                />
                                <motion.img
                                    src="/images/graph.png"
                                    alt="ROI Graph"
                                    className="rounded-3xl shadow-md border border-gray-100 w-full md:w-[48%] max-h-[500px] object-contain"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                />
                            </div>
                        </motion.section>

                        {/* CTA Section */}
                        <motion.section
                            className="text-center py-20 space-y-6 bg-linear-to-t from-green-700 to-green-600 text-white rounded-3xl shadow-lg"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h3 className="text-4xl font-semibold">Ready to Build Your Proposal?</h3>
                            <p className="text-gray-100 max-w-2xl mx-auto text-lg">
                                Generate, preview, and download a professional solar proposal in minutes — complete with analytics, billing, and client branding.
                            </p>
                            <Link href="/user-dashboard/dashboard-solar/proposal"
                                className="bg-white text-green-700 px-10 py-4 rounded-full 
                      text-lg font-bold hover:bg-green-100 transition-all duration-300 shadow-xl">
                                🚀 Generate Solar Proposal PDF
                            </Link>
                        </motion.section>
                    </div>


                );
            case "certificate":
                return (
                    <motion.section
                        className="py-20 px-6 md:px-16 bg-linear-to-b from-green-50 via-white to-green-50 space-y-16 rounded-3xl"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Header */}
                        <motion.div
                            className="text-center space-y-4"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-5xl font-extrabold text-green-700">Certificate Generation</h1>
                            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
                                Automatically generate stunning, personalized certificates — from uploading your design
                                to exporting ready-to-send PDFs.
                            </p>
                        </motion.div>

                        {/* Steps & Images */}
                        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                            {/* Text Section */}
                            <div className="md:w-1/2 space-y-6">
                                <h2 className="text-3xl font-semibold text-gray-800">Follow these simple steps:</h2>
                                <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg">
                                    <li>🎨 <b>Upload your certificate template</b> (PNG, JPG, or PDF).</li>
                                    <li>🧩 <b>Define placeholders</b> for fields like Name, Date, Course, etc.</li>
                                    <li>📂 <b>Import recipient data</b> from a CSV or enter manually.</li>
                                    <li>⚡ <b>Click “Generate All”</b> — the system auto-fills and exports every certificate as PDF.</li>
                                </ul>
                            </div>

                            {/* Images Section */}
                            <div className="md:w-1/2 flex flex-wrap gap-6 justify-center">
                                {[
                                    "/images/certificate-example.png",
                                    "/images/certificate-placeholder.png",
                                    "/images/certificate-example.png",
                                ].map((img, i) => (
                                    <motion.img
                                        key={i}
                                        src={img}
                                        alt={`Certificate step ${i + 1}`}
                                        className="rounded-2xl shadow-lg border border-gray-100 w-full md:w-[47%] object-cover"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.6, delay: i * 0.2 }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Highlight Section */}
                        <motion.div
                            className="mt-16 text-center space-y-8 bg-white p-10 rounded-3xl shadow-lg border border-gray-100"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h3 className="text-4xl font-bold text-green-700">🚀 Instant Bulk Certificate Generation</h3>
                            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
                                Whether you’re creating 10 or 10,000 certificates, our automated system ensures perfect layout,
                                data accuracy, and instant PDF downloads — all powered by smart automation.
                            </p>
                            <Link
                                href="/user-dashboard/dashboard-ngo/certificate"
                                className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-md">
                                Generate Certificates Now
                            </Link>
                        </motion.div>
                    </motion.section>

                );
            case "custom":
                return (
                    <div className="py-20 px-6 md:px-16 bg-white space-y-28">
                        {/* Header */}
                        <motion.div
                            className="text-center space-y-4"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-5xl font-extrabold text-green-700">📄 Custom PDF Templates</h1>
                            <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
                                Learn how to design, personalize, and automate reusable PDF templates for proposals, invoices, or certificates.
                            </p>
                        </motion.div>

                        {/* Steps */}
                        {steps.map((s, i) => (
                            <motion.section
                                key={i}
                                className={`flex flex-col md:flex-row ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                    } items-center gap-16 md:gap-20`}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                {/* Text Block */}
                                <div className="md:w-1/2 space-y-5">
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{s.title}</h2>
                                    <p className="text-gray-600 text-lg leading-relaxed">{s.desc}</p>
                                </div>

                                {/* Image Gallery */}
                                <div className="md:w-1/2 flex flex-wrap justify-center gap-6">
                                    {s.img.map((img, index) => (
                                        <motion.img
                                            key={index}
                                            src={img}
                                            alt={s.title}
                                            className="rounded-3xl shadow-lg border border-gray-100 object-cover w-full md:w-[46%] hover:scale-[1.03] transition-all duration-300"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.6, delay: index * 0.2 }}
                                        />
                                    ))}
                                </div>
                            </motion.section>
                        ))}

                        {/* Call-to-Action */}
                        <motion.div
                            className="text-center py-16 mt-10 bg-linear-to-r from-green-600 to-green-700 rounded-3xl text-white shadow-lg space-y-6"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl font-semibold">✨ Build Templates That Work for You</h2>
                            <p className="text-lg max-w-2xl mx-auto text-gray-100">
                                Create one template and use it for all your proposals or invoices — auto-filled with client data in seconds.
                            </p>
                            <Link
                                href="/User-dashboard/dashboard-ngo/id"
                                className="bg-white text-green-700 px-10 py-4 rounded-full text-lg font-bold hover:bg-green-100 transition-all duration-300 shadow-xl">
                                🚀 Start Building Custom PDF Templates
                            </Link>
                        </motion.div>
                    </div>
                );
            case "UserProfile":
                return (
                    <div className="py-20 px-6 md:px-16 bg-gray-50 space-y-28">
                        {/* Header */}
                        <motion.div
                            className="text-center space-y-4"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-5xl font-extrabold text-green-700">
                                👤 User Profile & Dashboard
                            </h1>
                            <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
                                Learn how to personalize your experience — manage your company profile,
                                track proposals, and optimize your PDF generation workflow.
                            </p>
                        </motion.div>

                        {/* Steps */}
                        {userProfile.map((s, i) => (
                            <motion.section
                                key={i}
                                className={`flex flex-col md:flex-row ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                    } items-center gap-12 md:gap-20`}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                {/* Text */}
                                <div className="md:w-1/2 space-y-6 text-center md:text-left">
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                                        {s.title}
                                    </h2>
                                    <p className="text-gray-600 text-lg leading-relaxed">{s.desc}</p>
                                </div>

                                {/* Images */}
                                <div className="md:w-1/2 flex flex-wrap justify-center gap-6">
                                    {s.img.map((img, index) => (
                                        <motion.img
                                            key={index}
                                            src={img}
                                            alt={s.title}
                                            className="
                                                rounded-lg shadow-xl border border-gray-200 object-cover
                                                w-[95%] sm:w-[85%] md:w-[80%] lg:w-[70%] xl:w-[65%]
                                                max-h-[500px] sm:max-h-[600px] md:max-h-[650px] lg:max-h-[700px]
                                                hover:scale-[1.06] hover:shadow-2xl
                                                transition-all duration-500 ease-in-out
                                             "
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.7, delay: index * 0.2 }}
                                        />
                                    ))}
                                </div>
                            </motion.section>
                        ))}

                        {/* CTA */}
                        <motion.div
                            className="text-center py-16 mt-10 bg-linear-to-r from-green-600 to-green-700 rounded-3xl text-white shadow-lg space-y-6"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl font-semibold">
                                📈 Manage Everything in One Place
                            </h2>
                            <p className="text-lg max-w-2xl mx-auto text-gray-100">
                                Keep your data organized, proposals tracked, and branding consistent —
                                directly from your personalized dashboard.
                            </p>
                            <Link
                                href="/user-dashboard/UserProfile"
                                className="bg-white text-green-700 px-10 py-4 rounded-full text-lg font-bold hover:bg-green-100 transition-all duration-300 shadow-xl"
                            >
                                🧭 Go to My Dashboard
                            </Link>
                        </motion.div>
                    </div>

                );
            default:
                return null;
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="hidden md:flex flex-col w-64 bg-white shadow-lg p-4 space-y-2">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Documentation</h2>
                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl text-left transition-all ${activeSection === section.id
                            ? "bg-blue-100 text-blue-600 font-medium"
                            : "hover:bg-gray-100 text-gray-700"
                            }`}
                    >
                        {section.icon}
                        <span>{section.title}</span>
                    </button>
                ))}
            </aside>

            {/* Mobile Drawer Button */}
            <div className="md:hidden absolute top-4 left-4 z-10">
                <Menu className="text-gray-700 w-6 h-6" />
            </div>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-y-auto">
                <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    {renderContent()}
                </motion.div>
            </main>
        </div>
    );
}
