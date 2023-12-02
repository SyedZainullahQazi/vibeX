import AccountProfile from "@/components/forms/AccountProfile"
import { currentUser } from "@clerk/nextjs"


async function Page () {
  // to get the user data from the clerk 
  const user = await currentUser()

  // it will fetch the data of the users (not the current user) from the database
  const userInfo = {}

  // object of the user data 
  const userData = {

    id: user?.id, // id of the currently logged in user from clerk
    objectID: userInfo?._id, // ? is the "if exists"
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl,

  }

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className='head-text'>Hello World Boarding PAge</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete your profile now to use vibeX
      </p>

      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfile user={userData} btnTitle="Continue"/>
      </section>
    </main>
  )
}

export default Page
