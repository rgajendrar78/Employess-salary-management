const calculateGross = ({ basic, hra, allowance }) => {
  return basic + hra + allowance;
};

const calculateTax = (gross) => {
  if (gross <= 25000) return gross * 0.05;
  if (gross <= 50000) return gross * 0.1;
  return gross * 0.2;
};

const calculatePF = (basic) => {
  return basic * 0.12;
};

const calculateNet = ({
  gross,
  fullDays,
  halfDays,
  workingDays,
  tax,
  pf,
  otherDeductions,
}) => {
  const dailyWage = gross / workingDays;
  const totalSalary = fullDays * dailyWage + halfDays * (dailyWage / 2);
  return totalSalary - tax - pf - otherDeductions;
};

export { calculateGross, calculateNet, calculatePF, calculateTax };
