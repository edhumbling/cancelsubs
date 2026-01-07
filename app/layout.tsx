import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Cancel Subs - Find and Cancel Forgotten Subscriptions",
  description: "Drop your bank statements and discover hidden subscriptions you forgot about. Save money by canceling what you don't use.",
  keywords: ["subscriptions", "cancel", "save money", "bank statements", "recurring charges"],
  openGraph: {
    title: "Cancel Subs",
    description: "Find and cancel forgotten subscriptions",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
