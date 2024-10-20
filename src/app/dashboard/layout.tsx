import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Provider from "@/libs/Provider";
import Navbar from "@/components/customUI/Navbar";

export const metadata: Metadata = {
  title: "Hisaab Kro",
  description: "Split expenses with friends and family",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <div className="min-h-screen bg-slate-50 overflow-y-auto flex justify-center items-center">
          <div className="relative w-full md:w-4/5 h-screen lg:w-1/2 p-6 rounded-lg">
            <div className="absolute inset-0 pointer-events-none rounded-lg border-[0px] border-transparent box-border"></div>
            <Navbar />
            <hr className="border-0 h-1 bg-gradient-to-r from-transparent via-black to-transparent mb-6" />
            <div className="font-permanent-marker">
              {children}
            </div>
          </div>
        </div>
      </Provider>
    </html>
  );
}
