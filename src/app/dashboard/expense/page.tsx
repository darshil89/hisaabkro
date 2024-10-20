"use client";
import Model from "@/components/Model";
import { createSplit, getSplits } from "@/helpers/dbConnect";
import { formatDateTime } from "@/helpers/formate";
import { Split } from "@/types/user";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ExpensePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [splits, setSplits] = useState<Split[]>([]);
  const [splitDetails, setSplitDetails] = useState<Split>({
    name: "",
    totalAmount: 0,
    splitMethod: "",
  });
  const { data: session } = useSession();
  const router = useRouter();

  // Function to show the modal
  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  };


  // Function to handle the creation of the split
  const handleOk = async () => {
    // create split
    const newSplit = await createSplit(splitDetails, session?.user?.id);

    setSplits([...splits, newSplit]);
    showModal();
  };

  // Fetch splits
  useEffect(() => {
    const fetchSplits = async () => {
      if (!session) return;
      const newSplit = await getSplits(session.user.id) as Split[];
      setSplits(newSplit);
    }
    fetchSplits();
  }, [session, router]);

  return (
    <div className="p-4 md:p-6">
      <button
        onClick={showModal}
        className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add New Split
      </button>

      {isModalVisible && (
        <Model showModal={showModal} handleOk={handleOk} setSplitDetails={setSplitDetails} splitDetails={splitDetails} />
      )}

      <ul className="mt-4 space-y-4">
        {splits.map((item, index) => (
          <li key={index} className="flex justify-between items-center border-b py-2">
            <Link href={!item.splitStatus ? `/dashboard/expense/&#8377;{item.id}` : `/dashboard/check/&#8377;{item.id}`} className="flex-1">
              <div>
                <h3 className="font-bold">{item.name}</h3>
                <p>
                  Amount: &#8377;{item.totalAmount} | Type: {item.splitMethod}
                </p>
              </div>
              <p>{formatDateTime(item.createdAt)}</p>
            </Link>
            <div className={`${item.splitStatus ? "text-green-500" : "text-red-500"} ml-4`}>
              {!item.splitStatus ? "Pending" : "Resolved"}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpensePage;
