import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Voyage Analytics - AI-Powered Travel Intelligence",
  description: "Experience the future of travel booking. Real-time flight predictions, personalized AI recommendations, and seamless global exploration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
