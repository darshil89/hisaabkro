import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

// backend function to add friends to the database
export async function POST(req: Request) {
  const { friends, userId } = await req.json();

  try {
    const friend = await prisma.friend.create({
      data: {
        name: friends.name,
        email: friends.email,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return NextResponse.json({ message: "Friends added successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to add friends" });
  }
}
