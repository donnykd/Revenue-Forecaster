<script lang="ts">
  import Chart from 'chart.js/auto';
  import { onMount } from 'svelte';

  const {
    months,
    startingUsers,
    growthRate,
    churnRate,
    revenuePerUser,
    costPerUser,
    fixedOverhead
  } = $props();

  let canvasEl: HTMLCanvasElement;
  let chartInstance: Chart;

  function generateFinanceData() {
    let users = startingUsers;
    const labels = [];
    const costData = [];
    const profitData = [];

    for (let i = 1; i <= months; i++) {
      const revenue = users * revenuePerUser;
      const cost = users * costPerUser + fixedOverhead;
      const profit = revenue - cost;

      labels.push(`Month ${i}`);
      costData.push(Math.round(cost));
      profitData.push(Math.round(profit));

      users = users * (1 + growthRate / 100) * (1 - churnRate / 100);
    }

    return { labels, costData, profitData };
  }

  function updateChart() {
    const { labels, costData, profitData } = generateFinanceData();

    if (chartInstance) {
      chartInstance.data.labels = labels;
      chartInstance.data.datasets[0].data = costData;
      chartInstance.data.datasets[1].data = profitData;
      chartInstance.update();
    }
  }

  $effect(() => {
    updateChart();
  });

  onMount(() => {
    const { labels, costData, profitData } = generateFinanceData();

    chartInstance = new Chart(canvasEl, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Total Costs (£)',
            data: costData,
            borderColor: 'rgb(251, 191, 36)', // Tailwind yellow-400
            fill: false
          },
          {
            label: 'Profit (£)',
            data: profitData,
            borderColor: 'rgb(34, 197, 94)', // Tailwind green-500
            fill: false
          }
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