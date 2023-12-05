
import { fetchUserPosts } from "@/lib/actions/user.actions";
import ThreadCard from "../cards/ThreadCard";
import { redirect } from "next/navigation";

interface Props {
  currentUserId: string;//string
  accountId: string;//string
  accountType: string;
}
const ThreadsTab = async ({ currentUserId, accountId, accountType }: Props) => {
    //result=await form database
    let result = await fetchUserPosts(accountId);

  if (!result)redirect("/");

  return (
    <section className="mt-9 flex flex-col gap-10">
      {//result.threads.map instead of result
      result.threads.map((thread:any) => (
        <ThreadCard
          key={thread.id}
          id={thread.id}
          currentUserId={currentUserId}
          parentId={thread.parentId}
          content={thread.text} //text
          author={
            accountType === "User"
              ? { name: result.name, image: result.image, id: result.id }
              : {
                  name: thread.author.name,
                  image: thread.author.image,
                  id: thread.author.id,
                }
          }
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
