<script>
  import { onMount } from 'svelte';
  import { settlementsData } from '../lib/store';
  import SettlementsList from '../components/SettlementsList.svelte';

  import '../styles/base-ui.css';

  onMount(async () => {
    const promises = $settlementsData.map(({ path }) => import(/* @vite-ignore */ path).then(module => module.default));

    const results = await Promise.allSettled(promises);

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        const { settlements, pendingCount } = result.value;
        settlementsData.update(data => {
          data[index].settlementData = settlements;
          data[index].pendingCount = pendingCount;
          return data;
        });

        setTimeout(() => {
          settlementsData.update(data => {
            data[index].isLoading = false;
            data[index].showLoadingPlaceholders = false;
            return data;
          });
        }, 1000 + pendingCount/3 * 1000);
      }
    });
  });
  function viewAllHandler() {
    console.log('handle view all button')
  }
</script>

<main>
  {#each $settlementsData as { settlementData, isLoading, showLoadingPlaceholders, pendingCount }, index}
    <div class="settlements"> 
      <div class="settlements-header">
        <h2>Settlements {index + 1}</h2>
        <button
          class="button" 
          on:click={() => viewAllHandler()}
         >
         view all
        </button>
      </div>
      <SettlementsList
        settlementData={settlementData}
        pendingCount={pendingCount}
        isLoading={isLoading}
        showLoadingPlaceholders={showLoadingPlaceholders}
      />
    </div>
  {/each}
</main>

<style>
  main {
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 20px;
    margin: 0 auto;
  }
  .settlements {
    width: 100%;
    max-width: 500px;
  }
  .settlements-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 10px;
  }
  h2 {
    font-size: 24px;
    margin: 0;
  }
</style>
