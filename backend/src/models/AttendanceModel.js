import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, required: true },
  hoursWorked: { type: Number, required: true },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
