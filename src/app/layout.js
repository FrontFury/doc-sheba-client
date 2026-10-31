import { Geist, Geist_Mono, Manrope } from "next/font/google";
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

const manrope = Manrope({
  variable: "--font-manrope",
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

const themeScript = `
  (() => {
    const storageKey = "docsheba-theme";
    let storedTheme = null;
    try {
      storedTheme = window.localStorage.getItem(storageKey);
    } catch {
    }
    if (storedTheme !== "dark" && storedTheme !== "light") {
      const cookieTheme = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith(storageKey + "="));
      storedTheme = cookieTheme ? cookieTheme.split("=")[1] : null;
    }
    const theme =
      storedTheme === "dark" || storedTheme === "light"
        ? storedTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.dataset.theme = theme;
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} h-full antialiased`}
    >
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      <body className="min-h-full flex flex-col">
        <Navbar></Navbar>
        <main>{children}</main>
        <Footer></Footer>
      </body>
    </html>
  );
}
