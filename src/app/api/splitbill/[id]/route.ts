import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { data } from "framer-motion/client";

// dynamic route to get user friends from the database

export async function GET(req: Request) {
  const url = String(req.url);
  const parts = url.split("/");

  const splitId = parts[parts.length - 1];

  try {
    const splitMembers = await prisma.splitMember.findMany({
      where: {
        splitId: splitId as string,
      },
    });

    const split = await prisma.split.findUnique({
      where: {
        id: splitId as string,
      },
    });
    return NextResponse.json({
      splitMembers,
      totalAmount: split?.totalAmount,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch friends" });
  }
}
