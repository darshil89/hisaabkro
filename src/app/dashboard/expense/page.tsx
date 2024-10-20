"use client";
import Model from "@/components/Model";
import { createSplit } from "@/helpers/dbConnect";
import { Split } from "@/types/user";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ExpensePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [splits, setSplits] = useState<Split[]>([]);
  const [splitDetails, setSplitDetails] = useState<Split>({
    name: "",
    amount: 0,
    type: "",
  });
  const { data: session } = useSession();
  const router = useRouter();

  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleOk = async () => {
    console.log("ok");
    console.log(splitDetails);

    // create split
    const newSplit = await createSplit(splitDetails, session?.user?.id);
    console.log(newSplit);

    

  };

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
          <li key={index} className="border-b py-2">
            <h3 className="font-bold">{item.name}</h3>
            <p>
              Amount: ${item.amount} | Type: {item.type}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpensePage;
