import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Provider from "@/libs/Provider";
import Navbar from "@/components/customUI/Navbar";


const geistSans = localFont({
    src: "../fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "../fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

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
                <div className="min-h-screen white flex justify-center items-center">
                    <div className="relative w-4/5 h-screen md:w-2/3 lg:w-1/2 p-6 rounded-lg bg-slate-50">
                        <div className="absolute inset-0 pointer-events-none rounded-lg border-[0px] border-transparent box-border" style={{
                            boxShadow: `
                            0 0 15px 15px white,   
                            0 0 15px 15px white inset, 
                            15px 0 15px 15px white,    
                            -15px 0 15px 15px white inset 
                        `
                        }}></div>
                        <Navbar />
                        <hr className="border-0 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-6" />
                        <div
                            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                        >
                            {children}
                        </div>
                    </div>
                </div>
            </Provider>
        </html>
    );
}
