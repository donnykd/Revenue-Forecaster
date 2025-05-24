//Emulation of the calculations done in generateChartData method inside my chart.svelte file

export function generateChartData({
  months,
  startingUsers,
  growthRate,
  churnRate,
  revenuePerUser,
  costPerUser,
  fixedOverhead
}: {
  months: number;
  startingUsers: number;
  growthRate: number;
  churnRate: number;
  revenuePerUser: number;
  costPerUser: number;
  fixedOverhead: number;
}) {
  let users = startingUsers;
  const labels: string[] = [];
  const usersData: number[] = [];
  const mrrData: number[] = [];
  const costData: number[] = [];
  const profitData: number[] = [];

  for (let i = 1; i <= months; i++) {
    const revenue = users * revenuePerUser;
    const cost = users * costPerUser + fixedOverhead;
    const profit = revenue - cost;

    labels.push(`Month ${i}`);
    usersData.push(Math.round(users));
    mrrData.push(Math.round(revenue));
    costData.push(Math.round(cost));
    profitData.push(Math.round(profit));

    users = users * (1 + growthRate / 100) * (1 - churnRate / 100);
  }

  return { labels, usersData, mrrData, costData, profitData };
}
