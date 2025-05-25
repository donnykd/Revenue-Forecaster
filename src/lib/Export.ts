import { generateData } from "./ChartCalc";

export function exportForecast({
  months,
  startingUsers,
  growthRate,
  churnRate,
  revenuePerUser,
  costPerUser,
  fixedOverhead,
  revenueIncrease,
  growthDrop
} : {
  months: number;
  startingUsers: number;
  growthRate: number;
  churnRate: number;
  revenuePerUser: number;
  costPerUser: number;
  fixedOverhead: number;
  revenueIncrease: boolean;
  growthDrop: boolean;
}, format: 'json' | 'csv') {
  const data = generateData({
    months,
    startingUsers,
    growthRate,
    churnRate,
    revenuePerUser,
    costPerUser,
    fixedOverhead,
    revenueIncrease,
    growthDrop
  });
  
  let content = '';
  const headers = ['Month', 'Users', 'Revenue (£)', 'Cost (£)', 'Profit (£)'];
  
  if (format === 'csv') {
      content += headers.join(',') + '\n';
      for (let i = 0; i < data.labels.length; i++) {
        content += [
          data.labels[i],
          data.usersData[i],
          data.mrrData[i],
          data.costData[i],
          data.profitData[i]
        ].join(',') + '\n';
      }
    } else {
      content = JSON.stringify(data, null, 2);
    }
    
    const blob = new Blob([content], { type: format === 'csv' ? 'text/csv' : 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `forecast.${format}`;
    link.click();
}