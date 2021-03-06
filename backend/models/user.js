import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true , unique : true},
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema)

export default userModel