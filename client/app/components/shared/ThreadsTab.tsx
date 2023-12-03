import { fetchUserPosts } from "@/lib/actions/useractions";
import ThreadCard from "../cards/ThreadCard";

interface Props {
  currentUserId: string;//string
  accountId: string;//string
  accountType: string;
}
const ThreadsTab = async ({ currentUserId, accountId, accountType }: Props) => {
    //result=await form database
    let result = [{key:"1234",id:"1234",currentUserId:"1234",parentId:"1234",
    content:"Meow is the Cutest Animal in The World Meow Meow",author:"1234",
    community:"Kitty Nitty",createdAt:Date(),comments:"meow meow"}]; //

//   if (!result)redirect("/");

  return (
    <section className="mt-9 flex flex-col gap-10">
      {//result.threads.map instead of result
      result.map((thread) => (
        <ThreadCard
          key={thread.id}
          id={thread.id}
          currentUserId={currentUserId}
          parentId={thread.parentId}
          content={thread.content} //text
        //   author={
        //     accountType === "User"
        //       ? { name: result.name, image: result.image, id: result.id }
        //       : {
        //           name: thread.author.name,
        //           image: thread.author.image,
        //           id: thread.author.id,
        //         }
        //   }

        //Uncomment Above When Create the Database for Thread
            author={thread.author}
        //   community={
        //     accountType === "Community"
        //       ? { name: result.name, id: result.id, image: result.image }
        //       : thread.community
        //   }
          community={thread.community}  
          createdAt={thread.createdAt}
          comments={thread.comments}//children
        />
      ))}
    </section>
  );
};

export default ThreadsTab;
