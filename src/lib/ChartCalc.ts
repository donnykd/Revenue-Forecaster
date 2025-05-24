//Emulation of the calculations done in generateData method inside my chart.svelte file

export function generateData({
  months,
  startingUsers,
  growthRate,
  churnRate,
  revenuePerUser,
  costPerUser,
  fixedOverhead,
  revenueIncrease, 
  growthDrop
}: {
  months: number;
  startingUsers: number;
  growthRate: number;
  churnRate: number;
  revenuePerUser: number;
  costPerUser: number;
  fixedOverhead: number;
  revenueIncrease: boolean
  growthDrop: boolean
}) {
  let users = startingUsers;
  const labels: string[] = [];
  const usersData: number[] = [];
  const mrrData: number[] = [];
  const costData: number[] = [];
  const profitData: number[] = [];

  for (let i = 1; i <= months; i++) {
    let effectiveRevenuePerUser = revenuePerUser;
    let effectiveGrowthRate = growthRate;
    
    if(revenueIncrease){
      effectiveRevenuePerUser *= 1.10;
    }
    if (growthDrop) {
      effectiveGrowthRate *= 0.5;
    }
    
    const revenue = users * effectiveRevenuePerUser;
    const cost = users * costPerUser + fixedOverhead;
    const profit = revenue - cost;
    
    labels.push(`Month ${i}`);
    usersData.push(Math.round(users));
    mrrData.push(Math.round(users * effectiveRevenuePerUser));
    costData.push(Math.round(cost));
    profitData.push(Math.round(profit));
    
    users = users * (1 + effectiveGrowthRate / 100) * (1 - churnRate / 100);
  }

  return { labels, usersData, mrrData, costData, profitData,
    totals: {
      revenue: Math.round(mrrData.reduce((a, b) => a + b, 0)),
      cost: Math.round(costData.reduce((a, b) => a + b, 0)),
      profit: Math.round(profitData.reduce((a, b) => a + b, 0))
    }
  };
}
