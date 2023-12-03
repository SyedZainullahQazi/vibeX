"use server"

import User from "@/lib/models/user.model"
import { connectToDB } from "@/lib/mongoose"
import { revalidatePath } from "next/cache";

// interface for params update user so that when use, order does not matter 
interface Params {
    userId: string,
    username: string,
    name: string,
    bio: string,
    image: string,
    path: string
}

// will return an Promise which will be void 
export async function updateUser({userId,
    username,
    name,
    bio,
    image,
    path}: Params) : Promise<void> {
    connectToDB()

    // to modify our Database we should have models 
try {
    await User.findOneAndUpdate(
        { id: userId },
        // when we match the user id we go to next step
        { 
            username: username.toLowerCase(),
            name,
            bio,
            image,
            onboarded: true,
        },
        // additional options 
        {
            // update and insert at the same time 
            upsert: true
        }
    )
    
    if(path === '/profile/edit'){
        // to revalidates data associated with a specific path
        // so if we are updating an profile we can revalidate it 
        revalidatePath(path)
    }
} catch (error: any) {
    throw new Error(`Faild to create/update user: ${error.message}`)
}

}