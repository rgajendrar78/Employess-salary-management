import {
  getAll,
  getUserById,
  signIn,
  signUp,
} from "../services/userService.js";

const SignUpUser = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const data = await signUp(email, password, role);
    res.status(201).json({ data });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

const SignInUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await signIn(email, password);
    res.status(200).json({ data });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

const userGetById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await getUserById(id);
    res.status(200).json({ data });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

const getAllUser = async (req, res) => {
  try {
    const data = await getAll();
    res.status(200).json({ data });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

export { SignUpUser, SignInUser, userGetById, getAllUser };
