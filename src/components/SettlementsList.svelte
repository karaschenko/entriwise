<script>
  import SettlementRow from './SettlementRow.svelte';
  import LoadingPlaceholder from './LoadingPlaceholder.svelte';

  export let settlementData;
  export let pendingCount;
  export let isLoading;
  export let showLoadingPlaceholders;

</script>

<div class="settlements-list">
  {#if showLoadingPlaceholders}
    {#each Array(6) as _, index}
      <LoadingPlaceholder index={index} />
    {/each}
  {:else if isLoading}
    <p>Loading...</p>
  {:else}
    {#each Array(6) as _, index}
      {#if settlementData[index]}
        <SettlementRow
            settlement={settlementData[index]}
            financialEventGroupId={settlementData[index].financialEventGroupId}
        />
      {:else if pendingCount > 0}
        <LoadingPlaceholder index={index} />
      {/if}
    {/each}
  {/if}
</div>
