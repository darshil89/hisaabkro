"use client"
import React, { FC } from 'react'
import { usePathname } from 'next/navigation'

const Page: FC = () => {
    const pathname = usePathname()
    const id = pathname.split("/").pop()

    return (
        <div>Check - {id}</div>
    )
}

export default Page