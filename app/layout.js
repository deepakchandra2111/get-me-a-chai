import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Get me A Chai - Fund your projects with chai",
  description: "This website is a crowdfunding platform for creators",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] text-white ">
        <SessionWrapper>
          <Navbar />
          <div className="min-h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] text-white ">
            {children}</div>
          <Footer />
          </SessionWrapper>
      </body>
    </html>
  )
}