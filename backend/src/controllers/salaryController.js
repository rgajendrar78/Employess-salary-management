import { getByIdSalary, salaryCalculate, salaryCreate } from "../services/salaryService.js";

const createSalary = async (req, res) => {
  const { employeeId, hra, basic, allowance, otherDeductions } = req.body;
  try {
    const data = await salaryCreate(
      employeeId,
      hra,
      basic,
      allowance,
      otherDeductions
    );
    res.status(200).json({ data });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

const salaryGetById = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await getByIdSalary(id);
        res.status(200).json({ data });
    } catch (e) {
        res.status(400).json({ success: false, message: e.message });
    }
    }

const calculateSalary = async (req, res) => {
  const { employeeId, month } = req.body;

  try {
    const data = await salaryCalculate(employeeId, month);
    res.status(200).json({ data });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

export { calculateSalary, createSalary,salaryGetById };
