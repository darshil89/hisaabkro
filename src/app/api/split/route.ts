import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

// route to add split to the database
export async function POST(req: Request) {
  const { name, amount, type , userId } = await req.json();
  const split = await prisma.split.create({
    data: {
      name: name,
      totalAmount: amount,
      splitMethod: type,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  return NextResponse.json(split);
}
