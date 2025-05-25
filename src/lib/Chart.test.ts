import { expect, test } from "vitest";
import { generateData } from "./ChartCalc";

test('Test correct data for 2 month', () => {
  const result = generateData({
    months: 2,
    startingUsers: 100,
    growthRate: 10,
    churnRate: 5,
    revenuePerUser: 50,
    costPerUser: 20,
    fixedOverhead: 1000,
    revenueIncrease: false,
    growthDrop: false
  });
  
  //3 array elements factoring in the starting data
  expect(result.usersData).toEqual([100, 105, 109]) 
  expect(result.labels).toEqual(['Month 0', 'Month 1', 'Month 2']);
  expect(result.mrrData).toEqual([5000, 5225, 5460]); 
  expect(result.costData).toEqual([3000, 3090, 3184]);  
  expect(result.profitData).toEqual([2000, 2135, 2276]); 
  })

test('Test 10% revenue increase', () => {
  const result = generateData({
    months: 1,
    startingUsers: 100,
    growthRate: 10,
    churnRate: 5,
    revenuePerUser: 50,
    costPerUser: 20,
    fixedOverhead: 1000,
    revenueIncrease: true,
    growthDrop: false
  });
  
  expect(result.mrrData).toEqual([5500, 5748]);
  expect(result.profitData).toEqual([2500, 2658]);
});

test('Test 50% growth drop', () => {
  const result = generateData({
    months: 2,
    startingUsers: 100,
    growthRate: 10,
    churnRate: 5,
    revenuePerUser: 50,
    costPerUser: 20,
    fixedOverhead: 1000,
    revenueIncrease: true,
    growthDrop: false
  });
  
  expect(result.mrrData).toEqual([5500, 5748, 6006]);
  expect(result.costData).toEqual([3000, 3090, 3184]); 
  expect(result.profitData).toEqual([2500, 2658, 2822]);
})