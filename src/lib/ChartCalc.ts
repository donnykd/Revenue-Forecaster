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
  //Inits
  let users = startingUsers;
  const labels: string[] = [];
  const usersData: number[] = [];
  const mrrData: number[] = [];
  const costData: number[] = [];
  const profitData: number[] = [];

  // Data for each month
  for (let i = 1; i <= months + 1; i++) {
    // Variables for the toggles to interact with revenue and growth rate, to not mess with the calculations
    let effectiveRevenuePerUser = revenuePerUser;
    let effectiveGrowthRate = growthRate;
    
    // If revenueIncrease toggle == true, revenue increase of 10%
    if(revenueIncrease){
      effectiveRevenuePerUser *= 1.10;
    }
    
    // If growthDrop toggle == true, growth cut in half
    if (growthDrop) {
      effectiveGrowthRate *= 0.5;
    }
    
    // Key calculations for chart data
    const revenue = users * effectiveRevenuePerUser;
    const cost = users * costPerUser + fixedOverhead;
    const profit = revenue - cost;
    
    //Arrays being populated by month
    labels.push(`Month ${i - 1}`);
    usersData.push(Math.round(users));
    mrrData.push(Math.round(users * effectiveRevenuePerUser));
    costData.push(Math.round(cost));
    profitData.push(Math.round(profit));
    
    //Calculation for active users for the upcoming month
    users = users * (1 + effectiveGrowthRate / 100) * (1 - churnRate / 100);
  }

  return { labels, usersData, mrrData, costData, profitData,
    //Each total will be rounded to the nearest int
    totals: {
      revenue: Math.round(mrrData.reduce((a, b) => a + b, 0)),
      cost: Math.round(costData.reduce((a, b) => a + b, 0)),
      profit: Math.round(profitData.reduce((a, b) => a + b, 0))
    }
  };
}
