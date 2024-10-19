"use client";
import React, { FC, useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react';

const Page: FC = () => {
  const [friends, setFriends] = useState<{ name: string; email: string }[]>([])
  const [newFriend, setNewFriend] = useState({ name: '', email: '' })
  const { data: session } = useSession()

  console.log(session)

  const addFriend = (e: React.FormEvent) => {
    e.preventDefault()
    if (newFriend.name && newFriend.email) {
      setFriends([...friends, newFriend])
      setNewFriend({ name: '', email: '' })
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Profile</h1>

      <div className="flex items-center mb-6">
        <Image
          src={session?.user.image || '/default-profile.png'}
          alt="Profile Picture"
          width={100}
          height={100}
          className="rounded-full mr-6"
        />
        <div>
          <h2 className="text-2xl font-semibold">{session?.user.name}</h2>
          <p className="text-gray-600">{session?.user.email}</p>
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
        <div className="relative">
          <input
            type="tel"
            id="mobile"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-16"
            placeholder="Enter your mobile number"
          />
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Save
          </button>
        </div>
      </div>

      <hr className="my-6" />

      <h3 className="text-xl font-semibold mb-4">Add Friends</h3>
      <form onSubmit={addFriend} className="mb-6">
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={newFriend.name}
            onChange={(e) => setNewFriend({ ...newFriend, name: e.target.value })}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Friend's name"
            required
          />
          <input
            type="email"
            value={newFriend.email}
            onChange={(e) => setNewFriend({ ...newFriend, email: e.target.value })}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Friend's email"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Add Friend
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-4">Friends List</h3>
      {friends.length > 0 ? (
        <ul className="space-y-2">
          {friends.map((friend, index) => (
            <li key={index} className="bg-gray-100 p-3 rounded-md">
              <p className="font-semibold">{friend.name}</p>
              <p className="text-sm text-gray-600">{friend.email}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">No friends added yet.</p>
      )}
    </div>
  )
}

export default Page