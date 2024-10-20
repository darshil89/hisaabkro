"use client"
import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getSplitBill } from '@/helpers/dbConnect';

interface SplitMember {
  id: string;
  name: string;
  email: string | null;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

const SplitDetailsPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [splitMembers, setSplitMembers] = useState<SplitMember[]>([]);
  const [totalAmout, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    // Fetch split details from your API
    const fetchSplitDetails = async () => {
      try {
        const response = await getSplitBill(id);
        console.log('response = ', response);
        setSplitMembers(response.splitMembers);
        setTotalAmount(response.totalAmount);

      } catch (error) {
        console.error('Error fetching split details:', error);
      }
    };

    fetchSplitDetails();
  }, [id]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Split Details</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Total Amount: &#8377;{totalAmout}</h2>
        </div>
        <ul className="divide-y divide-gray-200">
          {splitMembers.map((member) => (
            <li key={member.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                {member.email && <p className="text-sm text-gray-500">{member.email}</p>}
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-green-600">&#8377;{(member.amount)}</p>
                <p className="text-xs text-gray-400">
                  Paid on {new Date(member.createdAt).toLocaleDateString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SplitDetailsPage;