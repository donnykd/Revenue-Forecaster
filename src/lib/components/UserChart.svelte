<script lang="ts">
  import Chart from 'chart.js/auto';
  import { onMount } from 'svelte';

  const { months, startingUsers, growthRate, churnRate, revenuePerUser } = $props();
  
  let canvasEl: HTMLCanvasElement;
  let chartInstance: Chart;

  function generateForecastData() {
    let users = startingUsers;
    const labels = [];
    const usersData = [];
    const mrrData = [];

    for (let i = 1; i <= months; i++) {
      labels.push(`Month ${i}`);
      usersData.push(Math.round(users));
      mrrData.push(Math.round(users * revenuePerUser));
      users = users * (1 + growthRate / 100) * (1 - churnRate / 100);
    }

    return { labels, usersData, mrrData };
  }

  function updateChart() {
    const { labels, usersData, mrrData } = generateForecastData();

    if (chartInstance) {
      chartInstance.data.labels = labels;
      chartInstance.data.datasets[0].data = usersData;
      chartInstance.data.datasets[1].data = mrrData;
      chartInstance.update();
    }
  }
  
  $effect(() => {
    updateChart();
  });

  onMount(() => {
    const { labels, usersData, mrrData } = generateForecastData();

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