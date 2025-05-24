<script lang="ts">
  import Chart from 'chart.js/auto';
  import { onMount } from 'svelte';

  const { months, startingUsers, growthRate, churnRate, revenuePerUser, costPerUser, fixedOverhead, revenueBoostAfter6, dropGrowthAfter12} = $props();
  
  let canvasEl: HTMLCanvasElement;
  let chartInstance: Chart;

  function generateChartData() {
    let users = startingUsers;
    const labels = [];
    const usersData = [];
    const mrrData = [];
    const costData = [];
    const profitData = [];

    for (let i = 1; i <= months; i++) {
      let effectiveRevenuePerUser = revenuePerUser;
      let effectiveGrowthRate = growthRate;
      
      if(revenueBoostAfter6){
        effectiveRevenuePerUser *= 1.10;
      }
      if (dropGrowthAfter12) {
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

    return { labels, usersData, mrrData, costData, profitData };
  }

  function updateChart() {
    const { labels, usersData, mrrData, costData, profitData } = generateChartData();

    if (chartInstance) {
      chartInstance.data.labels = labels;
      chartInstance.data.datasets[0].data = usersData;
      chartInstance.data.datasets[1].data = mrrData;
      chartInstance.data.datasets[2].data = costData;
      chartInstance.data.datasets[3].data = profitData;
      chartInstance.update();
    }
  }
  
  $effect(() => {
    updateChart();
  });

  onMount(() => {
    const { labels, usersData, mrrData, costData, profitData } = generateChartData();

    chartInstance = new Chart(canvasEl, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Users',
            data: usersData,
            borderColor: 'rgb(59, 130, 246)',
            fill: false
          },
          {
            label: 'Monthly Revenue (£)',
            data: mrrData,
            borderColor: 'rgb(34, 197, 94)',
            fill: false
          },
          {
            label: 'Total Cost (£)',
            data: costData,
            borderColor: 'rgb(251, 191, 36)',
            fill: false
          },
          {
            label: 'Profit (£)',
            data: profitData,
            borderColor: 'rgb(168, 85, 247)',
            fill: false
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  });
</script>

<canvas bind:this={canvasEl} class="w-full h-full"></canvas>