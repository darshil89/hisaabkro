import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Provider from "@/libs/Provider";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";


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

    const session = await getServerSession(authOptions);

    console.log("session", session);
    if (!session) {
        redirect("/");
    }
    return (
        <html lang="en">
            <Provider>
                <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                >
                    {children}
                </body>
            </Provider>
        </html>
    );
}
