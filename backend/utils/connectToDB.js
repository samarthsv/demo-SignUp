import mongoose from "mongoose";

const connectToDB = () => {
  mongoose
    .connect(process.env.MONGO_URL || "mongodb://localhost:27017/Signup")
    .then(() => {
      console.log("successfully connected to database");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connectToDB;
