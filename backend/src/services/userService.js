import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const signUp = async (email, password, role) => {
  if (!email || !password) throw new Error("email and password are required!");

  const user = await User.findOne({ email });
  if (user) throw new Error("user exist already!");

  const hashedPassword = await bcrypt.hash(password, 10);
  const data = await User.create({ email, password: hashedPassword, role });
  return {
    success: true,
    message: "user created successfully!",
    data,
  };
};

const signIn = async (email, password) => {
  if (!email || !password) throw new Error("email and password are required!");

  const user = await User.findOne({ email });

  console.log(user);

  if (!user) throw new Error("Invalid email and password!");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email and password!");
  const token = jwt.sign(
    { userId: user._id, email, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
  user.password = undefined;
  return {
    success: true,
    message: "login successfully!",
    user: { id: user._id, email, token, role: user.role },
  };
};

const getUserById = async (id) => {
  const data = await User.find({ _id: id });
  return {
    success: true,
    data,
  };
};

const getAll = async () => {
  const data = await User.find();
  return {
    success: true,
    data,
  };
};

export { signUp, signIn, getUserById,getAll };
