"use client";
import Model from "@/components/Model";
import { createSplit, getSplits } from "@/helpers/dbConnect";
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

  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleOk = async () => {
    console.log("splitDetails = ", splitDetails);
    // create split
    const newSplit = await createSplit(splitDetails, session?.user?.id);
    console.log("new split = ", newSplit);

    setSplits([...splits, newSplit]);
    showModal();
  };

  useEffect(() => {
    const fetchSplits = async () => {
      if (!session) return;
      const newSplit = await getSplits(session.user.id) as Split[];
      setSplits(newSplit);
    }
    fetchSplits();
  }, [session, router]);

  return (
    <div className="p-4">
      <button
        onClick={showModal}
        className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add New Split
      </button>

      {isModalVisible && (
        <Model showModal={showModal} handleOk={handleOk} setSplitDetails={setSplitDetails} splitDetails={splitDetails} />
      )}

      <ul className="mt-4">
        {splits.map((item, index) => (
          <div className="flex justify-between items-center">

            <Link href={!item.splitStatus ? `/dashboard/expense/${item.id}` : `/dashboard/check/${item.id}`}>

              <li key={index} className="border-b py-2">
                <h3 className="font-bold">{item.name}</h3>
                <p>
                  Amount: ${item.totalAmount} | Type: {item.splitMethod}
                </p>
              </li>
            </Link>
            <div>{!item.splitStatus ? "Pending" : "Resolved"}</div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ExpensePage;
