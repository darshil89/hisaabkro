import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";


// dynamic route to get a particular split details from the database
export async function GET(req: Request) {
  const url = String(req.url);
  const parts = url.split("/");
  const splitId = parts[parts.length - 1];
  const splits = await prisma.split.findFirst({
    where: {
      id: splitId as string,
    },
  });

  return NextResponse.json(splits);
}
