"use client"
import { useSession } from 'next-auth/react'
import React, { FC } from 'react'

const Page: FC = () => {
  const { data: session, status } = useSession()
  return (
    <div>Dashboard Page</div>
  )
}

export default Page