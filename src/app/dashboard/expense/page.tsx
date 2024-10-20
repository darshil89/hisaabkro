"use client";
import Model from "@/components/Model";
import React, { useState } from "react";

interface Split {
  id: number;
  name: string;
  amount: number;
  type: string;
}

const ExpensePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [splits, setSplits] = useState<Split[]>([]);

  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleOk = () => { };

  return (
    <div className="p-4">
      <button
        onClick={showModal}
        className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add New Split
      </button>

      {isModalVisible && (
        <Model showModal={showModal} handleOk={handleOk} />
      )}

      <ul className="mt-4">
        {splits.map((item) => (
          <li key={item.id} className="border-b py-2">
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
