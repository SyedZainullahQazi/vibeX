// This will create DB schema modal for thread 

import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
//   incase this thread is an comment 
  parentId: {
    type: String,
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
    //   one thread can have multiple threads as children(threads) or as comments and so on 
      ref: "Thread",
    },
  ],
});


// this will ensure that every time we don't create DB 
const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);

export default Thread;