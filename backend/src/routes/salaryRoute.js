import express from "express";
import verifyUser from "../middlewares/verifyUser.js";
import allowHrAdmin from "../middlewares/roleVerify.js";
import {
  calculateSalary,
  createSalary,
  salaryGetById,
} from "../controllers/salaryController.js";
const router = express.Router();

router.post("/salary/calculate", verifyUser, allowHrAdmin, calculateSalary);
router.post("/salary/create", verifyUser, allowHrAdmin, createSalary);
router.get("/salary/:id", verifyUser, salaryGetById);

export default router;
