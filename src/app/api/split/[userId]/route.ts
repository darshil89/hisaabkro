import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(req: Request) {
  const url = String(req.url);
  const parts = url.split("/");
  const userId = parts[parts.length - 1];
  const splits = await prisma.split.findMany({
    where: {
      userId: userId as string,
    },
  });

  return NextResponse.json(splits);
}
