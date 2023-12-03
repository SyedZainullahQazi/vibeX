// This will create DB schema modal for user 
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: String,
  bio: String,
//   one user can have many threads thats why it is an object
  threads: [
    // one user have multiple refernces to one thread in DB 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
  onboarded: {
    type: Boolean,
    default: false,
  },
  communities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    },
  ],
});

// this will ensure that every time we don't create DB 
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;