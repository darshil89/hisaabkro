"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getSplits } from "@/helpers/dbConnect";
import { Split } from "@/types/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDateTime } from "@/helpers/formate";
import jsPDF from "jspdf";

const Dashboard = () => {
  // Generate random data
  const { data: session } = useSession();
  const [splits, setSplits] = useState<Split[]>([]);
  const [yourTotalExpense, setYourTotalExpense] = useState(0);
  const router = useRouter();

  // Function to download the PDF
  const handleDownload = async () => {
    const doc = new jsPDF(); // Create a new jsPDF instance

    // Add title
    doc.setFontSize(20);
    doc.text("Expense Report", 20, 20);

    // Add total expense
    doc.setFontSize(16);
    doc.text(`Total Expense: ₹${yourTotalExpense}`, 20, 30);

    // Add splits details
    doc.setFontSize(14);
    splits.forEach((item, index) => {
      const startY = 40 + index * 40; // Increase spacing between splits
      doc.text(`Split ${index + 1}: ${item.name}`, 20, startY);
      doc.text(`Total Amount: ₹${item.totalAmount}`, 20, startY + 10);
      doc.text(`Type: ${item.splitMethod}`, 20, startY + 20);
      doc.text(`Created At: ${formatDateTime(item.createdAt)}`, 20, startY + 30);
      doc.text(" ", 20, startY + 40); // Add space between splits
    });

    // Save the PDF
    doc.save("expense_report.pdf");
  };

  // Splits user split details and total expense
  useEffect(() => {
    if (!session) return;

    const fetchSplits = async () => {
      const split = (await getSplits(session?.user.id)) as Split[];

      const resolvedSplits = split.filter((item) => item.splitStatus === true);
      const yourExpenses = resolvedSplits.map((item) => {
        const memberAmount = item.SplitMember?.map((member) =>
          member.email === session?.user.email ? member.amount : 0
        );
        return memberAmount?.reduce((acc, curr) => acc + curr, 0);
      });

      const total = yourExpenses.reduce(
        (acc: number, curr: number | undefined) => acc + (curr ?? 0),
        0
      );

      setYourTotalExpense(total);
      setSplits(resolvedSplits);
    };

    fetchSplits();
  }, [session, router]);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Total Expense Card */}
        <div className="bg-white flex justify-between shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Total Expense
          </h2>
          <p className="text-4xl font-bold text-indigo-600">
            &#8377;{yourTotalExpense}
          </p>
        </div>

        {/* Expense Splits */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between ">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Expense Splits <span className="text-green-500">(Resolved)</span>
            </h2>
            <button
              onClick={() => handleDownload()}
              className="w-fit shadow-[inset_0_0_0_2px_#616467] flex justify-center space-x-4 items-center text-slate-500 px-3 py-1 rounded-full text-sm tracking-widest uppercase font-bold hover:bg-[#616467] hover:text-white  duration-200"
            >
              <span>Download</span>
            </button>
          </div>
          <div className="space-y-4">
            <ul className="mt-4">
              {splits.map((item, index) => (
                <div className="flex justify-between items-center">
                  <Link
                    href={
                      !item.splitStatus
                        ? `/dashboard/expense/${item.id}`
                        : `/dashboard/check/${item.id}`
                    }
                  >
                    <li key={index} className="py-2">
                      <h3 className="font-bold">{item.name}</h3>
                      <p>
                        Total Expense: ${item.totalAmount} | Type:{" "}
                        {item.splitMethod}
                      </p>
                      <p className="text-xs">
                        {formatDateTime(item.createdAt)}
                      </p>
                    </li>
                  </Link>

                  <li key={index} className=" py-2">
                    <h3 className="font-bold">Your Expense</h3>
                    <p className="text-end">{item.totalAmount}</p>
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
