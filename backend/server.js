import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./src/routes/userRoute.js";
import attendanceRoute from "./src/routes/attendanceRoute.js";
import salaryRoute from "./src/routes/salaryRoute.js";
dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/employees", attendanceRoute);
app.use("/api/employees", salaryRoute);

mongoose
  .connect("mongodb://localhost:27017/mern")
  .then(() => {
    console.log("connected");
  })
  .catch((e) => {
    console.log(e.message);
  });

app.listen(process.env.PORT, () => {
  console.log(`server on running on port: ${process.env.PORT}`);
});
