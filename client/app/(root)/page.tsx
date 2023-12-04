
import { UserButton, currentUser } from "@clerk/nextjs";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";


import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";

export default async function Home() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchPosts(1, 30);

  //fetch thread
  const thread = {
    id: "",
    parentId: "",
    text: "",
    author: "",
    community: "",
    createdAt: "",
    children: [{ _id: "",
    parentId: "",
    text: "",
    author: "",
    community: "",
    createdAt: "",}],
  };
  return (
    // console.log(result);
    <>
      <h1 className="head-text text-left">
        Home
      </h1>

      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ?
          (
            <p className="no-result">No Threads Found
            </p>) : (
            <>
              {result.posts.map((post: any) => (
                <ThreadCard
                  key={post._id}
                  id={post._id}
                  currentUserId={user?.id}
                  parentId={post.parentId}
                  content={post.text}
                  author={post.author}
                  community={post.community}
                  created={post.createdAt}
                  comments={post.children}
                />
              ))}
            </>
          )
        }
        <div className="mt-7">
          <Comment
            threadId={thread.id}
            currentUserImg={userInfo.image}
            currentUserId={JSON.stringify(userInfo._id)}
          />
        </div>

        <div className="mt-10">
          {thread.children.map((childItem: any) => (
            <ThreadCard
              key={childItem._id}
              id = { childItem._id }
              currentUserId = { childItem?._id || ""}
              parentId={childItem.parentId}
              content={childItem.text}
              author={childItem.author}
              community={childItem.community}
              createdAt={childItem.createdAt}
              comments={childItem.children}
              isComment
            />
        ))}
        </div>
      </section>
    </>
  )
}
