import express from "express";
import verifyUser from "../middlewares/verifyUser.js";
import { userAttendance } from "../controllers/attendanceController.js";
const router = express.Router();

router.post("/attendance/mark", verifyUser, userAttendance);

export default router;
