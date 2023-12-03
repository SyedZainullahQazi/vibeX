import PostThread from "@/components/forms/PostThread"
import { fetchUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"

async function Page() {
    // to know which user is currently creatin the thread 
    const user = await currentUser()

    // if there is no user 
    if (!user) return null

    // if there is a user then we have to fetch it using fetchUser() from user.actions
    const userInfo = await fetchUser(user.id)

    // if no user-info 
    if (!userInfo?.onboarded) redirect('/onboarding')

    return (
    <>
        <h1 className="head-text">Create Thread </h1>

        {/* form to create post thread  */} 
        <PostThread userId={userInfo._id}/>
    </>
    )
}

export default Page