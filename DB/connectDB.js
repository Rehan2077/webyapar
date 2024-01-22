import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`)
    .then((res) => console.log("Server connected"))
    .catch((err) => console.log(err));
};
