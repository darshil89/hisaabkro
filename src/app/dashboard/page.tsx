"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getSplits } from "@/helpers/dbConnect";
import { Split } from "@/types/user";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  // Generate random data
  const { data: session } = useSession();
  const [splits, setSplits] = useState<Split[]>([]);
  const [yourTotalExpense, setYourTotalExpense] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!session) return;

    const fetchSplits = async () => {
      const split = await getSplits(session?.user.id) as Split[];

      const resolvedSplits = split.filter((item) => item.splitStatus === true);
      const yourExpenses = resolvedSplits.map((item) => {
        const memberAmount = item.SplitMember?.map((member) => member.email === session?.user.email ? member.amount : 0);
        return memberAmount?.reduce((acc, curr) => acc + curr, 0);
      })


      const total = yourExpenses.reduce((acc: number, curr: number | undefined) => acc + (curr ?? 0), 0);

      setYourTotalExpense(total);
      setSplits(resolvedSplits);
    }

    fetchSplits();
  }, [session, router]);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Total Expense Card */}
        <div className="bg-white flex justify-between shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Expense</h2>
          <p className="text-4xl font-bold text-indigo-600">&#8377;{yourTotalExpense}</p>
        </div>

        {/* Expense Splits */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Expense Splits <span className="text-green-500">(Resolved)</span></h2>
          <div className="space-y-4">
            <ul className="mt-4">
              {splits.map((item, index) => (
                <div className="flex justify-between items-center">

                  <Link href={!item.splitStatus ? `/dashboard/expense/${item.id}` : `/dashboard/check/${item.id}`}>

                    <li key={index} className="py-2">
                      <h3 className="font-bold">{item.name}</h3>
                      <p>
                        Total Expense: ${item.totalAmount} | Type: {item.splitMethod}
                      </p>
                    </li>
                  </Link>

                  <li key={index} className=" py-2">
                    <h3 className="font-bold">Your Expense</h3>
                    <p className="text-end">
                      {item.totalAmount}
                    </p>
                  </li>

                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;