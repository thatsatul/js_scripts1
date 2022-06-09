function checkReturn(principal=0, months=0, roi=0) {
  let i=1;
  let monthlyAmount = principal;
  let finalInterest = 0;
  console.log('Inital Value = ' + principal + ' and ROI = ' + roi);
  while(i <= months) {
    let profit = monthlyAmount * (roi/(12 * 100));
    finalInterest = finalInterest + profit;
    monthlyAmount = monthlyAmount + profit + principal;
    console.log('After ' + i + ' months : Value = ' + Math.round(monthlyAmount) + ' and monthly interest = ' + Math.round(profit));
    i++;
  }
  console.log('Total investment ' + (principal * (i-1)) + ' total profit = ' + Math.round(finalInterest));
}

checkReturn(25000, 360, 10);
