"use client";
import Link from 'next/link';
import React, { FC, useState } from 'react'

const Navbar: FC = () => {

    const [activeTab, setActiveTab] = useState("dashboard");

    return (
        <nav className="flex font-permanent-marker justify-between text-center mb-6 pb-2">
            <Link href="/dashboard"
                className={`w-1/3 text-gray-900 pb-2 text-2xl ${activeTab === "dashboard" ? "font-semibold" : "font-normal"
                    }`}
                onClick={() => setActiveTab("dashboard")}
            >
                Dashboard
            </Link>
            <Link href="/dashboard/profile"
                className={`w-1/3 pb-2 text-2xl ${activeTab === "profile" ? "font-semibold" : "font-normal"
                    }`}
                onClick={() => setActiveTab("profile")}
            >
                Profile
            </Link>
            <Link href="/dashboard/expense"
                className={`w-1/3 pb-2 text-2xl ${activeTab === "expense" ? "font-semibold" : "font-normal"
                    }`}
                onClick={() => setActiveTab("expense")}
            >
                Expense
            </Link>
        </nav>
    )
}

export default Navbar