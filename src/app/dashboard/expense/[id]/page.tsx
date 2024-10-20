"use client";
import { getFriendsFromDB, getSplit } from "@/helpers/dbConnect";
import React, { FC, useState, useEffect } from "react";
import { Friends, Split, Splits } from "@/types/user";
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

    const { data: session } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const id = pathname.split("/").pop();

    const addNewFriend = async () => {
        if (newFriend.trim()) {
            const friends = {
                name: newFriend,
                email: undefined,
            };
        }
    };

    const addExistingFriend = (friendName: string) => {
        const friend = existingFriends.find((friend) => friend.name === friendName);
        if (friend) {
            setSelectedFriends([...selectedFriends, friend]);
        }
    };

    useEffect(() => {
        const existingFriends = async () => {
            if (!session) return;
            const dbFriends = await getFriendsFromDB(session?.user?.id) || [];
            setExistingFriends(dbFriends);
        }

        const fetchSplit = async () => {
            if (!session) return;
            const newSplit = await getSplit(id, session.user.id) as Split;
            setSplitDetails(newSplit)
        };

        fetchSplit();
        existingFriends();
    }, [session, router]);

    console.log(session);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">{splitDetails.name}</h1>

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
                            onChange={(e) => addExistingFriend(e.target.value)}
                            value=""
                        >
                            <option value="">Select a friend</option>
                            {existingFriends?.map((friend, index) => (
                                <option key={index} value={friend.name}>
                                    {friend.name}
                                </option>
                            ))}
                        </select>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
                            onClick={() => addExistingFriend(existingFriends[0]?.name)}
                            disabled={existingFriends.length === 0}
                        >
                            Add
                        </button>
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
                                <span className="text-blue-500">
                                    Not set
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );

};

export default Page;
