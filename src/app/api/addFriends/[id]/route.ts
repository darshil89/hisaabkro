import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

// dynamic route to get user friends from the database
export async function GET(req: Request) {
  const url = String(req.url);
  const parts = url.split("/");

  const userId = parts[parts.length - 1];

  try {
    const friends = await prisma.friend.findMany({
      where: {
        userId: userId as string,
      },
    });

    return NextResponse.json(friends);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch friends" });
  }
}


// dynamic route to add friends to the database
export async function DELETE(req: Request) {
  const url = String(req.url);
  const parts = url.split("/");

  const friendId = parts[parts.length - 1];

  try {
    const friends = await prisma.friend.delete({
      where: {
        id: friendId as string,
      },
    });

    return NextResponse.json({ message: "Friend deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to delete friends" });
  }
}
