<script lang="ts">
  import Chart from 'chart.js/auto';
  import { onMount } from 'svelte';

  const { months, startingUsers, growthRate, churnRate, revenuePerUser, costPerUser, fixedOverhead, revenueIncrease, growthDrop} = $props();
  
  let canvasEl: HTMLCanvasElement;
  let chartInstance: Chart;

  function generateChartData() {
    
    //Inits
    let users = startingUsers;
    const labels = [];
    const usersData = [];
    const mrrData = [];
    const costData = [];
    const profitData = [];

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
      //Each total will be rounded to the nearest number
      totals: {
        revenue: Math.round(mrrData.reduce((a, b) => a + b, 0)),
        cost: Math.round(costData.reduce((a, b) => a + b, 0)),
        profit: Math.round(profitData.reduce((a, b) => a + b, 0))
      }
    };
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
  
  //Makes the chart reactive, so when a number is updated the updateChart method will run
  $effect(() => {
    updateChart();
  });

  //Generating the actual chart
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