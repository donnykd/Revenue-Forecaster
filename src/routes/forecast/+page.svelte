<script lang="ts">
    
</script>

<!-- Filters Sidebar -->
<div class="min-h-screen flex flex-row p-4 gap-4 bg-white">
    <aside class="w-64 rounded-xl p-4 space-y-4 bg-white shadow-md">
        <h2 class="text-lg text-slate-800 font-semibold">Filters</h2>
    </aside>
    
    
    <div class="flex flex-col flex-1 gap-4">
        <div class="flex flex-wrap gap-4 p-4 rounded-xl bg-white shadow-md">
            <div class="flex gap-4">
                Toggles
            </div>
            <button class="ml-auto">
                Export
            </button>
        </div>
        
        <div class="flex flex-row gap-4 flex-1 min-h-0">
            <div class="flex flex-1 flex-col gap-4 min-h-0">
                <div class="bg-white rounded-xl p-4 shadow-md flex-1">Chart 1 (Users & MRR)</div>
                <div class="bg-white rounded-xl p-4 shadow-md flex-1">Chart 2 (Costs & Profit)</div>
            </div>
            
            <div class="bg-white rounded-xl p-4 shadow-md w-[35%] overflow-x-auto">
                <table class="w-full">
                    <!-- table -->
                </table>
            </div>
        </div>
    </div>
</div>