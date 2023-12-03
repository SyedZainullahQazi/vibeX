import React from 'react'
interface Props{
key:string,
id:string,
currentUserId:string
parentId:string
content:string//text
author:string,
community:string,  
createdAt:string,
comments:string,}


const ThreadCard = ({key,id,currentUserId,parentId,content,author,community,
                    createdAt,comments}:Props) => {
  return (
    <main>
        <div className="p-10 bg-light-4 ">
            <h1>
              {content}
            </h1>
        </div>
    </main>
  )
}

export default ThreadCard;
