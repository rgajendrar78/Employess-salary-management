import Attendance from "../models/AttendanceModel.js";

const markAttendance = async (employeeId, hoursWorked) => {
  const today = new Date().toISOString().split("T")[0];
  const existing = await Attendance.findOne({ employeeId, date: today });
  if (existing) throw new Error("attendance already marked");
  const data = await Attendance.create({
    employeeId,
    date: today,
    hoursWorked,
  });
  return { success: true, message: "attendance marked successfully", data };
};

export {markAttendance};
