import mongoose from "mongoose";

const salarySchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  basic: { type: Number, required: true },
  hra: { type: Number, required: true },
  allowance: { type: Number, required: true },
  otherDeductions: { type: Number, default: 0 },
});

const Salary = mongoose.model("Salary", salarySchema);

export default Salary;
