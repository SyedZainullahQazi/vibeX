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
    <div>ThreadCard</div>
  )
}

export default ThreadCard;
