import { generateData } from "./ChartCalc";

interface ForecastParams {
  months: number;
  startingUsers: number;
  growthRate: number;
  churnRate: number;
  revenuePerUser: number;
  costPerUser: number;
  fixedOverhead: number;
  revenueIncrease: boolean;
  growthDrop: boolean;
}

export function exportForecast(params: ForecastParams, format: 'json' | 'csv') {
  const data = generateData(params);
  
  //CSV headers
  let content = '';
  const headers = ['Month', 'Users', 'Revenue (£)', 'Cost (£)', 'Profit (£)'];
  
  if (format === 'csv') {
    
    //CSV formatting from data
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
      //data to json
      content = JSON.stringify(data, null, 2);
    }
    
    // Create a downloadable blob and trigger the file download
    const blob = new Blob([content], { type: format === 'csv' ? 'text/csv' : 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `forecast.${format}`;
    link.click();
}