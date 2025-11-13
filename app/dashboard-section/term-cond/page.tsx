"use client";

import { motion } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6 md:px-20">
      {/* Header */}
      <motion.div
        className="text-center max-w-4xl mx-auto space-y-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-extrabold text-green-700">
          Terms & Conditions
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Please read these terms and conditions carefully before using our website and PDF generation services.
        </p>
      </motion.div>

      {/* Content */}
      <div className="mt-16 space-y-20">
        {/* Section 1 */}
        <motion.section
          className="bg-white rounded-3xl shadow-md p-8 md:p-12 space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <CheckCircleIcon className="h-7 w-7 text-green-600" />
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            By accessing or using our platform, you agree to comply with and be bound by these Terms & Conditions. 
            If you do not agree to these terms, you should not use the website or its services.
          </p>
        </motion.section>

        {/* Section 2 */}
        <motion.section
          className="bg-white rounded-3xl shadow-md p-8 md:p-12 space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <CheckCircleIcon className="h-7 w-7 text-green-600" />
            2. Use of Service
          </h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg">
            <li>You must be at least 18 years old to use our platform.</li>
            <li>You agree not to use the service for any illegal or unauthorized purposes.</li>
            <li>
              You are responsible for maintaining the confidentiality of your account and password.
            </li>
            <li>
              We reserve the right to suspend or terminate access if suspicious activity is detected.
            </li>
          </ul>
        </motion.section>

        {/* Section 3 */}
        <motion.section
          className="bg-white rounded-3xl shadow-md p-8 md:p-12 space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <CheckCircleIcon className="h-7 w-7 text-green-600" />
            3. Intellectual Property Rights
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            All content, design elements, source code, and materials on this platform are owned by us or our licensors. 
            You may not copy, modify, or distribute any part of the website without written consent.
          </p>
        </motion.section>

        {/* Section 4 */}
        <motion.section
          className="bg-white rounded-3xl shadow-md p-8 md:p-12 space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <CheckCircleIcon className="h-7 w-7 text-green-600" />
            4. Data Privacy & Security
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            We value your privacy. All personal and company information shared within your profile or during PDF generation 
            is securely stored and will not be shared with third parties without consent. 
            However, we are not responsible for data loss caused by user error or external attacks.
          </p>
        </motion.section>

        {/* Section 5 */}
        <motion.section
          className="bg-white rounded-3xl shadow-md p-8 md:p-12 space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <CheckCircleIcon className="h-7 w-7 text-green-600" />
            5. Limitation of Liability
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our platform is provided on an “as-is” basis. We do not guarantee uninterrupted or error-free service. 
            In no event shall we be liable for any direct, indirect, incidental, or consequential damages 
            arising from the use or inability to use our platform.
          </p>
        </motion.section>

        {/* Section 6 */}
        <motion.section
          className="bg-white rounded-3xl shadow-md p-8 md:p-12 space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <CheckCircleIcon className="h-7 w-7 text-green-600" />
            6. Modifications
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            We reserve the right to modify or update these Terms & Conditions at any time without prior notice. 
            Changes will be effective immediately upon posting on this page. Continued use of our platform 
            constitutes acceptance of the revised terms.
          </p>
        </motion.section>

        {/* Section 7 */}
        <motion.section
          className="bg-white rounded-3xl shadow-md p-8 md:p-12 space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <CheckCircleIcon className="h-7 w-7 text-green-600" />
            7. Contact Information
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            For questions or concerns regarding these Terms & Conditions, 
            please contact our support team at{" "}
            <span className="text-green-700 font-semibold">support@yourdomain.com</span>.
          </p>
        </motion.section>
      </div>

      {/* CTA Footer */}
      <motion.div
        className="text-center mt-20 bg-linear-to-r from-green-600 to-green-700 text-white rounded-3xl py-14 px-8 shadow-lg space-y-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-semibold">Thanks for trusting our platform 💚</h2>
        <p className="text-gray-100 text-lg max-w-2xl mx-auto">
          By continuing to use our website, you acknowledge that you have read and understood these Terms & Conditions.
        </p>
      </motion.div>
    </div>
  );
}
