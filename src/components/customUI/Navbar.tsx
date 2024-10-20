"use client";
import Link from 'next/link';
import React, { FC, useState } from 'react'
import { usePathname } from 'next/navigation';

const Navbar: FC = () => {

    const path = usePathname()
    const activetab = path.split('/')[2]

    const [activeTab, setActiveTab] = useState(activetab);

    return (
        <nav className="flex flex-row font-permanent-marker justify-between text-center mb-2 md:mb-6 pb-2">
            <Link href="/dashboard"
                className={`w-full md:w-1/3 text-gray-900 pb-2 text-lg md:text-2xl ${activeTab === "dashboard" ? "font-semibold" : "font-normal"
                    }`}
                onClick={() => setActiveTab("dashboard")}
            >
                Dashboard
            </Link>
            <Link href="/dashboard/profile"
                className={`w-full md:w-1/3 pb-2 text-lg md:text-2xl ${activeTab === "profile" ? "font-semibold" : "font-normal"
                    }`}
                onClick={() => setActiveTab("profile")}
            >
                Profile
            </Link>
            <Link href="/dashboard/expense"
                className={`w-full md:w-1/3 pb-2 text-lg md:text-2xl ${activeTab === "expense" ? "font-semibold" : "font-normal"
                    }`}
                onClick={() => setActiveTab("expense")}
            >
                Expense
            </Link>
        </nav>
    )
}

export default Navbar
