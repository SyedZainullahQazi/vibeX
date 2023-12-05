// import {fetchUser} from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import Image from "next/image";
//import { redirect } from 'next/navigation';
import ProfileHeader from '@/components/shared/ProfileHeader'
import ThreadsTab from '@/components/shared/ThreadsTab';
import { profileTabs } from '@/constants';
import UserCard from '@/components/cards/UserCard';
import { redirect } from 'next/navigation';
import { fetchUser, fetchUsers } from '@/lib/actions/user.actions';


async function Page()
{
    const user = await currentUser();
    if(!user) return null;
    //This will fetchUser Info by providing the params.id which is userID
    //fetchin data of the user and using it further
    const userInfo = await fetchUser(user.id);

    if(!userInfo?.onboarded) redirect('/onboarding');
  

    //Fetch Users
    const result = await fetchUsers({userId:user.id,searchString:"",pageNumber:1,pageSize:25});

  return (
    <section>
        <h1 className='head-text mb-10'>
        Search
        </h1>

        {/* Search bar we have to render */}
    <div className='mt-14 flex flex-col gap-9'>

    {  result.users.length === 0 ? (
        <p className='no-result'>
          No users
        </p>
      ) : (
        <>
        {result.users.map((person) => (
          <UserCard
          key = {person.id}
          id= {person.id}
          name={person.name}
          username={person.username}
          imgUrl={person.image}
          personType='User'
          />
        ))}
        </>
      )
    }
    
    </div>
    </section>
  )
}

export default Page;