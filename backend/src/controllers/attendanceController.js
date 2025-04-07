import { markAttendance } from "../services/attendanceServices.js";

const userAttendance = async (req, res) => {
  const { hoursWorked } = req.body;
  const { userId } = req.user;
  try {
    const data = await markAttendance(userId, hoursWorked);
    res.status(201).json({ data });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

export { userAttendance };
