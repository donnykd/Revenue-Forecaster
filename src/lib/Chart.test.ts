import { expect, test } from "vitest";
import { generateChartData } from "./ChartCalc";

test('Correct data for 2 month', () => {
  const result = generateChartData({
    months: 2,
    startingUsers: 100,
    growthRate: 10,
    churnRate: 5,
    revenuePerUser: 50,
    costPerUser: 20,
    fixedOverhead: 1000
  });
  
  expect(result.usersData).toEqual([100, 105]) 
  expect(result.labels).toEqual(['Month 1', 'Month 2']);
  expect(result.mrrData).toEqual([5000, 5225]); 
  expect(result.costData).toEqual([3000, 3090]);  
  expect(result.profitData).toEqual([2000, 2135]); 
  })