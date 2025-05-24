<script lang="ts">
	import UserChart from '$lib/components/UserChart.svelte';
	import FinanceChart from '$lib/components/FinanceChart.svelte';

	let months = $state(12);
	let startingUsers = $state(10);
	let growthRate = $state(5);
	let churnRate = $state(2);
	let revenuePerUser = $state(50);
	let costPerUser = $state(20);
	let fixedOverhead = $state(5000);
</script>

<!-- Filters Sidebar -->
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
					class="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-indigo-50"
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
						step="0.1"
						min="0"
						class="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-indigo-500"
					/>
				</label>

				<label class="block space-y-1">
					<span class="text-sm font-medium text-gray-700">Monthly Churn Rate (%)</span>
					<input
						type="number"
						bind:value={churnRate}
						step="0.1"
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
						step="0.01"
						class="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-indigo-500"
					/>
				</label>

				<label class="block space-y-1">
					<span class="text-sm font-medium text-gray-700">Cost per User (£)</span>
					<input
						type="number"
						bind:value={costPerUser}
						min="0"
						step="0.01"
						class="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-indigo-500"
					/>
				</label>

				<label class="block space-y-1">
					<span class="text-sm font-medium text-gray-700">Fixed Overhead (£)</span>
					<input
						type="number"
						bind:value={fixedOverhead}
						min="0"
						step="0.01"
						class="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-indigo-500"
					/>
				</label>
			</div>
		</div>
	</aside>

	<div class="flex flex-1 flex-col gap-4">
		<div class="flex flex-wrap gap-4 rounded-xl bg-white p-4 shadow-md">
			<div class="flex gap-4">Toggles</div>
			<button class="ml-auto"> Export </button>
		</div>

		<div class="flex min-h-0 flex-1 flex-row gap-4">
			<div class="flex min-h-0 flex-1 flex-col gap-4">
				<div class="h-1/2 rounded-xl bg-white p-4 shadow-md">
					<UserChart {months} {startingUsers} {growthRate} {churnRate} {revenuePerUser} />
				</div>
				<div class="h-1/2 rounded-xl bg-white p-4 shadow-md">
				    <FinanceChart {months} {startingUsers} {growthRate} {churnRate} {revenuePerUser} {costPerUser} {fixedOverhead}  />
				</div>
			</div>

			<div class="w-[35%] overflow-x-auto rounded-xl bg-white p-4 shadow-md">
				<table class="w-full">
					<!-- table -->
				</table>
			</div>
		</div>
	</div>
</div>
