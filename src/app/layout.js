import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DocSheba | Find Doctors & Book Appointments Online",
  description:
    "DocSheba makes healthcare easier. Find trusted doctors, explore medical services, and book appointments online in Bangladesh.",
  keywords: [
    "DocSheba",
    "online doctor appointment",
    "find doctors in Bangladesh",
    "healthcare services",
    "book doctor appointment",
    "medical consultation",
  ],
  authors: [{ name: "DocSheba" }],
  openGraph: {
    title: "DocSheba | Your Trusted Healthcare Partner",
    description:
      "Find trusted doctors and book medical appointments easily with DocSheba. Your health, our priority.",
    siteName: "DocSheba",
    locale: "en_BD",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar></Navbar>
        <main>{children}</main>
        <Footer></Footer>
      </body>
    </html>
  );
}
