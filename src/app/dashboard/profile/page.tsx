"use client";
import React, { FC, use, useEffect, useState } from 'react'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react';
import { AiOutlineDelete } from "react-icons/ai";
import { addFriendsToDB, addNunmberToDB, deleteFriend, getFriendsFromDB } from '@/helpers/dbConnect';
import { useRouter } from 'next/navigation';
import { Friend } from '@/types/user';

const Page: FC = () => {
  const [friends, setFriends] = useState<Friend[]>([])
  const [newFriend, setNewFriend] = useState({ name: '', email: '' })
  const [number, setNumber] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const { data: session, update, status } = useSession()
  const router = useRouter()


  // adding the friend to the friends list
  const addFriend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newFriend.name && newFriend.email) {
      // adding the friend to the friends list
      setLoading(true)
      await addFriendsToDB(newFriend, session?.user.id)
      await getFriendsFromDB(session?.user.id)
      const friends = await getFriendsFromDB(session?.user.id) || []
      setFriends(friends)
      setLoading(false)
    }
  }

  // deleting the friend from the friends list
  const handleDelete = async (id: string | undefined) => {
    if (!id) return
    await deleteFriend(id)
    await getFriendsFromDB(session?.user.id)
    const friends = await getFriendsFromDB(session?.user.id) || []
    setFriends(friends)
  }

  const saveNumber = async () => {
    // updating the number in user active session
    await update({
      ...session,
      user: {
        ...session?.user,
        number: number
      }
    })

    // adding the number to the user in the database
    const response = await addNunmberToDB(number, session?.user.id)
    alert('Mobile number saved successfully!')
  }

  // signing out the user
  const handleSignOut = async () => {
    await signOut();
  }

  // redirecting to the home page if the user is not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [status, router])

  // fetching the friends list from the database
  useEffect(() => {
    async function fetchFriends() {
      if (session) {
        const friends = await getFriendsFromDB(session?.user.id) || []
        setFriends(friends)
      }
    }
    fetchFriends()
  }, [session])

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg">
      <div className='flex justify-between'>

        <div className="flex items-center mb-6">
          <Image
            src={session?.user.image || '/icons/user.jpg'}
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
        <div>
          <button onClick={() => handleSignOut()} className="w-fit mt-8 shadow-[inset_0_0_0_2px_#616467] flex justify-center space-x-4 items-center text-gray-600 px-6 py-2 rounded-full text-sm tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white transition duration-200">
            <span>Log Out</span>
          </button>
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
        <div className="relative">
          {session?.user.number ? <>
            <div className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-16'>{session?.user.number}</div>
          </> : <><input
            type="tel"
            id="mobile"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-16"
            placeholder="Enter your mobile number"
          /> <button onClick={() => saveNumber()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition duration-200"
          >
              Save
            </button></>}
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

      {loading && <p className="text-gray-500 text-xl text-center italic">Loading...</p>}


      <h3 className="text-xl font-semibold mb-4">Friends List</h3>
      {friends.length > 0 ? (
        <ul className="space-y-2">
          {friends.map((friend, id) => (

            <li key={id} className="flex justify-between bg-gray-100 p-3 rounded-md">
              <div>
                <p className="font-semibold">{friend.name}</p>
                <p className="text-sm text-gray-600">{friend.email}</p>
              </div>
              <button className='' onClick={() => handleDelete(friend.id)}>
                <AiOutlineDelete size={25} />
              </button>
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