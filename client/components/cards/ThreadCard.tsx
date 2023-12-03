import React from 'react'

function ThreadCard(props:any) {
    return (
        <div className="bg-light-4 p-10">
            {props.content}
        </div>
    )
}


export default ThreadCard