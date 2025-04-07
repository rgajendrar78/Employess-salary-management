import express from "express";
import {
  getAllUser,
  SignInUser,
  SignUpUser,
  userGetById,
} from "../controllers/usercontroller.js";
import verifyUser from "../middlewares/verifyUser.js";
import allowHrAdmin from "../middlewares/roleVerify.js";
const router = express.Router();

router.post("/signup", SignUpUser);
router.post("/signin", SignInUser);
router.get("/:id", verifyUser, allowHrAdmin("HR", "ADMIN"), userGetById);
router.get("/", verifyUser, allowHrAdmin, getAllUser);

export default router;
