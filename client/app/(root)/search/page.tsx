// import {fetchUser} from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import Image from "next/image";
//import { redirect } from 'next/navigation';
import ProfileHeader from '@/components/shared/ProfileHeader'
import ThreadsTab from '@/components/shared/ThreadsTab';
import { profileTabs } from '@/constants';
import UserCard from '@/components/cards/UserCard';


async function Page()
{
    const user = await currentUser();
    // if(!user) return null;
    //This will fetchUser Info by providing the params.id which is userID
    //fetchin data of the user and using it further
    // const userInfo = await fetchUser(params.id);

    const userInfo={id:"1234",authUserId:"1234",name:"Ali",username:"aliH",
                   image:"/assets/pic.png",bio:"LEVEL 2",threads:[1,2,3]};
    // if(!userInfo?.onboarded) redirect('/onboarding');
  

    //Fetch Users
    const result = {id:"167",searchstring:"",pageNumber:"1",pageSize:"25"};
  return (
    <section>
        <h1 className='head-text mb-10'>
        Search
        </h1>

        {/* Search bar we have to render */}
    <div className='mt-14 flex flex-col gap-9'>

    //It will change after getting the useractions file  
    {/* {  result.users.length === 0 ? (
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
    } */
    <UserCard
    key = {result.id}
    id= {result.id}
    name={userInfo.name}
    username={userInfo.username}
    imgUrl={userInfo.image}
    personType='User'
    />   
    }
    </div>
    </section>
  )
}

export default Page;