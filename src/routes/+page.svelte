<script lang="ts">
  import { goto } from '$app/navigation'
  
  function startForecast(){
    goto('/forecast')
  }
</script>

<div class="min-h-screen flex flex-col justify-center items-center text-center px-4 bg-gradient-to-b from-white to-indigo-400">
  <h1 class="text-5xl font-extrabold text-slate-900 mb-4">
    Welcome to Revenue Forecaster Lite
  </h1>

  <p class="text-xl text-slate-600 max-w-2xl mb-8">
    This tool helps startup founders understand how their software business might grow over time; how many users they'll have, how much money they'll make, and how profitable the business could become.
  </p>

  <button
    onclick={startForecast}
    class="bg-indigo-600 hover:bg-indigo-700 transition-colors text-white text-lg font-medium px-6 py-3 rounded-lg"
  >
    Get Started
  </button>
</div>