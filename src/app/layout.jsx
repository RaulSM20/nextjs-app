import { Inter } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/navBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RSANDEZ next app",
  description: "next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <div className="h-screen flex items-center flex-col">{children}</div>
      </body>
    </html>
  );
}
