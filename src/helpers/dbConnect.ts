"use client";

import { Friend, Split } from "@/types/user";
import axios from "axios";

// function to add user number to the database
export async function addNunmberToDB(
  number: string,
  userId: string | undefined
) {
  try {
    const response = await axios.post("/api/addNumber", {
      number,
      userId,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// function to add user frineds to the database
export async function addFriendsToDB(
  friends: { name: string; email: string | undefined },
  userId: string | undefined
) {
  try {
    const response = await axios.post("/api/addFriends", {
      friends,
      userId,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// function to get user friends from the database
export async function getFriendsFromDB(userId: string | undefined) {
  try {
    const response = await axios.get(`/api/addFriends/${userId}`);
    return response.data as Friend[];
  } catch (error) {
    console.error(error);
  }
}

// function to delete a particular friend from the database
export async function deleteFriend(friendId: string) {
  try {
    const response = await axios.delete(`/api/addFriends/${friendId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// function to create a split
export async function createSplit(split: Split, userId: string | undefined) {
  try {
    const response = await axios.post("/api/split", {
      name: split.name,
      amount: split.totalAmount,
      type: split.splitMethod,
      userId,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

//function to get all splits of a user
export async function getSplits(userId: string | undefined) {
  try {
    const response = await axios.get(`/api/split/${userId}`);
    return response.data as Split[];
  } catch (error) {
    console.error(error);
  }
}

// function to get a particular split
export async function getSplit(
  splitId: string | undefined,
  userId: string | undefined
) {
  try {
    const response = await axios.get(`/api/split/${userId}/${splitId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
