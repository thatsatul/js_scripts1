function emiCalculator(amount, years, interestRate) {
  // Initial requisite
  const noOfYears = years;
  const noOfMonths = noOfYears * 12;
  const principal = amount;
  const interestRatePerYear = interestRate;
  const interestRatePerMonth = interestRatePerYear / 12;
  const interestRateForEMICalculator = interestRatePerYear / (12 * 100);

  // const tr = Math.pow(2, 2);
  const tr = Math.pow(1 + interestRateForEMICalculator, noOfMonths);
  const emi = Math.floor((principal * interestRateForEMICalculator * tr) / (tr - 1));
  return emi;
}
const effectiveAmount = 118537 - 23707;
// Path: js_independent_scripts/emi-calculator.js
const emi = emiCalculator(effectiveAmount, 4, 8.99);
console.log(emi);