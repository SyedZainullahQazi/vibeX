import { connectToDB } from "../mongoose";
import User from "../models/user.model";
import Community from "../models/community.model";
import Thread from "../models/thread.model";

export async function fetchUser(userId: string) {
    try {
      connectToDB();
  
      return await User.findOne({ id: userId }).populate({
        path: "communities",
        model: Community,
      });
    } catch (error: any) {
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
  }

  //This function fetches posts authored by a user with a specific ID. 
  export async function fetchUserPosts(userId: string) {
    try {
      connectToDB();
  
      // Find all threads authored by the user with the given userId
      const threads = await User.findOne({ id: userId }).populate({
        path: "threads",
        model: Thread,
        populate: [
          {
            path: "community",
            model: Community,
            select: "name id image _id", // Select the "name" and "_id" fields from the "Community" model
          },
          {
            path: "children",
            model: Thread,
            populate: {
              path: "author",
              model: User,
              select: "name image id", // Select the "name" and "_id" fields from the "User" model
            },
          },
        ],
      });
      return threads;
    } catch (error) {
      console.error("Error fetching user threads:", error);
      throw error;
    }
  }