"use client";
import { addFriendsToDB, getFriendsFromDB } from "@/helpers/dbConnect";
import React, { FC, useState, useEffect } from "react";
import { Friends } from "@/types/user";
import { useSession } from "next-auth/react";

const Page: FC = () => {
  const [friends, setFriends] = useState<Friends>([]);
  const [selectedFriends, setSelectedFriends] = useState<Friends>([]);
  const [newFriend, setNewFriend] = useState("");
  const [splitMethod, setSplitMethod] = useState("");
  const [splits, setSplits] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  const applySplit = () => {
   
  };



  const addNewFriend = async () => {
    if (newFriend.trim()) {
      const friends = {
        name: newFriend,
        email: undefined,
      };
      await addFriendsToDB(friends, session?.user.id);
      const dbFriends = (await getFriendsFromDB(session?.user.id)) || [];
      setFriends(dbFriends);
      setSelectedFriends(dbFriends);
      setNewFriend("");
    }
  };

  const addExistingFriend = (friendName: string) => {
    const friend = friends.find((friend) => friend.name === friendName);
    if (friend) {
      setSelectedFriends([...selectedFriends, friend]);
    }
  };

  useEffect(() => {
    const loadFriends = async () => {
      try {
        const dbFriends = (await getFriendsFromDB(session?.user.id)) || [];
        setFriends(dbFriends);
        setSelectedFriends(dbFriends)
      } catch (error) {
        console.error("Failed to load friends:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFriends();
  }, [session]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Expense Splitter</h1>

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
        {loading ? (
          <p>Loading friends...</p>
        ) : friends.length === 0 ? (
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
              {friends?.map((friend, index) => (
                <option key={index} value={friend.name}>
                  {friend.name}
                </option>
              ))}
            </select>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
              onClick={() => addExistingFriend(friends[0]?.name)}
              disabled={friends.length === 0}
            >
              Add
            </button>
          </div>
        )}
      </div>

      {/* Split Method Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Choose Split Method</h2>
        <select
          value={splitMethod}
          onChange={(e) => setSplitMethod(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select a method</option>
          <option value="exact">Exact</option>
          <option value="percentage">Percentage</option>
          <option value="equal">Equal</option>
        </select>
        <button
          onClick={applySplit}
          className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
        >
          Apply Split
        </button>
      </div>

      {/* Selected Friends List Section */}
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
                  {splits[friend.name] || "Not set"}
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
