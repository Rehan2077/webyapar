import { app } from "./app.js";
import { connectDB } from "./DB/connectDB.js";
import dotenv from "dotenv";

dotenv.config();

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
