"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import {toast} from "react-hot-toast";
import { Toaster } from "react-hot-toast";


export default function ContactPage() {
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        const form = new FormData(e.target);

        const data = {
            name: form.get("name"),
            email: form.get("email"),
            message: form.get("message"),
        };

        const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await res.json();

        setLoading(false);

        if (result.success) {
            toast.success("Message send successfully")
            e.target.reset();
        } else {
            toast.error("Failed to send Message")
        }
    };
    return (
        <div className="min-h-screen bg-gray-50 py-16 px-6 md:px-12 lg:px-24">
            <Toaster position="top-right" />
            {/* Header */}
            <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                    Contact Us
                </h1>
                <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
                    Have a question or need help? Reach out to us using the form below or through our contact details.
                </p>
            </motion.div>

            {/* Contact Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Left Info Section */}
                <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="bg-white shadow-md rounded-2xl p-8 hover:shadow-lg transition-shadow">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Get in Touch
                        </h2>

                        <div className="flex items-start gap-4 mb-4">
                            <Mail className="w-6 h-6 text-green-600 mt-1" />
                            <div>
                                <p className="font-medium text-gray-700">Email</p>
                                <p className="text-gray-600">info@adsourceitsolutions.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 mb-4">
                            <Phone className="w-6 h-6 text-green-600 mt-1" />
                            <div>
                                <p className="font-medium text-gray-700">Phone</p>
                                <p className="text-gray-600">+91 97162 34515</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <MapPin className="w-6 h-6 text-green-600 mt-1" />
                            <div>
                                <p className="font-medium text-gray-700">Address</p>
                                <p className="text-gray-600">
                                    Plot No.12, Jain Road, Near Dwarka Mor Metro Station, Metro Pillar -786, New Delhi-110059
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Map Image */}
                    <motion.div
                        className="rounded-2xl overflow-hidden shadow-md"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7373.740676381595!2d77.02452628365877!3d28.619581988417494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1da73a24973f%3A0xfcbd561b3e6e5b0b!2sAdsource%20IT%20Solutions!5e0!3m2!1sen!2sin!4v1763026735004!5m2!1sen!2sin"
                            width="600"
                            height="450"
                            loading="lazy"></iframe>
                    </motion.div>

                </motion.div>

                {/* Right Form Section */}
                <motion.div
                    className="bg-white shadow-md rounded-2xl p-8"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                        Send a Message
                    </h2>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Name</label>
                            <input
                                name="name"
                                type="text"
                                placeholder="Your name"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none transition"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Email</label>
                            <input
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none transition"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Message</label>
                            <textarea
                                name="message"
                                rows={4}
                                placeholder="Your message here..."
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none transition resize-none"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-green-600 text-white font-semibold py-3 rounded-lg transition-all 
            ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-green-700"}`}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                    Sending...
                                </div>
                            ) : (
                                "Send Message"
                            )}
                        </button>

                        <span className="text-sm text-red-700">We are working to add chatBot to help you more.</span>
                    </form>


                </motion.div>
            </div>
        </div>
    );
}
