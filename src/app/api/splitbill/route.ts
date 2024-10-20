import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { SplitMember } from "@/types/user";
import { Split } from "@prisma/client";

export async function POST(req: Request) {
  const { split } = await req.json();

  Promise.all(
    split.finalArray.map(async (friend: SplitMember) => {
      await prisma.splitMember.create({
        data: {
          name: friend.name,
          email: friend.email,
          amount: friend.amount,
          split: {
            connect: {
              id: split.splitId,
            },
          },
        },
      });
    })
  );

  await prisma.split.update({
    where: {
      id: split.splitId,
    },
    data: {
      splitStatus: true,
    },
  });
  
  return NextResponse.json({ message: "success" });
}
