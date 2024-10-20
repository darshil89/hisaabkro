import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";


// route to add number to the user
export async function POST(req: Request) {
  const { number, userId } = await req.json();

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { number: number },
    });
    return NextResponse.json({ message: "Number added successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to add number" });
  }
}
