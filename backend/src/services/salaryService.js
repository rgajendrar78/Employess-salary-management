import Attendance from "../models/AttendanceModel.js";
import Salary from "../models/salaryModel.js";
import {
  calculateGross,
  calculateNet,
  calculatePF,
  calculateTax,
} from "../utils/salaryCalculation.js";

const salaryCreate = async (
  employeeId,
  hra,
  basic,
  allowance,
  otherDeductions
) => {
  const existing = await Salary.findOne({ employeeId });
  if (existing) throw new Error("salary already exists");
  const salary = await Salary.create({
    employeeId,
    hra,
    basic,
    allowance,
    otherDeductions,
  });
  return { message: "salary created successfully", salary };
};

const getByIdSalary = async (employeeId) => {
  const data = await Salary.find({ employeeId });
  if (!data) throw new Error("salary not found");
  return data;
};

const salaryCalculate = async (employeeId, month) => {
  try {
    const salaryData = await Salary.findOne({ employeeId });
    if (!salaryData) {
      throw new Error("Salary configuration not found");
    }

    const { basic, hra, allowance, otherDeductions } = salaryData;
    if (
      basic == null ||
      hra == null ||
      allowance == null ||
      otherDeductions == null
    ) {
      throw new Error("Salary data contains null or missing fields");
    }

    const gross = calculateGross(salaryData);
    const pf = calculatePF(basic);
    const tax = calculateTax(gross);

    if (!/^\d{4}-\d{2}$/.test(month)) {
      throw new Error("Invalid month format. Expected format: YYYY-MM");
    }

    const [year, monthIndex] = month.split("-").map(Number);
    if (isNaN(year) || isNaN(monthIndex) || monthIndex < 1 || monthIndex > 12) {
      throw new Error("Invalid month or year in input");
    }

    const startDate = new Date(year, monthIndex - 1, 1);
    const endDate = new Date(year, monthIndex, 1);

    const attendance = await Attendance.find({
      employeeId,
      date: { $gte: startDate, $lt: endDate },
    });

    const fullDays = attendance.filter((a) => a.hoursWorked >= 8).length;
    const halfDays = attendance.filter(
      (a) => a.hoursWorked > 0 && a.hoursWorked < 8
    ).length;
    const workingDays = new Date(year, monthIndex, 0).getDate();

    const netSalary = calculateNet({
      gross,
      fullDays,
      halfDays,
      workingDays,
      tax,
      pf,
      otherDeductions,
    });

    return { gross, tax, pf, fullDays, halfDays, netSalary };
  } catch (error) {
    throw new Error(`Error calculating salary: ${error.message}`);
  }
};

export { salaryCreate, salaryCalculate, getByIdSalary };
