<script lang="ts">
    import Chart from '$lib/Chart.svelte'
    import { generateData } from '$lib/ChartCalc';
	import { exportForecast } from '$lib/Export';

	let months = $state(12);
	let startingUsers = $state(100);
	let growthRate = $state(10);
	let churnRate = $state(3);
	let revenuePerUser = $state(30);
	let costPerUser = $state(20);
	let fixedOverhead = $state(1500);
	
	let revenueIncrease = $state(false);
	let growthDrop = $state(false);
	
	function handleExport(format: 'csv' | 'json'){
	  exportForecast({
			months,
            startingUsers,
            growthRate,
            churnRate,
            revenuePerUser,
            costPerUser,
            fixedOverhead,
            revenueIncrease,
            growthDrop
		}, format)
	}

	$effect(() => {
      if (months < 12) months = 12;
      if (months > 36) months = 36;
    
      if (startingUsers < 10) startingUsers = 10;
    
      if (growthRate < 0) growthRate = 0;
    
      if (churnRate < 0) churnRate = 0;
      if (churnRate > 100) churnRate = 100;
    
      if (revenuePerUser < 1) revenuePerUser = 1;
    
      if (costPerUser < 0) costPerUser = 0;
    
      if (fixedOverhead < 0) fixedOverhead = 0;
    });
</script>

<div class="flex min-h-screen flex-row gap-4 bg-white p-4">
	<aside class="w-64 space-y-4 rounded-xl bg-white p-4 shadow-md">
		<h2 class="text-lg font-semibold text-slate-800">Filters</h2>

		<div class="space-y-6">
			<label class="block space-y-1">
				<span class="text-sm font-medium text-gray-700">Forecast Duration (Months)</span>
				<input
					type="number"
					bind:value={months}
					min="12"
					max="36"
					class="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-indigo-500"
				/>
			</label>

			<label class="block space-y-1">
				<span class="text-sm font-medium text-gray-700">Starting Users</span>
				<input
					type="number"
					bind:value={startingUsers}
					min="10"
					class="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-indigo-500"
				/>
			</label>

			<!-- Growth & Churn -->
			<div class="space-y-4">
				<label class="block space-y-1">
					<span class="text-sm font-medium text-gray-700">Monthly Growth Rate (%)</span>
					<input
						type="number"
						bind:value={growthRate}
						step="1"
						min="0"
						class="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-indigo-500"
					/>
				</label>

				<label class="block space-y-1">
					<span class="text-sm font-medium text-gray-700">Monthly Churn Rate (%)</span>
					<input
						type="number"
						bind:value={churnRate}
						step="1"
						min="0"
						max="100"
						class="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-indigo-500"
					/>
				</label>
			</div>

			<!-- Finance -->
			<div class="space-y-4">
				<label class="block space-y-1">
					<span class="text-sm font-medium text-gray-700">Revenue per User (£)</span>
					<input
						type="number"
						bind:value={revenuePerUser}
						min="1"
						step="1"
						class="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-indigo-500"
					/>
				</label>

				<label class="block space-y-1">
					<span class="text-sm font-medium text-gray-700">Cost per User (£)</span>
					<input
						type="number"
						bind:value={costPerUser}
						min="0"
						step="1"
						class="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-indigo-500"
					/>
				</label>

				<label class="block space-y-1">
					<span class="text-sm font-medium text-gray-700">Fixed Overhead (£)</span>
					<input
						type="number"
						bind:value={fixedOverhead}
						min="0"
						step="100"
						class="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-indigo-500"
					/>
				</label>
			</div>
		</div>
	</aside>

	<div class="flex flex-1 flex-col gap-4">
		<div class="flex flex-wrap gap-4 rounded-xl bg-white p-4 shadow-md">
		
		<label class="flex items-center gap-2">
            <input type="checkbox" bind:checked={revenueIncrease} />
            <span>10% increase in revenue per user</span>
        </label>
        
        <label class="flex items-center gap-2">
          <input type="checkbox" bind:checked={growthDrop} />
          <span>50% drop in growth</span>
        </label>
        
        <div class="flex gap-2">
            <button
              onclick={() => handleExport('csv')}
              class="rounded-md bg-purple-600 px-4 py-2 text-white shadow hover:bg-purple-700 transition"
            >
              Export CSV
            </button>
            <button
              onclick={() => handleExport('json')}
              class="rounded-md bg-purple-600 px-4 py-2 text-white shadow hover:bg-purple-700 transition"
            >
              Export JSON
            </button>
          </div>
		</div>

		<div class="flex min-h-0 flex-1 flex-row gap-4">
			<div class="flex min-h-0 flex-1 flex-col gap-4">
				<div class="flex-1 rounded-xl bg-white p-4 shadow-md">
					<Chart {months} {startingUsers} {growthRate} {churnRate} {revenuePerUser} {costPerUser} {fixedOverhead} {revenueIncrease} {growthDrop}/>
				</div>

			</div>

			<div class="w-[35%] overflow-x-auto rounded-xl bg-white p-4 shadow-md">
			<table class="w-full text-sm text-gray-700">
                <thead>
                    <tr class="border-b">
                    <th class="text-left py-2">Month</th>
                    <th class="text-right py-2">Users</th>
                    <th class="text-right py-2">Revenue (£)</th>
                    <th class="text-right py-2">Cost (£)</th>
                    <th class="text-right py-2">Profit (£)</th>
                    </tr>
                </thead>
                
                <tbody>
                    {#each generateData({
                        months,
                        startingUsers,
                        growthRate,
                        churnRate,
                        revenuePerUser,
                        costPerUser,
                        fixedOverhead,
                        revenueIncrease,
                        growthDrop
                    }).labels as label, i}
                        <tr class="border-b">
                        <td class="py-1">{label}</td>
                        <td class="py-1 text-right">{generateData({ months, startingUsers, growthRate, churnRate, revenuePerUser, costPerUser, fixedOverhead, revenueIncrease, growthDrop }).usersData[i]}</td>
                        <td class="py-1 text-right">{generateData({ months, startingUsers, growthRate, churnRate, revenuePerUser, costPerUser, fixedOverhead, revenueIncrease, growthDrop }).mrrData[i]}</td>
                        <td class="py-1 text-right">{generateData({ months, startingUsers, growthRate, churnRate, revenuePerUser, costPerUser, fixedOverhead, revenueIncrease, growthDrop }).costData[i]}</td>
                        <td class="py-1 text-right">{generateData({ months, startingUsers, growthRate, churnRate, revenuePerUser, costPerUser, fixedOverhead, revenueIncrease, growthDrop }).profitData[i]}</td>
                        </tr>
                    {/each}
                    <tr class="font-bold border-t">
                        <td class="py-2">Total</td>
                        <td></td>
                        <td class="text-right">{generateData({ months, startingUsers, growthRate, churnRate, revenuePerUser, costPerUser, fixedOverhead, revenueIncrease, growthDrop }).totals.revenue}</td>
                        <td class="text-right">{generateData({ months, startingUsers, growthRate, churnRate, revenuePerUser, costPerUser, fixedOverhead, revenueIncrease, growthDrop }).totals.cost}</td>
                        <td class="text-right">{generateData({ months, startingUsers, growthRate, churnRate, revenuePerUser, costPerUser, fixedOverhead, revenueIncrease, growthDrop }).totals.profit}</td>
                    </tr>
                </tbody>
			</table>
			</div>
		</div>
	</div>
</div>
