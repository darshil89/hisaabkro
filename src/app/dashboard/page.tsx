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
  const [yourEveryExpense, setYourEveryExpense] = useState<number[]>([]);
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
      })

      const total = yourExpenses.reduce(
        (acc: number, curr: number | undefined) => acc + (curr ?? 0),
        0
      );
      setYourEveryExpense(yourExpenses as number[]);
      setYourTotalExpense(total);
      setSplits(resolvedSplits);
    };

    fetchSplits();
  }, [session, router]);

  return (
    <div className="py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Total Expense Card */}
        <div className="bg-white flex flex-col md:flex-row justify-between shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Total Expense
          </h2>
          <p className="text-4xl font-bold text-indigo-600">
            &#8377;{yourTotalExpense}
          </p>
        </div>

        {/* Expense Splits */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex flex-col md:flex-row justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Expense Splits <span className="text-green-500">(Resolved)</span>
            </h2>
            <button
              onClick={() => handleDownload()}
              className="w-full md:w-auto shadow-[inset_0_0_0_2px_#616467] flex justify-center space-x-4 items-center text-slate-500 px-3 py-1 rounded-full text-sm tracking-widest uppercase font-bold hover:bg-[#616467] hover:text-white duration-200"
            >
              <span>Download</span>
            </button>
          </div>
          <div className="space-y-4">
            <ul className="mt-4">
              {splits.map((item, index) => (
                <li key={index} className="flex flex-col md:flex-row justify-between items-center border-b py-2">
                  <Link
                    href={
                      !item.splitStatus
                        ? `/dashboard/expense/${item.id}`
                        : `/dashboard/check/${item.id}`
                    }
                    className="flex-1"
                  >
                    <div>
                      <h3 className="font-bold">{item.name}</h3>
                      <p>
                        Total Expense: ₹{item.totalAmount} | Type:{" "}
                        {item.splitMethod }
                      </p>
                      <p className="text-xs">
                        {formatDateTime(item.createdAt)}
                      </p>
                    </div>
                  </Link>

                  <div className="mt-2 md:mt-0 w-full flex space-x-2 justify-start items-start md:block md:w-fit">
                    <h3 className="font-bold">Your Expense</h3>
                    <p className="text-end">{yourEveryExpense[index]}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
