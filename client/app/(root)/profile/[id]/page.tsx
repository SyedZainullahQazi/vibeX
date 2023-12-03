
// import {fetchUser} from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import Image from "next/image";
import { redirect } from 'next/navigation';
import ProfileHeader from '@/components/shared/ProfileHeader'

import ThreadsTab from '@/components/shared/ThreadsTab';
import { profileTabs } from '@/constants';
import { Tabs ,TabsList,TabsTrigger,TabsContent} from '@/components/ui/tabs';

async function Page({params}: {params: {id:string}})
{
    const user = await currentUser();
    // if(!user) return null;
    //This will fetchUser Info by providing the params.id which is userID
    //fetchin data of the user and using it further
    // const userInfo = await fetchUser(params.id);

    const userInfo={id:"1234",authUserId:"1234",name:"Ali",username:"aliH",
                   image:"/assets/pic.png",bio:"LEVEL 2",threads:[1,2,3]};
    // if(!userInfo?.onboarded) redirect('/onboarding');
    return (
        <section>
           <ProfileHeader
           accountId = {userInfo.id}
// authUserId tells us if the current loged in user sees it own profile or some other else
           authUserId = {user?.id}
           name = {userInfo.name}
           username = {userInfo.username}
           imgUrl = {userInfo.image}
           bio = {userInfo.bio}
           />
           <div className='mt-9'>
            <Tabs defaultValue='threads' className='w-full'>
              <TabsList className='tab'>
               {profileTabs.map((tab) => (
                <TabsTrigger key = {tab.label} value={tab.value} className='tab'>
                    <Image 
                     src = {tab.icon}
                     alt = {tab.label}
                     width={24}
                     height={24}
                     className="object-contain"
                    />
                    <p className='max-sm:hidden'>{tab.label}</p>
                    {/* Total no of count of threads in thread tab */}
                    {tab.label === 'Threads' && (
                        <p className='ml-1 rounden-sm bg-light-4 px-2 py-1 
                        !text-tiny-medium text-light-2'>
                            {userInfo?.threads?.length}
                        </p>
                    )}
                </TabsTrigger>
                ))}
              </TabsList>
              {profileTabs.map((tab) => (
                <TabsContent key = {`content-${tab.label}`} value={tab.value}
                className='w-full text-light-1'>
                    <ThreadsTab
                     currentUserId = {user.id}
                     accountId = {userInfo.id}
                     accountType = "User"/>
                </TabsContent>
              ))}
            </Tabs>
           </div>
        </section>
    )
}
export default Page;