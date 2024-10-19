"use client";
import Link from 'next/link';
import React, { FC, useState } from 'react'

const Navbar: FC = () => {

    const [activeTab, setActiveTab] = useState("dashboard");

    return (
        <nav className="flex justify-between text-center mb-6 pb-2">
            <Link href="/dashboard"
                className={`w-1/3 pb-2 ${activeTab === "dashboard" ? "font-bold" : "font-normal"
                    }`}
                onClick={() => setActiveTab("dashboard")}
            >
                Dashboard
            </Link>
            <Link href="/dashboard/profile"
                className={`w-1/3 pb-2 ${activeTab === "profile" ? "font-bold" : "font-normal"
                    }`}
                onClick={() => setActiveTab("profile")}
            >
                Profile
            </Link>
            <Link href="/dashboard/expense"
                className={`w-1/3 pb-2 ${activeTab === "expense" ? "font-bold" : "font-normal"
                    }`}
                onClick={() => setActiveTab("expense")}
            >
                Expense
            </Link>
        </nav>
    )
}

export default Navbar