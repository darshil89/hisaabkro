"use client";
import { addSplitBill, getFriendsFromDB, getSplit } from "@/helpers/dbConnect";
import React, { FC, useState, useEffect } from "react";
import { Friends, Split } from "@/types/user";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const Page: FC = () => {
    const [existingFriends, setExistingFriends] = useState<Friends>([]);
    const [selectedFriends, setSelectedFriends] = useState<Friends>([]);
    const [newFriend, setNewFriend] = useState("");
    const [splitDetails, setSplitDetails] = useState<Split>({
        name: "",
        totalAmount: 0,
        splitMethod: "",
    });
    const [friendAmounts, setFriendAmounts] = useState<{ [key: string]: number }>({});

    const { data: session } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const id = pathname.split("/").pop();

    // function to add a new friend to the selected friends list
    const addNewFriend = async () => {
        if (!newFriend) {
            alert("Please enter a friend's name");
            return;
        }
        if (selectedFriends.find((friend) => friend.name === newFriend)) {
            alert("Friend already added");
            return;
        }

        const friends = {
            name: newFriend,
            email: undefined,
            userId: session?.user?.id,
        };

        if (friends) {
            setSelectedFriends([...selectedFriends, friends]);
            setNewFriend("");
        }
    };

    // function to add the existing friend to the selected friends list
    const addExistingFriend = (friendName: string) => {
        const friend = existingFriends.find((friend) => friend.name === friendName);
        if (selectedFriends.find((friend) => friend.name === friendName)) {
            alert("Friend already added");
            return;
        }
        if (friend) {
            setSelectedFriends([...selectedFriends, friend]);
        }
    };


    // function to update the amount of the friend based on the split method
    const updateFriendAmount = (friendName: string, amount: number) => {
        if (splitDetails.splitMethod === 'equal') {
            return;
        }

        let newAmount = amount;
        if (splitDetails.splitMethod === 'percentage') {
            newAmount = Math.min(100, Math.max(0, amount));
        } else if (splitDetails.splitMethod === 'exact') {
            newAmount = Math.min(splitDetails.totalAmount, Math.max(0, amount));
        }

        setFriendAmounts(prev => ({
            ...prev,
            [friendName]: newAmount
        }));
    };

    // Function to handle the split bill and save it to the database
    const handleSplitbill = async () => {
        if (selectedFriends.length === 0) {
            alert("Please select at least one friend");
            return;
        }

        let f: { [key: string]: number } = {};
        if (splitDetails.splitMethod === 'exact') {
            f = friendAmounts;
        } else if (splitDetails.splitMethod === 'equal') {
            selectedFriends.forEach((friend) => {
                f[friend.name] = parseFloat((splitDetails.totalAmount / selectedFriends.length).toFixed(2));
            });
        } else {
            selectedFriends.forEach((friend) => {
                f[friend.name] = parseFloat(((friendAmounts[friend.name] / 100) * splitDetails.totalAmount).toFixed(2));
            });

        }

        // build an array of objs that contain name , email and amount to be paid
        const finalArray: { name: string, email: string, amount: number }[] = [];

        // match the name of the friend and f to get the email 
        selectedFriends.forEach((friend) => {
            finalArray.push({
                name: friend.name,
                email: friend.email || "",
                amount: f[friend.name],
            });
        });

        const split = {
            splitId: splitDetails.id,
            finalArray,
        };

        await addSplitBill(split);


        router.push("/dashboard/expense");
    };



    // Fetch the existing friends and the split details
    useEffect(() => {
        const existingFriends = async () => {
            if (!session) return;
            const dbFriends = (await getFriendsFromDB(session?.user?.id)) || [];
            const myself = {
                name: session.user.name + " (You)" || "",
                email: session.user.email || "",
                userId: session.user.id,
            }
            setExistingFriends([myself, ...dbFriends]);
        };

        const fetchSplit = async () => {
            if (!session) return;
            const newSplit = (await getSplit(id, session.user.id)) as Split;
            setSplitDetails(newSplit);
        };

        fetchSplit();
        existingFriends();
    }, [session, router]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center">{splitDetails.name}</h1>
            <hr className="mb-1 mt-1" />
            <p className="text-md mb-6 text-center">
                Split <span className="underline">&#8377; {splitDetails.totalAmount}</span> by{" "}
                <span className="underline">{splitDetails.splitMethod}</span> value
            </p>
            {/* Add New Friend Section */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Add New Friend</h2>
                <div className="flex">
                    <input
                        type="text"
                        value={newFriend}
                        onChange={(e) => setNewFriend(e.target.value)}
                        className="flex-grow p-2 border rounded-l"
                        placeholder="Enter friend's name"
                    />
                    <button
                        onClick={addNewFriend}
                        className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* Add Existing Friends Section */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Add Existing Friends</h2>
                {existingFriends.length === 0 ? (
                    <p className="text-gray-500">
                        No friends available. Add some friends to your account first.
                    </p>
                ) : (
                    <div className="flex">
                        <select
                            className="flex-grow p-2 border rounded-l"
                            onChange={(e) => {
                                addExistingFriend(e.target.value)
                            }}
                            value=""
                        >
                            <option value="">Select a friend</option>
                            {existingFriends?.map((friend, index) => (
                                <option key={index} value={friend.name}>
                                    {friend.name}
                                </option>
                            ))}
                        </select>

                    </div>
                )}
            </div>

            {/* Selected Friends List for the split Section */}
            <div>
                <h2 className="text-xl font-semibold mb-2">Selected Friends</h2>
                {selectedFriends.length === 0 ? (
                    <p className="text-gray-500">No friends selected yet.</p>
                ) : (
                    <ul className="space-y-2">
                        {selectedFriends.map((friend, index) => (
                            <li
                                key={index}
                                className="flex justify-between items-center bg-gray-100 p-2 rounded"
                            >
                                <span>{friend.name}</span>
                                {splitDetails.splitMethod === 'equal' ? (
                                    <span className="text-blue-500">
                                        {(splitDetails.totalAmount / selectedFriends.length).toFixed(2)}
                                    </span>
                                ) : splitDetails.splitMethod === 'percentage' ? (
                                    <input
                                        type="number"
                                        value={friendAmounts[friend.name] || ''}
                                        onChange={(e) => updateFriendAmount(friend.name, Number(e.target.value))}
                                        className="w-20 p-1 border rounded"
                                        placeholder="%"
                                        min="0"
                                        max="100"
                                    />
                                ) : splitDetails.splitMethod === 'exact' ? (
                                    <input
                                        type="number"
                                        value={friendAmounts[friend.name] || ''}
                                        onChange={(e) => updateFriendAmount(friend.name, Number(e.target.value))}
                                        className="w-20 p-1 border rounded"
                                        placeholder="Amount"
                                        min="0"
                                        max={splitDetails.totalAmount}
                                    />
                                ) : (
                                    <span className="text-blue-500">Not set</span>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div>
                <button
                    className="bg-blue-500 w-full text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
                    onClick={() => handleSplitbill()}
                >
                    Save Split
                </button>
            </div>
        </div>
    );
};

export default Page;
